"use strict";
/* Phase 11 research metadata. These are editorial reading leads, NOT claims
   of individual fact verification. Explicitly distinguish linked records
   from uncited records. All years follow legacy signed BCE/CE convention. */
(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.HistoricResearch=api;})(typeof window!=="undefined"?window:null,function(){
const sources=Object.freeze({
  "smithsonian-sapiens":{institution:"Smithsonian Human Origins Program",title:"Homo sapiens",url:"https://humanorigins.si.edu/evidence/human-fossils/species/homo-sapiens",kind:"institutional overview"},
  "unesco-gobekli":{institution:"UNESCO World Heritage Centre",title:"Göbekli Tepe",url:"https://whc.unesco.org/en/list/1572/",kind:"heritage record"},
  "unesco-mohenjo":{institution:"UNESCO World Heritage Centre",title:"Archaeological Ruins at Moenjodaro",url:"https://whc.unesco.org/en/list/138/",kind:"heritage record"},
  "unesco-caral":{institution:"UNESCO World Heritage Centre",title:"Sacred City of Caral-Supe",url:"https://whc.unesco.org/en/list/1269/",kind:"heritage record"},
  "unesco-zimbabwe":{institution:"UNESCO World Heritage Centre",title:"Great Zimbabwe National Monument",url:"https://whc.unesco.org/en/list/364/",kind:"heritage record"},
  "nasa-apollo":{institution:"NASA",title:"Apollo 11",url:"https://www.nasa.gov/mission/apollo-11/",kind:"mission overview"},
  "un-history":{institution:"United Nations",title:"History of the United Nations",url:"https://www.un.org/en/about-us/history-of-the-un",kind:"institutional history"},
  "cern-web":{institution:"CERN",title:"The birth of the Web",url:"https://home.cern/science/computing/birth-web",kind:"institutional history"}
});
const events=Object.freeze({
  "Early Homo sapiens":{sourceIds:["smithsonian-sapiens"],dating:{kind:"approximate",earliest:-315000,latest:-285000},note:"Illustrative dating window for the emergence of Homo sapiens; the fossil record does not identify one exact origin year."},
  "Göbekli Tepe":{sourceIds:["unesco-gobekli"],dating:{kind:"approximate",earliest:-9700,latest:-9500},note:"An illustrative window around the existing milestone, not the full site's occupation period."},
  "Indus urban centers":{sourceIds:["unesco-mohenjo"],dating:{kind:"approximate",earliest:-2700,latest:-2500},note:"The linked heritage site is one example; it does not independently substantiate every Indus urban settlement."},
  "Caral-Supe civilization":{sourceIds:["unesco-caral"],dating:{kind:"approximate",earliest:-3100,latest:-2500},note:"Broad illustrative window; chronology varies by site and phase."},
  "Apollo 11 Moon landing":{sourceIds:["nasa-apollo"],dating:{kind:"year",earliest:1969,latest:1969},note:"Year-level precision only in this atlas."},
  "United Nations founded":{sourceIds:["un-history"],dating:{kind:"year",earliest:1945,latest:1945},note:"Year-level precision only in this atlas."},
  "World Wide Web proposal":{sourceIds:["cern-web"],dating:{kind:"year",earliest:1989,latest:1989},note:"Year-level precision only in this atlas."}
});
const connections=Object.freeze([
 {id:"silk-road-exchange",title:"Trans-Eurasian exchange networks",mechanism:"trade and cultural exchange",from:"Han China",to:"Roman Empire",status:"historical interpretation",summary:"Multiple intermediary networks connected parts of Eurasia. This does not imply regular direct Han–Roman contact.",sourceIds:[],caveat:"Requires event-level scholarship before asserting a direct causal link."},
 {id:"indian-ocean-commerce",title:"Indian Ocean commercial networks",mechanism:"maritime trade",from:"Chola dynasty",to:"Srivijaya",status:"historical interpretation",summary:"Maritime exchange and political competition linked parts of South and Southeast Asia.",sourceIds:[],caveat:"Specific routes, intensity and chronology require sourced case studies."},
 {id:"sahel-exchange",title:"Trans-Saharan exchange",mechanism:"trade and religious exchange",from:"Mali Empire",to:"Songhai Empire",status:"historical interpretation",summary:"West African states participated in changing trans-Saharan commercial and intellectual networks.",sourceIds:[],caveat:"The two polities were not a single unchanging system; this is a thematic comparison, not a direct transmission claim."}
]);
const validUrl=url=>{try{const u=new URL(url);return u.protocol==="https:"&&!!u.hostname}catch{return false}};
const recordFor=(title)=>events[title]||null;
const validate=(eventRecords,sourceRecords=sources,links=connections)=>{
 const issues=[];
 for(const [id,s] of Object.entries(sourceRecords))if(!s.title||!s.institution||!validUrl(s.url))issues.push("Invalid source: "+id);
 for(const [title,record] of Object.entries(eventRecords)){
  if(!Array.isArray(record.sourceIds)||record.sourceIds.some(id=>!sourceRecords[id]))issues.push("Unknown source for "+title);
  if(record.dating&&(!Number.isInteger(record.dating.earliest)||!Number.isInteger(record.dating.latest)||record.dating.earliest>record.dating.latest))issues.push("Invalid date range for "+title);
 }
 const ids=new Set();
 for(const link of links){if(ids.has(link.id))issues.push("Duplicate connection "+link.id);ids.add(link.id);if(!link.from||!link.to||!link.mechanism||!link.caveat)issues.push("Incomplete connection "+link.id);if(link.sourceIds.some(id=>!sourceRecords[id]))issues.push("Unknown connection source "+link.id)}
 return issues;
};
return Object.freeze({sources,events,connections,recordFor,validUrl,validate});
});
