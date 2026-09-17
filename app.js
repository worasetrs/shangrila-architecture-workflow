const phases = [
  {id:'P0',title:'0 · Project control & source-of-truth',desc:'ล็อก revision baseline ก่อนให้ agent แตะ AutoCAD/Blender',tasks:[
    ['สร้างโฟลเดอร์ 00_ORIGINAL และตั้งไฟล์ PDF ต้นฉบับเป็น read-only','ห้าม overwrite ไฟล์ที่ได้รับจากผู้ออกแบบ','CONTROL'],
    ['ทำ Source Register ของ PDF ทุกชุด พร้อมวันที่ออกแบบและผู้สร้างไฟล์','แยก Architecture / Master Plan / Interior / Electrical-Fire / Sanitary / Render reference','CONTROL'],
    ['กำหนดว่า “3D ล่าสุด” เป็น Design Intent ระดับไหน','Final / concept / pending approval ต้องชัดก่อนปรับ construction drawings','GATE'],
    ['เปิดโมเดล 3D ต้นฉบับและบันทึก revision/version','ภาพ perspective อย่างเดียวไม่พอสำหรับวัดมิติ','3D'],
    ['สร้าง mismatch register และตั้ง ID เช่น ARC-001, SITE-001','ทุกการแก้ต้อง trace กลับไปที่ issue ได้','QA'],
    ['ตัดสิน master/site plan ตัวหลัก','ตรวจความต่างระหว่าง standalone master plan กับ site plan ในชุดสถาปัตย์','GATE'],
    ['ตั้งระบบไฟล์ WORKING / REVIEW / ISSUED','ให้ Astra ทำงานเฉพาะ WORKING','CONTROL']
  ]},
  {id:'P1',title:'1 · Extract 3D design intent',desc:'ดึงข้อมูลจากโมเดลใหม่เป็นมุม orthographic ที่วัดได้',tasks:[
    ['เปิด 3D model ใน Blender และตั้ง Units ให้ตรงกับ CAD','แนะนำ Metric; verify scale ด้วย dimension ที่รู้แน่','BLENDER'],
    ['สร้าง Top Orthographic view ของทั้ง site','ใช้สำหรับ footprint/road/pool/parking overlay','BLENDER'],
    ['สร้าง Front/Back/Left/Right Orthographic ของอาคารทุกหลัง','ห้ามใช้ perspective เป็นฐานวัด','BLENDER'],
    ['แยก collections: Site, Building_A_Left, Building_B_Right, Pavilion, Guardhouse, Pods, Pool, Landscape','ชื่อ object/collection ต้องสม่ำเสมอ','BLENDER'],
    ['Export footprint/outline เป็น DXF/SVG ที่ scale 1:1','เก็บไว้ใน 02_3D_EXPORT','BLENDER'],
    ['บันทึก critical dimensions ที่ต้องยืนยันจากโมเดล','footprint, setbacks, floor heights, façade offsets, roof, driveway','QA'],
    ['ทำ screenshot pack ก่อนแก้ CAD','Top + 4 elevations + key perspective','QA']
  ]},
  {id:'P2',title:'2 · Reconstruct / clean AutoCAD base from PDF',desc:'หากไม่มี DWG ให้ import/trace PDF ก่อน แล้วจัดเป็นฐาน CAD ที่สะอาด',tasks:[
    ['สร้าง BASE_ARCH.dwg ใหม่ ไม่แก้ไฟล์ต้นฉบับ','ตั้ง units และ origin ก่อน import','AUTOCAD'],
    ['PDFIMPORT/Attach แบบ Master/Site แล้ว calibrate scale','ใช้มิติที่ระบุในแบบ ไม่วัดจากภาพ raster','AUTOCAD'],
    ['PDFIMPORT แปลนสถาปัตย์ชั้น 1–7, ดาดฟ้า, หลังคา','จัดแต่ละชั้นไว้คนละ layer/xref/block','AUTOCAD'],
    ['Import/trace รูปด้าน 1–4 และรูปตัด A/B','ใช้สำหรับ cross-check ความสูงและ façade','AUTOCAD'],
    ['Clean geometry: join, purge, overkill, remove PDF hatches/text artifacts','คง dimension/reference แยก layer','AUTOCAD'],
    ['สร้าง layer standard EXISTING_PDF / NEW_3D / REVISION / DIM / GRID','ให้ดู overlay ได้ทันที','AUTOCAD'],
    ['ตรวจ known grid ของอาคารหลัก 14.00 × 19.50 m','ถ้าไม่ตรง scale ให้หยุดและ recalibrate','QA'],
    ['วางระดับชั้น known levels ใน elevation/section base','+0.10, +2.90, +5.75, +8.90, +11.75, +14.90, +17.75, +20.90, roof ≈ +23.00','QA']
  ]},
  {id:'P3',title:'3 · Site plan reconciliation',desc:'ทำ site plan ให้ตรงกับ top view ของ 3D ใหม่ก่อนลงรายละเอียดอาคาร',tasks:[
    ['Overlay NEW_3D footprint กับ site/master plan เดิม','ใช้ shared origin และ 1:1','AUTOCAD'],
    ['แก้ตำแหน่ง Building A ฝั่งซ้าย','ล็อก footprint และ setback หลัง verify','SITE'],
    ['แก้ตำแหน่ง Building B ฝั่งขวา','ล็อก footprint และ access','SITE'],
    ['แก้ Pavilion กลาง','ตรวจ relationship กับ pool/road/parking','SITE'],
    ['แก้ Guardhouse และ barrier ตาม 3D ล่าสุด','ตรวจ clear width / turning / gate operation','SITE'],
    ['เพิ่ม/แก้ Pods และอาคารย่อย','กำหนด use ก่อนเขียนแบบก่อสร้าง','SITE'],
    ['Trace รูปสระ/deck/island จาก Top Orthographic','ห้ามกะจาก bird-eye render','SITE'],
    ['Re-layout internal road, curb, island, drop-off และ parking','นับจำนวนช่องจอดและตรวจ circulation','SITE'],
    ['ปรับ landscape footprint เฉพาะที่กระทบงานสถาปัตย์','รายละเอียด landscape แยก discipline','SITE'],
    ['Issue SITE REVIEW v1 และเทียบกับ 3D top view อีกครั้ง','ผ่าน gate ก่อนเริ่ม floor plans','GATE']
  ]},
  {id:'P4',title:'4 · Building B — อาคารหลักฝั่งขวา',desc:'แก้แบบ 7 ชั้นเดิมให้ตรง massing/façade ของ 3D ใหม่',tasks:[
    ['ตรวจว่า footprint/layout ภายในเดิมยังใช้ได้กี่เปอร์เซ็นต์','แยก “plan change” กับ “façade-only change”','ARCH'],
    ['แก้ Floor Plan ชั้น 1','parking/core/lift/stair/entrance ต้องสัมพันธ์ site ใหม่','ARCH'],
    ['แก้ Floor Plan ชั้น 2','ตรวจ double-height/open void/terrace','ARCH'],
    ['แก้ Floor Plan ชั้น 3','ตรวจ bedroom/fitness/open void กับ façade ใหม่','ARCH'],
    ['แก้ Floor Plan ชั้น 4','ตรวจระเบียงและช่องเปิดกับ façade ใหม่','ARCH'],
    ['แก้ Floor Plan ชั้น 5','ตรวจ bedroom/fitness/open void กับ façade ใหม่','ARCH'],
    ['แก้ Floor Plan ชั้น 6','ตรวจระเบียงและช่องเปิดกับ façade ใหม่','ARCH'],
    ['แก้ Floor Plan ชั้น 7','ตรวจ bedroom/fitness/roof interface','ARCH'],
    ['แก้ Roof Deck + Roof Plan','match roof profile จาก model ใหม่','ARCH'],
    ['สร้าง Elevation 1–4 ใหม่จาก geometry ที่อนุมัติ','เทียบ side wall / fins / balcony / glazing / parapet','ARCH'],
    ['แก้ Section A/B','floor/ceiling/void/stair/roof ต้องสัมพันธ์ elevations','ARCH'],
    ['อัปเดต door/window tags หลัง plan change','อย่า reuse tag ถ้าขนาด/ชนิดเปลี่ยน','ARCH'],
    ['ตรวจพื้นที่/จำนวนห้องหลังแก้','ยืนยัน requirement 35 ห้องว่ายังคงหรือมี revision','GATE']
  ]},
  {id:'P5',title:'5 · Building A — อาคารฝั่งซ้าย',desc:'สร้างชุดแบบใหม่จาก 3D + requirement จริง',tasks:[
    ['กำหนด program/function ของอาคารฝั่งซ้าย','จำนวนชั้น ห้อง/ยูนิต และ circulation ต้องได้รับการยืนยัน','GATE'],
    ['Export footprint + elevations จาก 3D','ใช้เป็น design intent ไม่ใช่ construction geometry โดยอัตโนมัติ','3D'],
    ['สร้าง grids/levels และ structural coordination zones','ต้องส่งให้ทีมโครงสร้างตรวจภายหลัง','ARCH'],
    ['เขียน Floor Plans ทุกชั้น','เพิ่ม room names, dimensions, door/window tags','ARCH'],
    ['เขียน Roof Plan','drain/parapet/service access ต้องถูกกำหนด','ARCH'],
    ['เขียน Elevations 4 ด้าน','กรอบโค้ง/ช่องเปิด/module façade ตาม 3D','ARCH'],
    ['เขียน Sections อย่างน้อย 2 แนวหลัก','ผ่าน core/stair และ façade สำคัญ','ARCH'],
    ['สร้าง Door/Window schedule ของอาคารนี้','แยกหรือรวม master schedule ตามมาตรฐานโครงการ','ARCH']
  ]},
  {id:'P6',title:'6 · Pavilion / Guardhouse / Pods',desc:'อาคารย่อยต้องมีแบบก่อสร้างเฉพาะ ไม่จบแค่ footprint',tasks:[
    ['Pavilion: plan + roof + elevations + section','ตรวจ curtain wall/glazing/MEP zones','ARCH'],
    ['Guardhouse: plan + elevations + section + barrier interface','verify ขนาดใหม่จาก 3D','ARCH'],
    ['Pod แต่ละชนิด: ระบุ function และ repeatable type','ลดงานด้วย typical detail เมื่อ geometry ซ้ำ','ARCH'],
    ['ทำ door/window/material schedule สำหรับอาคารย่อย','ถ้ารวม master schedule ให้มี building prefix','ARCH'],
    ['ตรวจ accessibility และ clearances ที่เกี่ยวข้อง','ให้ผู้รับผิดชอบวิชาชีพตรวจ requirement ก่อน issue','QA']
  ]},
  {id:'P7',title:'7 · Architectural details & schedules',desc:'อัปเดตทุก detail หลัง geometry freeze',tasks:[
    ['ตรวจ/แก้ Stair ST-1 ทุกระดับ','riser/tread/landing/headroom ให้สัมพันธ์ levels ใหม่','DETAIL'],
    ['ตรวจ/แก้ Stair ST-2 ทุกระดับ','verify exit route และ door swing','DETAIL'],
    ['อัปเดตห้องน้ำคนพิการและห้องน้ำ 1–5','dimensions/levels/finish/slope/fixtures','DETAIL'],
    ['อัปเดต Door Schedule','D1–D23 ในชุดเดิมเป็น baseline; revision ใหม่อาจเพิ่ม/ลด','SCHEDULE'],
    ['อัปเดต Window Schedule','W1–W17 ในชุดเดิมเป็น baseline; match façade ใหม่','SCHEDULE'],
    ['อัปเดต façade / canopy / railing / parapet details','รายละเอียดที่ 3D แสดงแต่ PDF เดิมไม่มีต้องสร้างใหม่','DETAIL'],
    ['อัปเดต material/finish notes','วัสดุจาก render ต้อง translate เป็น specification ที่ตรวจสอบได้','DETAIL'],
    ['อัปเดต drawing index และ sheet numbering','เพิ่ม Building A/Pavilion/Guardhouse/Pods','CONTROL']
  ]},
  {id:'P8',title:'8 · Blender production model',desc:'สร้าง 3D master ที่ตรงกับ revised CAD ไม่ใช่แค่ภาพ render',tasks:[
    ['เริ่มไฟล์ SHANGRILA_MASTER.blend จาก clean template','ตั้ง units/origin/collections ก่อน import','BLENDER'],
    ['Link/import revised Site CAD','ล็อก source geometry และเก็บ import collection แยก','BLENDER'],
    ['Link/import Building A + Building B CAD','หนึ่ง building ต่อ collection/library','BLENDER'],
    ['ขึ้น slabs/walls/cores/openings จาก revised plans','ใช้ modifier/instances เพื่อลดการทำซ้ำ','BLENDER'],
    ['ขึ้น façade, balcony, fins, glazing, roof','cross-check orthographic กับ CAD','BLENDER'],
    ['ขึ้น Pavilion / Guardhouse / Pods / Pool','ใช้ site coordinates เดียวกัน','BLENDER'],
    ['ใส่ material naming standard','เช่น MAT_Concrete_White, MAT_Glass_Clear, MAT_Metal_Grey','BLENDER'],
    ['ทำ low-detail MEP/service placeholders เฉพาะจุด coordination','ไม่ต้อง model ระบบเต็มก่อน architecture freeze','BLENDER'],
    ['สร้าง review cameras: top + 4 sides + sections + bird-eye','สำหรับ Astra/คนตรวจใช้ view เดิมทุกรอบ','QA'],
    ['บันทึก render draft หลัง Architecture Freeze','ใช้เทียบ design intent และ detect drift','QA']
  ]},
  {id:'P9',title:'9 · Architecture QA / cross-check',desc:'ตรวจ DWG ↔ 3D ↔ PDF source แบบเป็นระบบ',tasks:[
    ['Compare plan footprint CAD กับ Blender top view','tolerance ต้องตั้งไว้ก่อนตรวจ','QA'],
    ['Compare elevations CAD กับ Blender ortho 4 ด้าน','เปิด overlay 50% opacity','QA'],
    ['Compare section levels กับ Blender Z values','ทุก floor/roof level ต้องตรง','QA'],
    ['ตรวจ door/window tag ทุกจุดกับ schedules','ไม่มี orphan/missing tags','QA'],
    ['ตรวจ stairs/voids/lifts ข้ามทุกชั้น','core continuity','QA'],
    ['ตรวจ site access/parking/guardhouse/pool setbacks','ใช้ dimension จริง','QA'],
    ['ปิด mismatch issues ทีละ ID พร้อม screenshot evidence','ห้าม mark done ด้วยคำบอกเล่าอย่างเดียว','QA'],
    ['สร้าง Architecture Freeze v1','หลัง freeze ถึงเริ่ม MEP coordination จริง','GATE']
  ]},
  {id:'P10',title:'10 · MEP coordination after Architecture Freeze',desc:'ใช้แบบระบบเดิมเป็นข้อมูลอ้างอิง แล้วให้วิศวกรปรับตาม architecture ใหม่',tasks:[
    ['Overlay Electrical/Fire plans กับ revised floors','ย้ายอุปกรณ์เฉพาะหลัง room/partition freeze','MEP'],
    ['Overlay Sanitary plans กับ revised floors','รักษา wet core/shaft เมื่อทำได้','MEP'],
    ['ตรวจ shafts/risers/plant/tank/pump locations','ห้ามตัดพื้นที่ระบบโดยไม่ review','MEP'],
    ['สร้าง clash list Architecture ↔ Electrical/Fire ↔ Sanitary','แยก critical / medium / cosmetic','MEP'],
    ['ส่ง coordination markups ให้ engineer','AI ช่วย draft แต่ engineer ยืนยัน sizing/code','GATE'],
    ['รับกลับ revised MEP แล้ว update architectural openings/shafts','loop จน clash critical = 0','MEP']
  ]},
  {id:'P11',title:'11 · Final architectural drawing set',desc:'แพ็กชุดแบบสถาปัตย์ให้ครบและตรวจได้',tasks:[
    ['Cover / Drawing Index / General notes','revision และ issue status ชัดเจน','DELIVER'],
    ['Location / land / site context drawings','ใช้ข้อมูล version ที่อนุมัติ','DELIVER'],
    ['Master/Site Plan + Enlarged Site Plan','รวม access, parking, pool, buildings, levels','DELIVER'],
    ['Building B Floor Plans 1–7 + Roof Deck + Roof','ครบ dimensions/tags/levels','DELIVER'],
    ['Building B Elevations 1–4 + Sections A/B','match revised 3D','DELIVER'],
    ['Building A plans/elevations/sections/roof','ครบตามจำนวนชั้นจริง','DELIVER'],
    ['Pavilion + Guardhouse + Pods architectural sheets','เฉพาะงานที่ก่อสร้างจริง','DELIVER'],
    ['Stair / toilet / façade / railing / canopy details','details updated to current design','DELIVER'],
    ['Door + Window schedules','ไม่มี tag ซ้ำ/ขาด','DELIVER'],
    ['Export issued PDF set','ตั้งชื่อไฟล์มี revision/date','DELIVER'],
    ['Archive issued DWG set','bind/clean xrefs ตามมาตรฐานทีม','DELIVER'],
    ['Archive final .blend + assets','Pack Resources หรือใช้ relative paths','DELIVER'],
    ['Export coordination model','FBX/OBJ/IFC ตามที่ทีมต้องใช้','DELIVER'],
    ['ออก Final QA report + unresolved items','ถ้ายังมี unresolved ต้องระบุ ไม่ปิดบัง','DELIVER']
  ]}
];

const prompts = [
  ['Astra · Master control prompt',`คุณเป็น Architecture Coordination Agent ของโครงการ Shangri-La Hua Hin
เป้าหมายคือทำให้แบบสถาปัตยกรรม 2D และโมเดล 3D ตรงกับ Design Intent ล่าสุด โดยใช้ AutoCAD + Blender + Computer Use

กติกา:
1) ห้าม overwrite ORIGINAL ทุกกรณี ให้ Save As ไป WORKING ก่อน
2) ก่อนแก้ทุก phase ให้ตรวจ source และบอกไฟล์/หน้า/มิติที่ใช้
3) ห้ามวัดระยะจากภาพ perspective หากมี CAD/orthographic/dimension จริง
4) แยก Existing PDF กับ New 3D เป็นคนละ layer/collection
5) ทุก mismatch ให้สร้าง Issue ID พร้อม Before/After screenshot
6) ถ้าข้อมูลขัดกันหรือไม่มี dimension ให้หยุดและถามก่อนเดา
7) หลังแต่ละ phase ให้ run QA และสรุปสิ่งที่เปลี่ยน
8) อย่าแก้ MEP แบบเต็มจน Architecture Freeze

เริ่มจาก Source Register + Revision Baseline และยังไม่แก้ไฟล์จนกว่าจะสรุป conflict list ให้ฉันตรวจ`],
  ['AutoCAD · PDF → clean base',`เปิด AutoCAD และสร้าง BASE_ARCH_WORKING.dwg ใหม่
นำเข้า PDF สถาปัตย์และ Master/Site เป็น reference โดยห้ามแก้ original
Calibrate scale จาก dimension ที่ระบุในแบบ; สำหรับอาคารหลักใช้กริดที่มีมิติ 14.00 x 19.50 m เป็น cross-check
สร้าง layers: EXISTING_PDF, EXISTING_TRACE, NEW_3D, GRID, DIM, TEXT, REVISION, QA
ทำความสะอาด geometry ที่ import และจัด floor plans 1–7, roof deck, roof, elevations, sections เป็น blocks/xrefs ที่ตรวจได้
หยุดถ้า scale ไม่ตรงกันเกิน tolerance และรายงานก่อนแก้ต่อ`],
  ['Blender · Export design intent',`เปิดโมเดล 3D ล่าสุดใน Blender
ตรวจ Units/Scale ก่อนทำอะไร
สร้าง collection แยก Site, Building_A_Left, Building_B_Right, Pavilion, Guardhouse, Pods, Pool, Landscape
สร้าง Top Orthographic และ Front/Back/Left/Right Orthographic
Export footprint/outlines ที่ scale 1:1 สำหรับนำไป overlay ใน AutoCAD
ห้ามเปลี่ยน geometry ของ design model ใน phase นี้
บันทึก screenshots และ dimension summary ที่จำเป็นต่อการแก้ CAD`],
  ['Computer Use · guarded execution',`ทำงานบน Desktop แบบ guarded execution:
- ก่อนแตะไฟล์: Save As / duplicate ไปโฟลเดอร์ WORKING
- ก่อน action ชุดใหญ่: screenshot Before
- ทำทีละ phase ไม่ข้าม approval gate
- หลัง action: ตรวจ units, dimensions, layer/collection, file path และ screenshot After
- หาก dialog ไม่แน่ใจ, file conflict, missing reference หรือ dimension ขัดกัน ให้หยุดและถาม
- ห้ามกด overwrite original, purge แบบย้อนกลับไม่ได้, delete source, หรือ issue final drawings โดยไม่มี approval`],
  ['QA · CAD ↔ 3D overlay',`ตรวจ revised CAD กับ Blender โดยใช้มุม Orthographic เดียวกัน
1) Top: footprint/site/road/pool/parking
2) Front/Back/Left/Right: façade/openings/balcony/roof
3) Sections: floor levels/voids/stairs/roof
ทำ mismatch table: ID, location, CAD value, 3D value, source, proposed action, status
อย่า mark PASS หากเป็นเพียง visual similarity ต้องมี dimension หรือ overlay evidence`],
  ['Final issue gate',`ก่อนออกชุดแบบสถาปัตยกรรม FINAL ให้ตรวจ:
- Drawing index ครบ
- Site + all buildings + ancillary structures ครบ
- Plans/elevations/sections/details/schedules sync กัน
- Door/window tags ไม่มี missing/duplicate
- Floor/roof levels sync กับ 3D
- Critical architecture/MEP clashes = 0 หรือมี signed exception
- Revision/date/file names ถูกต้อง
- DWG/PDF/BLEND archive เปิดได้จากเครื่องอื่น
สรุป unresolved items แยกต่างหาก ห้ามซ่อนหรือเดาแก้เอง`]
];

const stateKey='shangrila_arch_checklist_v1';
const state=JSON.parse(localStorage.getItem(stateKey)||'{}');
const phasesEl=document.getElementById('phases');
const searchInput=document.getElementById('searchInput');
const phaseFilter=document.getElementById('phaseFilter');
const openOnly=document.getElementById('openOnly');

phases.forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.title;phaseFilter.appendChild(o)});
function taskId(p,i){return `${p.id}-${i}`}
function render(){
  const q=searchInput.value.trim().toLowerCase(); const pf=phaseFilter.value;
  phasesEl.innerHTML='';
  phases.forEach(p=>{
    if(pf!=='all'&&pf!==p.id)return;
    const visible=p.tasks.map((t,i)=>({t,i,id:taskId(p,i)})).filter(x=>{
      const text=(x.t[0]+' '+x.t[1]+' '+x.t[2]).toLowerCase();
      return (!q||text.includes(q)) && (!openOnly.checked||!state[x.id]);
    });
    if(!visible.length && q)return;
    const done=p.tasks.filter((_,i)=>state[taskId(p,i)]).length;
    const sec=document.createElement('section');sec.className='phase';sec.dataset.phase=p.id;
    sec.innerHTML=`<div class="phase-head"><div class="phase-title"><div class="phase-num">${p.id.replace('P','')}</div><div><h3>${p.title}</h3><div class="phase-desc">${p.desc}</div></div></div><div class="phase-meta"><strong>${done}/${p.tasks.length}</strong><span>${Math.round(done/p.tasks.length*100)}% complete</span></div></div><div class="task-list"></div>`;
    const list=sec.querySelector('.task-list');
    visible.forEach(({t,i,id})=>{
      const row=document.createElement('label');row.className='task'+(state[id]?' done':'');
      row.innerHTML=`<input type="checkbox" ${state[id]?'checked':''}><div><div class="title">${t[0]}</div><div class="note">${t[1]}</div></div><span class="task-tag">${t[2]}</span>`;
      row.querySelector('input').addEventListener('change',e=>{state[id]=e.target.checked;localStorage.setItem(stateKey,JSON.stringify(state));render();});
      list.appendChild(row);
    });
    phasesEl.appendChild(sec);
  });
  updateOverall();
}
function updateOverall(){
  const ids=phases.flatMap(p=>p.tasks.map((_,i)=>taskId(p,i)));const done=ids.filter(id=>state[id]).length;const total=ids.length;const pc=total?Math.round(done/total*100):0;
  document.getElementById('overallPercent').textContent=pc+'%';document.getElementById('overallBar').style.width=pc+'%';document.getElementById('doneCount').textContent=done;document.getElementById('totalCount').textContent=total;document.getElementById('phaseCount').textContent=phases.length;
}
searchInput.addEventListener('input',render);phaseFilter.addEventListener('change',render);openOnly.addEventListener('change',render);
document.getElementById('resetBtn').addEventListener('click',()=>{if(confirm('Reset progress ทั้งหมด?')){localStorage.removeItem(stateKey);Object.keys(state).forEach(k=>delete state[k]);render()}});
document.getElementById('exportBtn').addEventListener('click',()=>{const payload={exportedAt:new Date().toISOString(),state,summary:{done:Object.values(state).filter(Boolean).length,total:phases.reduce((n,p)=>n+p.tasks.length,0)}};const b=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='shangrila-progress.json';a.click();URL.revokeObjectURL(a.href)});
const promptList=document.getElementById('promptList');prompts.forEach(([name,text])=>{const card=document.createElement('article');card.className='prompt-card';card.innerHTML=`<header><h3>${name}</h3><button class="copy-btn">Copy</button></header><pre></pre>`;card.querySelector('pre').textContent=text;card.querySelector('button').onclick=async()=>{await navigator.clipboard.writeText(text);card.querySelector('button').textContent='Copied';setTimeout(()=>card.querySelector('button').textContent='Copy',1200)};promptList.appendChild(card)});
render();
