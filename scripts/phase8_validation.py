from __future__ import annotations
import json, re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

SITE = "https://hiremenowresumes.ca"
RUS = Path("rus")
ENG = Path("eng")
NEW = [
    "ru/resources.html",
    "ru/kak-sostavit-rezume-v-kanade.html",
    "ru/ats-rezume-kanada.html",
    "ru/pereryv-v-rabote-rezume-kanada.html",
    "ru/kanadskoe-rezume-i-evropeyskoe-cv.html",
]
class Inspect(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.ld = []
        self.in_ld = False
        self.ld_current = ""
    def handle_starttag(self, name, attrs):
        a=dict(attrs)
        self.tags.append((name,a))
        if name == "script" and a.get("type") == "application/ld+json":
            self.in_ld = True
            self.ld_current = ""
    def handle_data(self, data):
        if self.in_ld:
            self.ld_current += data
    def handle_endtag(self,name):
        if name == "script" and self.in_ld:
            self.ld.append(json.loads(self.ld_current))
            self.in_ld=False
def load(root,path):
    content=(root/path).read_text(encoding="utf-8")
    doc=Inspect()
    doc.feed(content)
    return content,doc
def tags(doc,name):
    return [a for tag,a in doc.tags if tag==name]
def link_set(doc):
    return {x.get("href") for x in tags(doc,"a") if x.get("href")}
def one(condition,message):
    if not condition: raise AssertionError(message)

count=0
for p in NEW:
    html,doc=load(RUS,p)
    one('lang="ru"' in html,p+": language")
    one(len(tags(doc,"title"))==1,p+": single title")
    one(len(tags(doc,"h1"))==1,p+": one H1")
    desc=[x for x in tags(doc,"meta") if x.get("name")=="description"]
    one(len(desc)==1 and 70<=len(desc[0].get("content",""))<=190,p+": description")
    canonical=[x.get("href") for x in tags(doc,"link") if x.get("rel")=="canonical"]
    one(canonical==[SITE+"/"+p],p+": canonical")
    one(len(doc.ld)>=2,p+": structured data")
    one(all(x.get("@context")=="https://schema.org" for x in doc.ld),p+": schema context")
    one(all(img.get("alt") is not None for img in tags(doc,"img")),p+": img alt")
    one("/ru/resources.html" in link_set(doc) or p.endswith("resources.html"),p+": back link")
    one(any(x.get("href")=="/ru/resources.css" for x in tags(doc,"link")),p+": scoped CSS")
    for url in link_set(doc):
        if not url.startswith("/") or url.startswith("//"): continue
        target=url.split("#")[0].split("?")[0].lstrip("/")
        if not target or target.endswith("/"): target += "index.html"
        one((RUS/target).exists(),p+": missing internal link "+url)
    one(len(tags(doc,"h2"))>=1,p+": headings")
    count+=1
# Article metadata from separate English update PR.
enh,edoc=load(ENG,"ats-resume-tips-canadian-job-seekers.html")
one('What Contact Information Should Be on a Canadian Resume?' in enh,"English contact content")
one('Choose a Clear Resume Title and Describe Your Past Roles Honestly' in enh,"English title content")
one('What should an ATS-friendly resume look like?' in enh,"English layout content")
one('ats-article-content' in enh,"English reading styles")
one(any(x.get("@type")=="Article" and x.get("dateModified")=="2026-10-09" for x in edoc.ld),"English update metadata")
# Reciprocal language links should be on each indexed counterpart (on RU branch).
for en,ru in {
    "resources.html":"ru/resources.html",
    "ats-resume-tips-canadian-job-seekers.html":"ru/ats-rezume-kanada.html",
    "how-to-explain-employment-gaps-canadian-resume.html":"ru/pereryv-v-rabote-rezume-kanada.html",
}.items():
    for path in [en,ru]:
        _,doc=load(RUS,path)
        alts={x.get("hreflang"):x.get("href") for x in tags(doc,"link") if x.get("rel")=="alternate"}
        one(alts.get("en")==SITE+"/"+en and alts.get("ru")==SITE+"/"+ru,path+": hreflang")
        one(alts.get("x-default")==SITE+"/"+en,path+": x-default")
# New pages and all existing sitemap URLs correspond to real on-disk files.
sitemap=ET.parse(RUS/"sitemap.xml").getroot()
urls=[x.text for x in sitemap.iter() if x.tag.endswith("}loc") or x.tag=="loc"]
one(len(urls)==20 and len(set(urls))==20,"Sitemap distinct page count")
for url in urls:
    p=urlparse(url)
    one(p.netloc=="hiremenowresumes.ca","Sitemap host "+url)
    t=p.path.lstrip("/")
    if not t or t.endswith("/"):t+="index.html"
    one((RUS/t).exists(),"Sitemap missing file "+url)
for p in NEW: one(SITE+"/"+p in urls,"New page missing sitemap "+p)
for p in ["ru/index.html","ru/services.html"]:
    _,doc=load(RUS,p)
    one("/ru/resources.html" in link_set(doc),"RU navigation missing hub link "+p)
print("PASS: 5 Russian pages; English ATS article; 3 reciprocal hreflang pairs; 20 sitemap URLs; internal links, metadata and style files verified.")
