"use strict";
/* Presentation helpers. All text from historical records is HTML-escaped. */
(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.HistoricResearchView=api;})(typeof window!=="undefined"?window:null,function(){
const escape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const research=(typeof window!=="undefined"&&window.HistoricResearch)||(typeof require==="function"?require("./research.js"):null);
const link=id=>{const s=research.sources[id];return s?'<a href="'+escape(s.url)+'" target="_blank" rel="noopener noreferrer">'+escape(s.institution)+' — '+escape(s.title)+'</a>':''};
const eventEvidence=(event)=>{
 const r=research.recordFor(event[1]);
 if(!r)return '<p class="research-status">No event-level source assigned. Evidence label is editorial, not independent verification.</p>';
 const d=r.dating,range=d?d.earliest===d.latest?String(Math.abs(d.earliest))+(d.earliest<0?' BCE':' CE'):String(Math.abs(d.earliest))+(d.earliest<0?' BCE':' CE')+' to '+String(Math.abs(d.latest))+(d.latest<0?' BCE':' CE'):'Not specified';
 return '<details class="research-evidence"><summary>Research context · '+escape(r.sourceIds.length)+' reading lead(s)</summary><p><b>Dating:</b> '+escape(range)+' ('+escape(d?.kind||'unspecified')+')</p><p>'+escape(r.note)+'</p><p class="research-status">Linked institutional references are research leads; their applicability to each claim has not been independently checked.</p>'+r.sourceIds.map(id=>'<p>'+link(id)+'</p>').join('')+'</details>';
};
const societyProfile=(s,year,events)=>{
 if(!s)return '<h3>Society research profile</h3><p>Select a society to explore its chronology, social institutions and research context.</p>';
 const related=events.filter(e=>e[0]>=s.start&&e[0]<=s.end&&(e[2]===s.region||e[2].includes(s.region)||s.region.includes(e[2]))).slice(0,12);
 const fields=[["Governance",s.government],["Economy",s.economy],["Social organization",s.society],["Belief and traditions",s.belief]];
 const date=n=>Math.abs(n)+(n<0?' BCE':' CE');
 return '<h3>'+escape(s.name)+'</h3><p><b>Region:</b> '+escape(s.region)+' · <b>Approximate period:</b> '+escape(date(s.start))+'–'+escape(date(s.end))+' · <b>Reference center:</b> '+escape(s.place)+'</p><p>'+fields.map(([k,v])=>'<b>'+escape(k)+':</b> '+escape(v)).join('<br>')+'</p><p class="research-status">These descriptions are provisional editorial summaries. No society-level bibliography has yet been assigned; period boundaries and geographic center are approximate, not fixed political borders.</p><h4>Nearby historical milestones in the same regional category</h4>'+(related.length?'<ul>'+related.map(e=>'<li>'+escape(date(e[0]))+' — '+escape(e[1])+'</li>').join('')+'</ul>':'<p>No curated milestones match this society’s region and period. This is a dataset gap, not evidence of inactivity.</p>')+'<p class="research-status">Temporal and regional co-occurrence does not demonstrate contact or causation.</p>';
};
const connectionCards=()=>{
 return research.connections.map(c=>'<article class="tile"><h3>'+escape(c.title)+'</h3><p><b>Societies:</b> '+escape(c.from)+' ↔ '+escape(c.to)+'</p><p><b>Mechanism:</b> '+escape(c.mechanism)+'</p><p>'+escape(c.summary)+'</p><p class="research-status"><b>Evidence status:</b> '+escape(c.status)+'; '+escape(c.caveat)+'</p>'+(c.sourceIds.length?c.sourceIds.map(id=>'<p>'+link(id)+'</p>').join(''):'<p class="research-status">No specific source assigned.</p>')+'</article>').join('');
};
const sourceCatalog=()=>Object.entries(research.sources).map(([id,s])=>'<article class="tile"><h3>'+escape(s.institution)+'</h3><p>'+escape(s.kind)+'</p><p>'+link(id)+'</p></article>').join('');
return Object.freeze({escape,eventEvidence,societyProfile,connectionCards,sourceCatalog});
});
