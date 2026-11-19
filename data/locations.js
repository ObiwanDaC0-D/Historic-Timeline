// Approximate reference locations, not political borders or territorial extents.
// Coordinates are latitude/longitude in WGS84, representing selected historical centers.
// Historical polities shifted through time and cannot be represented by a single point.
const HISTORIC_LOCATIONS={
"Roman Empire":{lat:41.9028,lon:12.4964,place:"Rome"},
"Han China":{lat:34.3416,lon:108.9398,place:"Chang'an region"},
"Kushan Empire":{lat:34.53,lon:69.17,place:"Kabul region"},
"Kingdom of Aksum":{lat:14.13,lon:38.72,place:"Aksum"},
"Maya city-states":{lat:17.22,lon:-89.62,place:"Tikal (one of many centers)"},
"Abbasid Caliphate":{lat:33.3152,lon:44.3661,place:"Baghdad"},
"Mali Empire":{lat:16.77,lon:-3.01,place:"Timbuktu (important later center)"},
"Inca Empire":{lat:-13.5319,lon:-71.9675,place:"Cusco"},
"Ottoman Empire":{lat:41.0082,lon:28.9784,place:"Istanbul / Constantinople"}
};

if(typeof window!=='undefined')window.HISTORIC_LOCATIONS=HISTORIC_LOCATIONS;
if(typeof module!=='undefined'&&module.exports)module.exports=HISTORIC_LOCATIONS;
