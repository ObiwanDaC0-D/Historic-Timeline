"use strict";
(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.HistoricStorage=api;
})(typeof window!=="undefined"?window:null,function(){
  const key="historic-timeline-notes-v1"; // Preserve all existing saved notes.
  const read=(storage)=>{
    try{
      const value=JSON.parse(storage.getItem(key)||"[]");
      return Array.isArray(value)?value.filter(n=>n&&Number.isInteger(n.year)&&typeof n.text==="string"):[];
    }catch{return [];}
  };
  const write=(storage,notes)=>{
    if(!Array.isArray(notes))throw new TypeError("Notes must be an array");
    try{storage.setItem(key,JSON.stringify(notes));return true;}catch{return false;}
  };
  const add=(storage,note)=>{
    const notes=read(storage);
    if(!notes.some(n=>n.year===note.year&&n.text===note.text))notes.push(note);
    return write(storage,notes);
  };
  return Object.freeze({key,read,write,add});
});
