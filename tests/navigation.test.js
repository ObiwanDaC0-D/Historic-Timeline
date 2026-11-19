"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const n=require("../src/navigation.js");
test("zoom progressively narrows and widens the historical window",()=>{
 const full=n.windowFor(211,2000,"classical");
 const close=n.zoom(full,211,.25,"classical");
 assert.ok(close.span<full.span);
 assert.ok(close.start<=211&&close.end>=211);
 assert.equal(n.zoom(close,211,4,"classical").span,full.span);
});
test("historical slider uses normalized positions",()=>{
 const view=n.windowFor(211,200,"classical");
 for(const year of [111,150,211,250,311])assert.ok(Math.abs(n.sliderYear(n.sliderPosition(year,view),view)-year)<=1);
});
test("historical windows respect scope boundaries",()=>{
 for(const [scope,[min,max]] of Object.entries(n.limits)){
 const view=n.windowFor(max,1000000,scope);
 assert.equal(view.start,min);
 assert.equal(view.end,max);
 }
});
test("year zero is not selectable and BCE dates remain valid",()=>{
 assert.equal(n.normalizeYear(0),1);
 assert.equal(n.normalizeYear(-1),-1);
 assert.equal(n.validYear(0),false);
 assert.equal(n.validYear(-1),true);
});
test("society selection uses stable IDs and time filtering",()=>{
 const profiles=[{id:"society-one",start:-200,end:100}];
 assert.equal(n.selectSociety(profiles,"society-one"),profiles[0]);
 assert.equal(n.selectSociety(profiles,"missing"),null);
 assert.equal(n.visible(profiles[0],-1),true);
 assert.equal(n.visible(profiles[0],200),false);
});
