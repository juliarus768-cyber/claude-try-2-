"""Dependency-free structural/SEO checks; not a substitute for an HTML validator.

Run from any directory: python scripts/check-site.py
"""
from pathlib import Path
from html.parser import HTMLParser
import json
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://hiremenowresumes.ca'
NEW = ['canadian-resume-newcomers.html', 'ru/rezume-dlya-novichkov-v-kanade.html']
class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.ids=[]; self.links=[]; self.canonical=[]; self.alternates={}; self.h1=0
        self.heading_levels=[]; self.descriptions=[]; self.json=[]; self.in_json=False; self.current=''
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag=='h1': self.h1+=1
        if tag in ['h1','h2','h3','h4','h5','h6']: self.heading_levels.append(int(tag[1]))
        if tag=='a' and 'href' in a: self.links.append(a['href'])
        if tag=='meta' and a.get('name')=='description': self.descriptions.append(a.get('content'))
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a.get('href'))
        if tag=='link' and a.get('rel')=='alternate': self.alternates[a.get('hreflang')]=a.get('href')
        if tag=='script' and a.get('type')=='application/ld+json': self.in_json=True; self.current=''
    def handle_data(self, data):
        if self.in_json: self.current+=data
    def handle_endtag(self, tag):
        if tag=='script' and self.in_json:
            self.json.append(json.loads(self.current)); self.in_json=False

files=[p for p in [*ROOT.glob('*.html'), *(ROOT/'ru').glob('*.html')] if not p.name.startswith('google')]
pages={p.relative_to(ROOT).as_posix():Page(p.read_text(encoding='utf-8')) for p in files}
for file,p in pages.items():
    assert p.h1==1, (file,'H1 count',p.h1)
    assert len(p.ids)==len(set(p.ids)), (file,'duplicate IDs')
    assert len(p.canonical)==1 and len(p.descriptions)==1, (file,'metadata count')
    for href in p.links:
        u=urlsplit(href)
        if u.scheme and (u.scheme not in ['http','https'] or u.netloc!='hiremenowresumes.ca'): continue
        target=(ROOT/u.path.lstrip('/')) if u.path.startswith('/') else (ROOT/Path(file).parent/u.path)
        if not u.path: target=ROOT/file
        if target.is_dir(): target=target/'index.html'
        assert target.is_file(), (file,'broken link',href)
        if u.fragment and target.suffix=='.html':
            destination=pages[target.relative_to(ROOT).as_posix()]
            assert unquote(u.fragment) in destination.ids, (file,'broken fragment',href)
for file in NEW:
    p=pages[file]
    assert p.canonical==[BASE+'/'+file]
    assert p.alternates=={'en':BASE+'/'+NEW[0],'ru':BASE+'/'+NEW[1],'x-default':BASE+'/'+NEW[0]}
    assert not any(b>a+1 for a,b in zip(p.heading_levels,p.heading_levels[1:])), (file,'heading skip')
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
sitemap=ET.parse(ROOT/'sitemap.xml')
locs=[e.text for e in sitemap.findall('s:url/s:loc',ns)]
assert len(locs)==len(set(locs)), 'Duplicate sitemap URL'
for file in NEW: assert BASE+'/'+file in locs
for url in locs:
    f=ROOT/urlsplit(url).path.lstrip('/')
    if f.is_dir(): f=f/'index.html'
    assert f.is_file(), ('Missing sitemap destination',url)
ARTICLES = ['international-work-experience-canadian-resume.html', 'explain-foreign-job-titles-canadian-resume.html']
for file in ARTICLES:
    p=pages[file]
    assert p.canonical==[BASE+'/'+file], (file,'article canonical')
    assert not p.alternates, (file,'no untranslated alternate articles')
    articles=[s for s in p.json if s.get('@type')=='Article']
    assert len(articles)==1, (file,'Article schema count')
    schema=articles[0]
    assert schema['mainEntityOfPage']==p.canonical[0]
    assert schema['author']['name']=='Julia Cher' and schema['inLanguage']=='en'
    source=(ROOT/file).read_text(encoding='utf-8')
    assert f'datetime="{schema["datePublished"]}"' in source, (file,'visible/schema date match')
    assert BASE+'/'+file in locs and '/'+file in (ROOT/'resources.html').read_text(encoding='utf-8')
    assert 'fictional' in source.lower(), (file,'label examples')
    assert not any(b>a+1 for a,b in zip(p.heading_levels,p.heading_levels[1:])), (file,'heading skip')
print(f'PASS: {len(pages)} pages; internal links/fragments, H1s, metadata, JSON-LD, newcomer hreflang/headings, sitemap XML and destinations')
print('PASS: two English articles; Article schema, canonical, byline/date, resources/sitemap entries and heading order')
