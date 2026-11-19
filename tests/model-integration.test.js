"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const model=require("../src/model.js");
function loadFullBrowserData(){
  const sandbox={window:{HistoricModel:model},module:{exports:{}},console};
  const scripts=["data/expanded-events.js","data/locations.js","data/expanded-societies.js","data/reading-links.js","app.js"];
  for(const script of scripts)vm.runInNewContext(fs.readFileSync(path.join(__dirname,"..",script),"utf8"),sandbox,{filename:script});
  return sandbox.module.exports;
}
test("historical date formatting has no year zero",()=>{
  assert.equal(model.fmtYear(-1),"1 BCE");
  assert.equal(model.fmtYear(1),"1 CE");
  assert.equal(model.fmtYear(-202),"202 BCE");
  assert.throws(()=>model.fmtYear(0),/no year zero/);
  assert.equal(model.parseYear("1","BCE"),-1);
  assert.equal(model.parseYear("1","CE"),1);
});
test("full browser dataset is loaded, normalized, and unique",()=>{
  const h=loadFullBrowserData();
  assert.ok(h.canonicalData.events.length>60);
  assert.equal(h.canonicalData.societies.length,24);
  assert.equal(new Set(h.canonicalData.events.map(e=>e.id)).size,h.canonicalData.events.length);
  assert.equal(new Set(h.canonicalData.societies.map(s=>s.id)).size,h.canonicalData.societies.length);
  assert.ok(h.canonicalData.societies.every(s=>Number.isFinite(s.lat)&&Number.isFinite(s.lon)));
  assert.ok(h.canonicalData.events.every(e=>e.year!==0));
});
test("historical model rejects malformed records and coordinates",()=>{
  assert.throws(()=>model.normalizeEvent([0,"Bad","World","Topic","Description","documented"]));
  assert.throws(()=>model.normalizeSociety({name:"Bad",start:100,end:200,region:"X",government:"G",economy:"E",society:"S",belief:"B",lat:999,lon:0}));
});
test("existing bookmark storage key remains unchanged",()=>{
  const app=fs.readFileSync(path.join(__dirname,"../app.js"),"utf8");
  assert.match(app,/historic-timeline-notes-v1/);
});

test("notes service preserves legacy storage and deduplicates",()=>{
  const service=require("../src/storage.js");
  const state=new Map();
  const storage={getItem:k=>state.get(k)||null,setItem:(k,v)=>state.set(k,v)};
  state.set("historic-timeline-notes-v1",JSON.stringify([{year:211,text:"existing"}]));
  assert.deepEqual(service.read(storage),[{year:211,text:"existing"}]);
  assert.equal(service.add(storage,{year:211,text:"existing"}),true);
  assert.equal(service.read(storage).length,1);
  assert.equal(service.add(storage,{year:212,text:"new"}),true);
  assert.equal(service.read(storage).length,2);
});
test("notes service handles blocked browser storage",()=>{
  const service=require("../src/storage.js");
  const blocked={getItem(){throw Error("blocked")},setItem(){throw Error("blocked")}};
  assert.deepEqual(service.read(blocked),[]);
  assert.equal(service.write(blocked,[]),false);
});
