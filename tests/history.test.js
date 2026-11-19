const test=require('node:test');const assert=require('node:assert/strict');const h=require('../app.js');
test('eras span from early Homo sapiens to present',()=>{assert.equal(h.eras[0][0],-300000);assert.ok(h.eras.at(-1)[1]>=2026)});
test('era ranges are contiguous and ordered',()=>{for(let i=1;i<h.eras.length;i++)assert.equal(h.eras[i-1][1],h.eras[i][0])});
test('events are chronological',()=>{for(let i=1;i<h.entries.length;i++)assert.ok(h.entries[i][0]>=h.entries[i-1][0])});
test('event records have valid evidence labels',()=>{for(const e of h.entries){assert.equal(e.length,6);assert.ok(['approximate','traditional','documented'].includes(e[5]))}});
test('society ranges and map positions are valid',()=>{for(const s of h.societies){assert.ok(s.start<s.end);assert.ok(s.x>=0&&s.x<=100);assert.ok(s.y>=0&&s.y<=100)}});
test('year formatting handles BCE and CE',()=>{assert.equal(h.fmt(-211),'211 BCE');assert.equal(h.fmt(211),'211 CE')});
test('zoom ranges are valid',()=>{for(const [a,b,step] of Object.values(h.range)){assert.ok(a<b);assert.ok(step>0)}});
test('all thematic pathways have descriptions',()=>{assert.ok(h.tracks.length>=8);for(const t of h.tracks)assert.ok(t[0]&&t[1])});
