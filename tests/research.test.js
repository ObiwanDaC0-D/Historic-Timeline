"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const research=require("../src/research.js");
const view=require("../src/research-view.js");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
function fullAtlas(){
 const context={window:{HistoricModel:require("../src/model.js"),HistoricNavigation:require("../src/navigation.js"),HistoricStorage:require("../src/storage.js"),HistoricResearch:research,HistoricResearchView:view},module:{exports:{}}};
 for(const file of ["data/expanded-events.js","data/expanded-societies.js","data/locations.js","app.js"]){
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,"..",file),"utf8"),context,{filename:file});
 }
 return context.module.exports;
}
const app=fullAtlas();
test("research source URLs use HTTPS and references resolve",()=>{
 assert.deepEqual(research.validate(research.events),[]);
 assert.ok(Object.keys(research.sources).length>=8);
 for(const s of Object.values(research.sources))assert.ok(research.validUrl(s.url));
});
test("research metadata references actual event titles and consistent dating",()=>{
 const titles=new Set(app.entries.map(e=>e[1]));
 for(const [title,r] of Object.entries(research.events)){
  assert.ok(titles.has(title),"Missing event "+title);
  const event=app.entries.find(e=>e[1]===title);
  assert.ok(event[0]>=r.dating.earliest&&event[0]<=r.dating.latest,title);
 }
});
test("connection endpoints resolve to canonical society profiles",()=>{
 const names=new Set(app.societies.map(s=>s.name));
 for(const c of research.connections){
  assert.ok(names.has(c.from),"Missing source society "+c.from);
  assert.ok(names.has(c.to),"Missing destination society "+c.to);
  assert.ok(c.caveat&&c.status);
 }
});
test("unsourced milestones are clearly labeled",()=>{
 const html=view.eventEvidence([211,"Caracalla and Geta"]);
 assert.match(html,/No event-level source assigned/);
});
test("source and society rendering escapes untrusted text",()=>{
 const html=view.societyProfile({name:"<script>alert(1)</script>",start:1,end:2,region:"<img>",place:"x",government:"g",economy:"e",society:"s",belief:"b"},1,[]);
 assert.doesNotMatch(html,/<script>|<img>/);
 assert.match(html,/&lt;script&gt;/);
 assert.match(view.eventEvidence([-300000,"Early Homo sapiens"]),/research leads/);
});
