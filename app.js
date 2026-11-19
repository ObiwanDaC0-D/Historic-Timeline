"use strict";
const eras=[[-300000,-12000,"Paleolithic","Homo sapiens emerged in Africa; mobile societies developed diverse technologies and cultures."],[-12000,-3500,"Agricultural transitions","Food production and permanent settlements emerged independently in several regions."],[-3500,-1200,"Early cities and Bronze Age societies","Urban states, writing systems and metallurgy developed unevenly."],[-1200,-500,"Iron Age and expanding states","Political networks and metallurgical traditions changed across Eurasia and Africa."],[-500,500,"Classical world","Major empires, philosophical traditions and transregional networks flourished."],[500,1500,"Postclassical world","Trade, scholarship, migrations and political formations transformed societies globally."],[1500,1800,"Early modern transformations","Colonial expansion, new oceanic networks and scientific developments reshaped societies."],[1800,1914,"Industrial transformations","Mechanization, urbanization, reform movements and imperial expansion accelerated."],[1914,1945,"World wars","Mass conflict, economic upheaval and revolution changed the international order."],[1945,1991,"Cold War and decolonization","Independence movements, civil rights, nuclear rivalry and new technologies."],[1991,2027,"Contemporary world","Digital connectivity, climate pressures and artificial intelligence."]];
const entries=[
[-300000,"Early Homo sapiens","Africa","Human origins","Fossil evidence documents early Homo sapiens in Africa.","approximate"],
[-70000,"Human dispersals","Africa / Eurasia","Migration","Multiple waves of dispersal and interaction over many millennia.","approximate"],
[-12000,"Agricultural transitions","Multiple regions","Economy","Food production developed independently across regions at different times.","approximate"],
[-9600,"Göbekli Tepe","West Asia","Religion & philosophy","Early monumental structures in present-day Türkiye; their functions are debated.","approximate"],
[-3500,"Urbanization in Mesopotamia","West Asia","Politics & society","Growing cities and administration preceded many later state systems.","approximate"],
[-3100,"Early dynastic Egypt","North Africa","Politics & society","Political consolidation along the Nile.","approximate"],
[-2600,"Indus urban centers","South Asia","Everyday life","Urban planning and sanitation in settlements such as Mohenjo-daro.","approximate"],
[-1750,"Hammurabi's Babylon","West Asia","Politics & society","Royal law collection and administration.","approximate"],
[-1200,"Late Bronze Age upheavals","Mediterranean","Wars & political change","Disruptions in several eastern Mediterranean palace systems.","approximate"],
[-551,"Confucius","East Asia","Religion & philosophy","Traditional birth year of the influential Chinese teacher.","traditional"],
[-509,"Roman Republic","Europe","Wars & political change","Traditional date for the beginning of Rome's republican system.","traditional"],
[-336,"Alexander becomes king","Europe","Wars & political change","Macedonian expansion reshaped political and cultural networks.","documented"],
[-221,"Qin unification","East Asia","Politics & society","Qin rule consolidated large parts of China.","documented"],
[-27,"Augustus and Roman Empire","Europe","Politics & society","Augustus established the Roman principate.","documented"],
[30,"Early Christianity","West Asia","Religion & philosophy","Jesus' life and execution are conventionally placed in the early first century.","approximate"],
[211,"Caracalla and Geta","Europe","Wars & political change","The two Roman emperors briefly shared rule in 211 CE.","documented"],
[320,"Gupta dynasty","South Asia","Science & technology","Rise of a major North Indian dynasty associated with cultural and intellectual activity.","approximate"],
[476,"End of western Roman imperial rule","Europe","Wars & political change","Conventional marker for the end of the western imperial office.","documented"],
[622,"Hijra","West Asia","Religion & philosophy","Migration from Mecca to Medina; epoch of the Islamic calendar.","documented"],
[800,"Charlemagne crowned","Europe","Politics & society","Charlemagne crowned emperor in Rome.","documented"],
[1206,"Mongol Empire","Central Asia","Wars & political change","Temüjin proclaimed Genghis Khan.","documented"],
[1347,"Black Death reaches Europe","Europe","Everyday life","Pandemic mortality transformed communities; plague affected multiple continents.","approximate"],
[1453,"Ottoman conquest of Constantinople","Europe / West Asia","Wars & political change","Ottoman forces took the Byzantine capital.","documented"],
[1492,"Columbus reaches Caribbean","Americas","Migration","A pivotal event in sustained European colonization and Atlantic exchange.","documented"],
[1517,"Protestant Reformation","Europe","Religion & philosophy","Martin Luther's theses became an important moment in religious reform.","documented"],
[1687,"Newton's Principia","Europe","Science & technology","Foundational publication in classical mechanics.","documented"],
[1776,"US Declaration of Independence","North America","Politics & society","Thirteen colonies declared independence from Britain.","documented"],
[1789,"French Revolution","Europe","Wars & political change","Revolutionary political transformations began in France.","documented"],
[1804,"Haitian independence","Caribbean","Wars & political change","Successful antislavery revolution culminated in independence.","documented"],
[1865,"US Thirteenth Amendment","North America","Politics & society","Abolished slavery except as punishment for crime.","documented"],
[1914,"World War I","Global","Wars & political change","War beginning in Europe expanded into a global conflict.","documented"],
[1939,"World War II in Europe","Global","Wars & political change","German invasion of Poland marked the outbreak of war in Europe.","documented"],
[1945,"United Nations founded","Global","Politics & society","New international organization established after World War II.","documented"],
[1969,"Apollo 11 Moon landing","Global","Science & technology","Humans landed on the Moon.","documented"],
[1989,"World Wide Web proposal","Global","Science & technology","Tim Berners-Lee proposed a linked information system.","documented"],
[1991,"Soviet Union dissolves","Global","Wars & political change","Major geopolitical transformation after the Cold War.","documented"],
[2020,"COVID-19 pandemic","Global","Everyday life","Worldwide public-health and social disruption.","documented"],
[2022,"Public generative AI expansion","Global","Science & technology","ChatGPT's release expanded public attention to generative AI.","documented"]
];
if(typeof window!=="undefined" && Array.isArray(window.HISTORIC_EXTRA_EVENTS)){entries.push(...window.HISTORIC_EXTRA_EVENTS);entries.sort((a,b)=>a[0]-b[0]);}
const societies=[
{name:"Roman Empire",start:-27,end:476,region:"Europe",x:48,y:31,government:"Imperial monarchy with complex civic and legal institutions",economy:"Agriculture, taxation, trade and slavery",society:"Highly stratified; citizenship and status mattered",belief:"Diverse cults; Christianity spread over time"},
{name:"Han China",start:-202,end:220,region:"East Asia",x:78,y:34,government:"Dynastic imperial bureaucracy",economy:"Agriculture, craft production and long-distance exchange",society:"Households, officials, farmers, merchants and other groups",belief:"Confucian traditions, ritual and diverse practices"},
{name:"Kushan Empire",start:30,end:375,region:"Central / South Asia",x:66,y:42,government:"Dynastic imperial rule",economy:"Overland trade and agriculture",society:"Multilingual, culturally diverse populations",belief:"Buddhism and other religious traditions"},
{name:"Kingdom of Aksum",start:100,end:940,region:"East Africa",x:57,y:58,government:"Monarchy",economy:"Red Sea trade and agriculture",society:"Urban and rural communities",belief:"Diverse traditions; Christianity adopted in fourth century"},
{name:"Maya city-states",start:250,end:900,region:"Mesoamerica",x:19,y:49,government:"Independent dynastic polities",economy:"Agriculture and regional exchange",society:"Courtly elites, artisans and farming communities",belief:"Complex polytheistic and calendrical traditions"},
{name:"Abbasid Caliphate",start:750,end:1258,region:"West Asia",x:58,y:40,government:"Caliphal institutions with changing regional control",economy:"Trade, agriculture and urban crafts",society:"Cosmopolitan cities and diverse communities",belief:"Islam and other traditions"},
{name:"Mali Empire",start:1235,end:1600,region:"West Africa",x:42,y:53,government:"Imperial monarchy",economy:"Gold, agriculture and Saharan trade",society:"Regional communities and trading centers",belief:"Islam and indigenous religious traditions"},
{name:"Inca Empire",start:1438,end:1533,region:"Andes",x:23,y:70,government:"Centralized imperial administration",economy:"Agriculture and labor obligations",society:"Communities organized through kinship and state obligations",belief:"Andean religious traditions"},
{name:"Ottoman Empire",start:1299,end:1922,region:"Europe / West Asia",x:52,y:37,government:"Dynastic imperial administration",economy:"Agriculture, trade and taxation",society:"Multiethnic and multireligious populations",belief:"Islam alongside other religious communities"}
];
const tracks=[
["Human origins & cognition","Evolution, symbolic behavior, social learning and cumulative culture."],
["Food & subsistence","Foraging, cultivation, herding, industrial agriculture and food systems."],
["Cities & governance","Settlement, administrative institutions, states, empires and civic participation."],
["Technology & science","Tools, metallurgy, printing, energy systems, medicine and computation."],
["Economy & inequality","Exchange, labor, class, slavery, markets, industrialization and welfare institutions."],
["Belief & philosophy","Ritual, religious institutions, ethical traditions and secular thought."],
["War & cooperation","Organized violence, diplomacy, alliances, peacebuilding and international institutions."],
["Everyday life","Households, childhood, education, gender, housing, health and leisure."]
];
const connections=[
["Food production → settlement","Surpluses and predictable harvests sometimes supported denser settlements; this varied by ecology."],
["Writing ↔ administration","Record keeping supported complex institutions, while institutional needs shaped writing practices."],
["Trade ↔ cultural exchange","Movement of goods, people and ideas connected distant communities."],
["Disease ↔ social organization","Epidemics altered labor, migration, public institutions and social relations."],
["Energy ↔ industrialization","Fossil fuels and machinery expanded productive capacity, with environmental costs."],
["Imperial expansion ↔ inequality","Conquest, extraction and resistance reshaped economic and political systems."]
];
const people=[
["Confucius","c. 551–479 BCE","Ethics, education and governance in ancient China."],
["Siddhartha Gautama","Dates debated","Teachings associated with the origin of Buddhism in South Asia."],
["Aristotle","384–322 BCE","Greek philosophy, logic and natural inquiry."],
["Ibn Sina (Avicenna)","980–1037 CE","Philosophy and medicine across the Islamic world."],
["Mansa Musa","reigned c. 1312–1337","Ruler of Mali associated with wealth, trade and Islamic patronage."],
["Mary Wollstonecraft","1759–1797","Political philosophy and arguments for women's education."],
["Charles Darwin","1809–1882","Evolution by natural selection."],
["W. E. B. Du Bois","1868–1963","Sociology, race, history and civil rights."]
];
const $=id=>document.getElementById(id);
const fmt=n=>n<0?Math.abs(n).toLocaleString()+" BCE":n+" CE";
const range={all:[-300000,2026,100],ancient:[-12000,500,10],classical:[-1000,1000,1],medieval:[500,1500,1],modern:[1500,2026,1]};
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const card=(title,body,extra="")=>'<article class="tile"><h3>'+escapeHtml(title)+'</h3><p>'+escapeHtml(body)+'</p>'+extra+'</article>';
const eventCard=e=>{const readings=(typeof window!=="undefined"&&window.HISTORIC_READING&&window.HISTORIC_READING[e[1]])||[];const links=readings.map(x=>'<a style="color:#f0cf91;display:block;margin-top:7px" href="'+escapeHtml(x.url)+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(x.label)+' ↗</a>').join('');return card(e[1],e[4],'<span class="date">'+fmt(e[0])+'</span><br><span class="tag">'+escapeHtml(e[2])+'</span><span class="tag">'+escapeHtml(e[3])+'</span><span class="tag">'+escapeHtml(e[5])+'</span><br><button data-bookmark="'+encodeURIComponent(e[1])+'">☆ Bookmark</button> '+(readings.length?'<small>Suggested reading (not independently verified)</small>':'<small>Individual sources pending</small>')+links)};
let year=211;
function setYear(y){year=Math.max(-300000,Math.min(2026,Math.round(Number(y)||0)));$('year').value=year;const [lo,hi]=range[$('scale').value];$('slider').value=Math.max(lo,Math.min(hi,year));$('yearLabel').textContent=fmt(year);const era=eras.find(e=>year>=e[0]&&year<e[1])||eras.at(-1);$('eraLabel').textContent=era[2];$('eraText').textContent=era[3];$('events').innerHTML=[...entries].sort((a,b)=>Math.abs(a[0]-year)-Math.abs(b[0]-year)).slice(0,6).sort((a,b)=>a[0]-b[0]).map(eventCard).join('');renderMap()}
function renderResults(){const q=$('search').value.toLowerCase(),t=$('topic').value,r=$('region').value;const list=entries.filter(e=>(!t||e[3]===t)&&(!r||e[2]===r)&&e.slice(1,5).join(' ').toLowerCase().includes(q));$('count').textContent=list.length+' matching historical milestones';$('results').innerHTML=list.map(eventCard).join('')||'<p>No matching entries.</p>'}
function renderMap(){const active=societies.filter(s=>year>=s.start&&year<=s.end);$('map').innerHTML=active.map(s=>'<span class="pin" style="left:'+s.x+'%;top:'+s.y+'%" title="'+escapeHtml(s.region)+'">'+escapeHtml(s.name)+'</span>').join('');$('mapList').innerHTML=active.map(s=>card(s.name,s.region+' · '+fmt(s.start)+'–'+fmt(s.end))).join('')||'<p>No society profiles in this period yet. This does not mean the region was uninhabited.</p>'}
function renderCompare(){const a=societies[+$('socA').value],b=societies[+$('socB').value];$('comparison').innerHTML=[a,b].map(s=>card(s.name,s.region+' · '+fmt(s.start)+'–'+fmt(s.end),'<p><b>Governance:</b> '+escapeHtml(s.government)+'</p><p><b>Economy:</b> '+escapeHtml(s.economy)+'</p><p><b>Social organization:</b> '+escapeHtml(s.society)+'</p><p><b>Belief:</b> '+escapeHtml(s.belief)+'</p>')).join('')}
const storeKey='historic-timeline-notes-v1';function readNotes(){try{return JSON.parse(localStorage.getItem(storeKey)||'[]')}catch{return []}}
function saveNotes(v){localStorage.setItem(storeKey,JSON.stringify(v));renderNotes()}
function renderNotes(){$('saved').innerHTML=readNotes().map(n=>card(fmt(n.year),n.text)).join('')||'<p class="muted">No notes saved yet.</p>'}
function init(){const pages=[["Timeline","timeline"],["Explore","explore"],["Map","mapSection"],["Compare","compareSection"],["Development","development"],["Connections","connections"],["People & ideas","figures"],["Data","data"],["Notes","notes"],["Sources","sources"]];$('nav').innerHTML=pages.map(([name,id])=>'<button data-target="'+id+'">'+name+'</button>').join('');$('topic').innerHTML+=[...new Set(entries.map(e=>e[3]))].sort().map(t=>'<option>'+escapeHtml(t)+'</option>').join('');$('region').innerHTML+=[...new Set(entries.map(e=>e[2]))].sort().map(t=>'<option>'+escapeHtml(t)+'</option>').join('');['socA','socB'].forEach((id,i)=>{$(id).innerHTML=societies.map((s,j)=>'<option value="'+j+'" '+(j===i?'selected':'')+'>'+escapeHtml(s.name)+'</option>').join('');$(id).addEventListener('change',renderCompare)});$('tracks').innerHTML=tracks.map(x=>card(...x)).join('');$('links').innerHTML=connections.map(x=>card(...x)).join('');$('people').innerHTML=people.map(x=>card(x[0],x[2],'<span class="date">'+escapeHtml(x[1])+'</span>')).join('');$('milestones').innerHTML=entries.filter(e=>e[3]==='Science & technology'||e[3]==='Economy').map(e=>'<p><span class="date">'+fmt(e[0])+'</span> — '+escapeHtml(e[1])+'</p>').join('');$('scale').addEventListener('change',()=>{const [a,b,step]=range[$('scale').value];Object.assign($('slider'),{min:a,max:b,step});$('minLabel').textContent=fmt(a);$('maxLabel').textContent=fmt(b);setYear(Math.max(a,Math.min(b,year)))});$('slider').addEventListener('input',e=>setYear(e.target.value));$('year').addEventListener('change',e=>setYear(e.target.value));$('earlier').onclick=()=>setYear(year-(range[$('scale').value][2]*10));$('later').onclick=()=>setYear(year+(range[$('scale').value][2]*10));['search','topic','region'].forEach(id=>$(id).addEventListener('input',renderResults));document.addEventListener('click',e=>{const t=e.target.closest('[data-target]');if(t)$(t.dataset.target).scrollIntoView({behavior:'smooth'});const b=e.target.closest('[data-bookmark]');if(b){const ev=entries.find(x=>x[1]===decodeURIComponent(b.dataset.bookmark));if(ev){const note={year:ev[0],text:ev[1]+' — '+ev[4]};const saved=readNotes();if(!saved.some(n=>n.year===note.year&&n.text===note.text))saveNotes([...saved,note])}}});$('saveNote').onclick=()=>{const v=$('note').value.trim();if(v){saveNotes([...readNotes(),{year,text:v}]);$('note').value=''}};$('clearNotes').onclick=()=>{if(confirm('Delete all locally saved notes?'))saveNotes([])};$('exportNotes').onclick=()=>{const blob=new Blob([JSON.stringify(readNotes(),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='historic-timeline-notes.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};$('scale').dispatchEvent(new Event('change'));renderResults();renderCompare();renderNotes()}
if(typeof document!=='undefined')document.addEventListener('DOMContentLoaded',init);
if(typeof module!=='undefined')module.exports={eras,entries,societies,tracks,connections,people,fmt,range};
