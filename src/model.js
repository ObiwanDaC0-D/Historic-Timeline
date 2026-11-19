"use strict";
/* Shared, dependency-free model used by browser and Node tests.
   Dates use legacy signed historical years: negative = BCE, positive = CE, zero invalid.
   Legacy data are preserved as supplied; conversion is for display only. */
(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.HistoricModel=api;
})(typeof window!=="undefined"?window:null,function(){
  const slug=s=>String(s).normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const fmtYear=n=>{
    if(!Number.isInteger(n))throw new TypeError("Year must be an integer");
    if(n===0)throw new RangeError("Historical BCE/CE has no year zero");
    return n<0?(-n).toLocaleString("en-US")+" BCE":n.toLocaleString("en-US")+" CE";
  };
  const parseYear=(input,era)=>{
    const n=Number(input);
    if(!Number.isInteger(n))return null;
    if(era==="BCE")return n>0?-n:null;
    if(era==="CE")return n>0?n:null;
    return n;
  };
  const normalizeEvent=(e)=>{
    if(!Array.isArray(e)||e.length!==6)throw new TypeError("Invalid event record");
    const [year,title,region,topic,summary,evidence]=e;
    if(!Number.isInteger(year)||year===0||!title||!region||!topic||!summary||!["approximate","traditional","documented"].includes(evidence))throw new TypeError("Invalid event fields: "+title);
    return Object.freeze({id:"event-"+slug(title)+"-"+year,year,title,region,topic,summary,evidence});
  };
  const normalizeSociety=(s,locations={})=>{
    if(!s||typeof s.name!=="string"||!Number.isInteger(s.start)||!Number.isInteger(s.end)||s.start===0||s.end===0||s.start>=s.end)throw new TypeError("Invalid society");
    const loc=locations[s.name]||s;
    const lat=Number(loc.lat),lon=Number(loc.lon);
    if(!Number.isFinite(lat)||!Number.isFinite(lon)||lat< -90||lat>90||lon< -180||lon>180)throw new TypeError("Invalid geographic coordinates: "+s.name);
    for(const k of ["region","government","economy","society","belief"])if(!s[k])throw new TypeError("Missing "+k+": "+s.name);
    return Object.freeze({...s,id:"society-"+slug(s.name),lat,lon,place:loc.place||s.name});
  };
  const validateCollection=(items,kind)=>{
    const ids=new Set();
    for(const item of items){if(ids.has(item.id))throw new Error("Duplicate "+kind+" ID: "+item.id);ids.add(item.id);}
    return items;
  };
  const build=(eventRecords,societyRecords,locations={})=>{
    const events=validateCollection(eventRecords.map(normalizeEvent),"event").sort((a,b)=>a.year-b.year);
    const societies=validateCollection(societyRecords.map(s=>normalizeSociety(s,locations)),"society").sort((a,b)=>a.start-b.start);
    return Object.freeze({events,societies});
  };
  return Object.freeze({slug,fmtYear,parseYear,normalizeEvent,normalizeSociety,validateCollection,build});
});
