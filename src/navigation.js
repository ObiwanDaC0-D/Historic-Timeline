"use strict";
(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.HistoricNavigation=api;})(typeof window!=="undefined"?window:null,function(){
const limits={all:[-300000,2026],ancient:[-12000,500],classical:[-1000,1000],medieval:[500,1500],modern:[1500,2026]};
const validYear=n=>Number.isInteger(n)&&n!==0;
const normalizeYear=n=>{const y=Math.max(-300000,Math.min(2026,Math.round(Number(n)||1)));return y===0?1:y;};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const windowFor=(center,span,scope="all")=>{const [min,max]=limits[scope]||limits.all;const width=clamp(Math.round(span),2,max-min);const start=clamp(Math.round(center-width/2),min,max-width);return {start,end:start+width,span:width};};
const zoom=(view,center,factor,scope)=>windowFor(center,view.span*factor,scope);
const sliderYear=(position,view)=>normalizeYear(view.start+clamp(Number(position),0,1000)/1000*(view.end-view.start));
const sliderPosition=(year,view)=>Math.round(clamp((year-view.start)/(view.end-view.start)*1000,0,1000));
const visible=(society,year)=>society.start<=year&&society.end>=year;
const selectSociety=(societies,id)=>societies.find(s=>s.id===id)||null;
return Object.freeze({limits,validYear,normalizeYear,windowFor,zoom,sliderYear,sliderPosition,visible,selectSociety});
});
