import {chromium} from "playwright";
import {createServer} from "node:http";
import {readFile} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import assert from "node:assert/strict";
const root=resolve(import.meta.dirname,"..");
const types={".html":"text/html",".js":"text/javascript",".css":"text/css",".json":"application/json"};
const server=createServer(async(req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
    const file=resolve(root,"."+pathname.replace(/\/$/,"/index.html"));
    if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return;}
    const data=await readFile(file);
    res.writeHead(200,{"Content-Type":types[extname(file)]||"application/octet-stream"}).end(data);
  }catch{res.writeHead(404).end();}
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
let browser;
try{
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1280,height:900}});
  const errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  await page.goto("http://127.0.0.1:"+server.address().port+"/");
  await assert.doesNotReject(()=>page.locator("#yearLabel").waitFor({state:"visible"}));
  assert.ok((await page.locator("#socA option").count())>=24,"Society comparison options missing");
  assert.ok((await page.locator("#topic option").count())>5,"Topic filter missing");
  await page.locator("#zoomIn").click();
  assert.match(await page.locator("#viewDescription").innerText(),/year window/);
  await page.locator("#zoomOut").click();
  await page.locator("#resetZoom").click();
  await page.locator("#year").fill("1250");
  await page.locator("#year").dispatchEvent("change");
  assert.match(await page.locator("#yearLabel").innerText(),/1,?250 CE/);
  await page.locator("#mapRegion").selectOption("West Africa");
  assert.match(await page.locator("#mapCount").innerText(),/society profiles/);
  await page.locator("#mapRegion").selectOption("");
  await page.locator("#mapSociety").selectOption("society-mali-empire");
  assert.match(await page.locator("#mapSelection").innerText(),/Mali Empire/);
  assert.match(await page.locator("#yearLabel").innerText(),/CE/);
  await page.locator("#clearMapSelection").click();
  await page.locator("#chronologyWindow").selectOption("medieval");
  assert.ok((await page.locator("#chronologyChart svg").count())===1,"Chronology chart missing");
  await page.locator("#note").fill("Phase 9 browser smoke note");
  await page.locator("#saveNote").click();
  assert.match(await page.locator("#saved").innerText(),/Phase 9 browser smoke note/);
  await page.reload();
  assert.match(await page.locator("#saved").innerText(),/Phase 9 browser smoke note/);
  await page.locator("#year").fill("0");
  await page.locator("#year").dispatchEvent("change");
  assert.notEqual(await page.locator("#yearLabel").innerText(),"0 CE");
  assert.deepEqual(errors,[],"Browser JavaScript errors: "+errors.join("; "));
  console.log("Browser smoke tests passed: initialization, data, navigation, map, chronology, notes, reload, and year-zero handling");
}finally{
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
