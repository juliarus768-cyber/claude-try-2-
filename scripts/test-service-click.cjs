// Offline checks: node --test scripts/test-service-click.cjs
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'..','site.js'),'utf8');
const tracking=source.slice(source.indexOf('// Phase 4: no form fields'),source.indexOf('// Carry an explicitly selected service'));
const key='hmn_service_interest';
function harness({granted=true,ready=true,pathname='/canadian-resume-newcomers.html',storage=new Map(),blocked=false}={}){
  const handlers={},events=[],callbacks=[];
  const window={
    HMNConsent:{isGranted:()=>granted,whenAnalyticsReady:fn=>ready?fn():callbacks.push(fn)},
    location:{pathname,origin:'https://hiremenowresumes.ca',href:'https://hiremenowresumes.ca'+pathname},
    sessionStorage:{getItem:k=>{if(blocked)throw Error('Blocked');return storage.get(k)??null;},setItem:(k,v)=>{if(blocked)throw Error('Blocked');storage.set(k,v);},removeItem:k=>storage.delete(k)},
    gtag:(...args)=>events.push(args)
  };
  vm.runInNewContext(tracking,{document:{addEventListener:(name,fn)=>{handlers[name]=fn;}},window,URL,Date});handlers.DOMContentLoaded();
  function click(overrides={}){
    const {target='',download=false,outsideMain=false,href='https://hiremenowresumes.ca/services.html#resume-strategy',...rest}=overrides;
    const link={href,target,dataset:{},hasAttribute:n=>n==='download'&&download,closest:s=>s==='main'&&!outsideMain?{}:null};
    const event={target:{closest:()=>link},button:0,defaultPrevented:false,preventDefault(){this.defaultPrevented=true;},...rest};handlers.click(event);return event;
  }
  return {click,events,storage,callbacks,setConsent:value=>{granted=value;},submit:form=>handlers.submit({target:form})};
}
test('same-tab click navigates natively and records once after destination tag readiness',()=>{
  const h=harness();assert.equal(h.click().defaultPrevented,false);assert.equal(h.events.length,0);
  const marker=JSON.parse(h.storage.get(key));assert.deepEqual(Object.keys(marker).sort(),['at','destination','service','source']);assert.equal(marker.source,'newcomer_page');assert.equal(marker.service,'resume-strategy');
  const next=harness({storage:h.storage,pathname:'/services.html',ready:false});assert.equal(next.events.length,0);assert.ok(h.storage.has(key));next.callbacks[0]();next.callbacks[0]();assert.equal(next.events.length,1);assert.equal(next.events[0][1],'service_click');assert.equal(next.events[0][2].source_content,'newcomer_page');assert.equal(h.storage.has(key),false);assert.equal(harness({storage:h.storage,pathname:'/services.html'}).events.length,0);
});
test('no consent creates no marker; withdrawal discards pending interest',()=>{
  const h=harness({granted:false});assert.equal(h.click().defaultPrevented,false);assert.equal(h.storage.size,0);assert.equal(h.events.length,0);
  const accepted=harness();accepted.click();const rejected=harness({granted:false,storage:accepted.storage,pathname:'/services.html'});assert.equal(rejected.events.length,0);assert.equal(accepted.storage.size,0);
});
test('expired, future, unapproved or wrong-destination markers cannot generate events',()=>{
  const valid={source:'newcomer_page',service:'resume-strategy',destination:'/services.html',at:Date.now()};
  for(const patch of [{at:Date.now()-31000},{at:Date.now()+10000},{source:'unapproved'},{service:'email@example.invalid'},{destination:'/contact.html'}]){const storage=new Map([[key,JSON.stringify({...valid,...patch})]]);assert.equal(harness({storage,pathname:'/services.html'}).events.length,0);assert.equal(storage.size,0);}
});
test('modified clicks, new tabs and downloads retain native behavior',()=>{
  for(const options of [{ctrlKey:true},{metaKey:true},{shiftKey:true},{altKey:true},{button:1},{target:'_blank'},{download:true}]){const h=harness();assert.equal(h.click(options).defaultPrevented,false);assert.equal(h.storage.size,0);assert.equal(h.events.length,1);}
});
test('blocked storage preserves native navigation with best-effort immediate tracking',()=>{const h=harness({blocked:true});assert.equal(h.click().defaultPrevented,false);assert.equal(h.events.length,1);});
test('only existing allowlisted content-to-service links create markers',()=>{
  for(const pathname of ['/services.html','/ru/index.html']){const h=harness({pathname});h.click();assert.equal(h.storage.size,0);assert.equal(h.events.length,0);}
  for(const options of [{outsideMain:true},{href:'https://example.com/services.html'},{href:'https://hiremenowresumes.ca/contact.html'}]){const h=harness();h.click(options);assert.equal(h.storage.size,0);assert.equal(h.events.length,0);}
});
test('all existing content sources and both commercial destinations retain fixed attribution',()=>{
  for(const pathname of ['/international-work-experience-canadian-resume.html','/explain-foreign-job-titles-canadian-resume.html','/canadian-resume-newcomers.html']){
    for(const destination of ['/services.html','/resume-writing-services.html']){
      const h=harness({pathname});h.click({href:'https://hiremenowresumes.ca'+destination});
      const next=harness({pathname:destination,storage:h.storage});assert.equal(next.events.length,1);
      assert.equal(next.events[0][2].service_interest,destination==='/services.html'?'services_overview':'resume_writing');
    }
  }
});
test('withdrawing consent before tag readiness suppresses a pending service event',()=>{
  const first=harness();first.click();
  const next=harness({pathname:'/services.html',storage:first.storage,ready:false});
  next.setConsent(false);next.callbacks[0]();
  assert.equal(next.events.length,0);assert.equal(first.storage.has(key),false);
});
test('contact submissions create only a timestamp after validation and consent',()=>{
  const form={matches:()=>true,checkValidity:()=>true,action:'https://formsubmit.co/info@hiremenowresumes.ca',email:'private@example.invalid',message:'PRIVATE RESUME CONTENT'};
  const h=harness({pathname:'/contact.html'});h.submit(form);
  assert.ok(Number(h.storage.get('hmn_contact_pending_at'))>0);
  assert.equal(h.events.length,0);
  assert.ok(!JSON.stringify([...h.storage]).includes(form.email));assert.ok(!JSON.stringify([...h.storage]).includes(form.message));
  for(const options of [{granted:false},{blocked:true}]){
    const rejected=harness({pathname:'/contact.html',...options});rejected.submit(form);assert.equal(rejected.storage.size,0);assert.equal(rejected.events.length,0);
  }
  for(const patch of [{checkValidity:()=>false},{action:'https://example.com/contact'}]){
    const invalid=harness({pathname:'/contact.html'});invalid.submit({...form,...patch});assert.equal(invalid.storage.size,0);assert.equal(invalid.events.length,0);
  }
});
test('contact success emits one fixed lead event after readiness and cannot repeat on refresh',()=>{
  const storage=new Map([['hmn_contact_pending_at',String(Date.now())]]);
  const h=harness({pathname:'/thanks.html',storage,ready:false});assert.equal(h.events.length,0);assert.equal(storage.size,1);
  h.callbacks[0]();h.callbacks[0]();assert.equal(h.events.length,1);assert.equal(h.events[0][1],'generate_lead');
  assert.equal(JSON.stringify(h.events[0][2]),JSON.stringify({lead_source:'website_contact_form'}));assert.equal(storage.size,0);
  assert.equal(harness({pathname:'/thanks.html',storage}).events.length,0);
});
test('direct, expired, future or non-consented confirmations cannot emit a lead',()=>{
  for(const timestamp of [null,Date.now()-3600001,Date.now()+10000]){
    const storage=new Map(timestamp?[['hmn_contact_pending_at',String(timestamp)]]:[]);
    const h=harness({pathname:'/thanks.html',storage});assert.equal(h.events.length,0);assert.equal(storage.size,0);
  }
  const storage=new Map([['hmn_contact_pending_at',String(Date.now())]]);
  const h=harness({pathname:'/thanks.html',storage,ready:false});h.setConsent(false);h.callbacks[0]();assert.equal(h.events.length,0);
});
