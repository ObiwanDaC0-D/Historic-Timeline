const test=require('node:test');const assert=require('node:assert/strict');const h=require('../app.js');
test('eras span from early Homo sapiens to present',()=>{assert.equal(h.eras[0][0],-300000);assert.ok(h.eras.at(-1)[1]>=2026)});
test('era ranges are contiguous and ordered',()=>{for(let i=1;i<h.eras.length;i++)assert.equal(h.eras[i-1][1],h.eras[i][0])});
test('events are chronological',()=>{for(let i=1;i<h.entries.length;i++)assert.ok(h.entries[i][0]>=h.entries[i-1][0])});
test('event records have valid evidence labels',()=>{for(const e of h.entries){assert.equal(e.length,6);assert.ok(['approximate','traditional','documented'].includes(e[5]))}});
test('society ranges and map positions are valid',()=>{for(const s of h.societies){assert.ok(s.start<s.end);assert.ok(s.x>=0&&s.x<=100);assert.ok(s.y>=0&&s.y<=100)}});
test('year formatting handles BCE and CE',()=>{assert.equal(h.fmt(-211),'211 BCE');assert.equal(h.fmt(211),'211 CE')});
test('zoom ranges are valid',()=>{for(const [a,b,step] of Object.values(h.range)){assert.ok(a<b);assert.ok(step>0)}});
test('all thematic pathways have descriptions',()=>{assert.ok(h.tracks.length>=8);for(const t of h.tracks)assert.ok(t[0]&&t[1])});

test('geographic projection places equator and prime meridian at map center',()=>{assert.deepEqual(h.project(0,0),{x:480,y:240})});
test('geographic projection preserves longitude and latitude direction',()=>{assert.ok(h.project(0,-90).x<h.project(0,90).x);assert.ok(h.project(60,0).y<h.project(-60,0).y)});
test('geographic polygon path is closed',()=>{assert.match(h.polygonPath([[0,0],[10,0],[10,10]]),/ Z$/)});

test('expanded society dataset contains valid coordinates and time ranges',()=>{const fs=require('node:fs'),vm=require('node:vm');const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../data/expanded-societies.js'),'utf8'),sandbox);const profiles=sandbox.window.HISTORIC_EXTRA_SOCIETIES;assert.ok(profiles.length>=15);for(const p of profiles){assert.ok(p.start<p.end,p.name);assert.ok(p.lat>=-90&&p.lat<=90,p.name);assert.ok(p.lon>=-180&&p.lon<=180,p.name);assert.ok(p.government&&p.economy&&p.society&&p.belief,p.name)}});
test('expanded society names are unique',()=>{const fs=require('node:fs'),vm=require('node:vm');const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../data/expanded-societies.js'),'utf8'),sandbox);const names=sandbox.window.HISTORIC_EXTRA_SOCIETIES.map(x=>x.name);assert.equal(new Set(names).size,names.length)});
