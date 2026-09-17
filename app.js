const phases = [
  {id:'P0',title:'0 · Project control & source-of-truth',desc:'ล็อกไฟล์ต้นฉบับและกติกาการอ้างอิงก่อนเริ่มแก้แบบ',tasks:[
    ['สร้างโฟลเดอร์ 00_ORIGINAL และเก็บไฟล์ที่ได้รับทั้งหมดแบบ read-only','PDF / ภาพ render / reference image ต้องไม่ถูก overwrite','CONTROL'],
    ['ตรวจและอัปเดต docs/SOURCE_REGISTER.md','ระบุว่าไม่มีไฟล์ 3D editable ต้นฉบับ; มีเฉพาะ PDF + ภาพ 3D/render ที่ได้รับ','CONTROL'],
    ['กำหนด Design Intent ล่าสุดจากภาพที่ได้รับ','ภาพ 3D/render ใช้ยืนยันรูปลักษณ์และองค์ประกอบเชิงภาพ ไม่ใช้เป็นแหล่งมิติจริง','GATE'],
    ['กำหนด Dimension Authority','มิติ ระดับ plan/section/detail ให้ยึดจากแบบ PDF ที่มี dimension จนกว่าจะมี revision ที่ยืนยัน','GATE'],
    ['สร้าง Mismatch Register และตั้ง ID เช่น ARC-001 / SITE-001','ทุกจุดที่ภาพ 3D ดูต่างจากแบบให้บันทึกก่อนแก้ ห้ามเดา','QA'],
    ['ตัดสิน baseline ของ Master/Site Plan','ตรวจ standalone master plan กับ site plan ในชุดสถาปัตย์และระบุฉบับอ้างอิง','GATE'],
    ['ตั้งโฟลเดอร์ 01_WORKING / 02_REVIEW / 03_FINAL','Astra/Computer Use แก้เฉพาะ WORKING','CONTROL']
  ]},
  {id:'P1',title:'1 · Review latest 3D/render references',desc:'อ่านภาพ 3D ล่าสุดเป็น visual reference โดยไม่สมมติว่ามีโมเดลต้นฉบับ',tasks:[
    ['รวบรวมภาพ 3D/render ล่าสุดทั้งหมดไว้ใน 00_ORIGINAL/RENDER_REFERENCE','ตั้งชื่อไฟล์ตามมุมมอง/วันที่ถ้าทราบ','CONTROL'],
    ['ทำ Visual Reference Sheet','แยกสิ่งที่เห็นได้ชัด: อาคารซ้าย/ขวา, pavilion, guardhouse, pods, pool, road, landscape','QA'],
    ['Mark จุดที่ “เห็นต่าง” จากแบบ PDF','บันทึกเป็น mismatch โดยยังไม่สรุปว่าต้องแก้จนกว่าจะตรวจ source drawing','QA'],
    ['แยกข้อสังเกตเป็น Appearance / Geometry / Unknown','Appearance เช่น material; Geometry เช่นแนวผนัง; Unknown คือสิ่งที่ perspective ตัดสินไม่ได้','QA'],
    ['ห้ามวัด footprint/setback/height จาก perspective','ถ้าไม่มีมิติใน PDF ให้ mark UNKNOWN และถามผู้ใช้','GATE']
  ]},
  {id:'P2',title:'2 · Reconstruct AutoCAD base from PDF',desc:'สร้าง DWG ใหม่จาก PDF เพราะไม่มีไฟล์ CAD/3D ต้นฉบับที่แก้ได้',tasks:[
    ['สร้าง BASE_ARCH_WORKING.dwg ใหม่','ตั้ง Units / Origin / UCS ก่อนนำเข้า','AUTOCAD'],
    ['PDFIMPORT/Attach Master/Site Plan แล้ว calibrate scale','ใช้ dimension ที่พิมพ์ในแบบเท่านั้น','AUTOCAD'],
    ['PDFIMPORT/trace แปลนสถาปัตย์ทุกชั้นที่มีใน PDF','จัดแต่ละชั้นแยก layer/block/xref','AUTOCAD'],
    ['Import/trace รูปด้านและรูปตัดที่มีใน PDF','ใช้ cross-check รูปทรงและระดับ','AUTOCAD'],
    ['Clean geometry: OVERKILL / JOIN / PURGE อย่างระมัดระวัง','เก็บ reference และ dimension แยก layer','AUTOCAD'],
    ['สร้าง layer standard: PDF_REF / TRACE_EXISTING / PROPOSED / REVISION / DIM / GRID / QA','ไม่มี layer NEW_3D เพราะไม่มี geometry 3D ต้นฉบับ','AUTOCAD'],
    ['ตรวจ scale จากมิติที่ระบุจริงในแบบ','ถ้าขัดกันให้หยุดและลง mismatch','QA'],
    ['Save milestone เป็น BASE_ARCH_v01.dwg','ห้ามทำงานต่อในไฟล์ import ดิบโดยไม่มี version','CONTROL']
  ]},
  {id:'P3',title:'3 · Site plan reconciliation',desc:'เทียบ site/master plan กับภาพ 3D ล่าสุดโดยใช้ PDF เป็นฐานมิติ',tasks:[
    ['Trace/clean site boundary, road, access, pool, building footprints จาก PDF','สร้างฐาน site ที่วัดได้ก่อน','SITE'],
    ['ตรวจอาคารฝั่งซ้ายกับภาพ 3D ล่าสุด','ถ้าดูไม่ตรงให้บันทึก mismatch; ห้ามแก้ footprint จากภาพอย่างเดียว','SITE'],
    ['ตรวจอาคารฝั่งขวากับภาพ 3D ล่าสุด','แยก visual difference กับ confirmed geometry difference','SITE'],
    ['ตรวจ Pavilion กลาง','ถ้าตำแหน่ง/สัดส่วนไม่ชัดจาก PDF ให้ mark pending','SITE'],
    ['ตรวจ Guardhouse / barrier / ทางเข้า','ใช้ภาพ 3D เป็น visual target แต่ dimension ต้องมาจากแบบหรือคำยืนยัน','SITE'],
    ['ตรวจ Pods / อาคารย่อยที่เห็นในภาพ','หาว่ามีใน PDF หรือไม่; ถ้าไม่มีให้สร้าง issue ก่อนเขียนใหม่','SITE'],
    ['ตรวจสระ/deck/island/parking/circulation','ใช้ PDF เป็นฐานและภาพเป็น design reference','SITE'],
    ['ออก SITE REVIEW v1 พร้อม mismatch overlay/markup','ขอ approval ก่อนแก้ geometry ที่ไม่มีหลักฐานมิติ','GATE']
  ]},
  {id:'P4',title:'4 · Existing architectural drawing review',desc:'ตรวจแบบอาคารที่มีอยู่ทีละชุดก่อนตัดสินว่าอะไรต้องแก้',tasks:[
    ['ทำ Drawing Index จาก PDF สถาปัตย์','ระบุหน้า/ประเภท: plans, elevations, sections, details, schedules','CONTROL'],
    ['ตรวจว่าแบบชุด 7 ชั้น/35 ห้องเป็นอาคารใดในภาพ 3D','ห้ามฟันธงซ้ายหรือขวาจนกว่าจะยืนยันจาก source','GATE'],
    ['เทียบ floor plans กับ elevations/sections ภายใน PDF เอง','หา inconsistency ของแบบเดิมก่อนเทียบภาพ 3D','QA'],
    ['เทียบ façade/openings/roof กับภาพ 3D ล่าสุด','บันทึก mismatch เป็นรายการ ไม่แก้ทันที','ARCH'],
    ['แยก mismatch เป็น plan-impact / elevation-only / material-only / unknown','ใช้กำหนด effort และลำดับแก้','QA'],
    ['ขอคำยืนยันผู้ใช้ในจุดที่ภาพอย่างเดียวตัดสินไม่ได้','เช่น footprint, จำนวนชั้น, ระยะถอย, ความสูง','GATE']
  ]},
  {id:'P5',title:'5 · Revise 2D architecture after approval',desc:'แก้เฉพาะ mismatch ที่ยืนยันแล้วใน AutoCAD',tasks:[
    ['สร้าง revision copy จาก BASE_ARCH ไม่แก้ baseline','เช่น ARCH_REV_A_WORKING.dwg','CONTROL'],
    ['แก้ Site Plan ตามรายการ approved','ทุกการแก้ผูกกับ mismatch ID','ARCH'],
    ['แก้ Floor Plan เฉพาะส่วนที่ได้รับการยืนยัน','ไม่ปรับ layout จากความรู้สึกตาม render','ARCH'],
    ['แก้ Elevations ให้สะท้อน visual design intent ที่อนุมัติ','façade/openings/canopy/parapet/material zones','ARCH'],
    ['แก้ Sections หาก geometry/level กระทบจริง','คง level เดิมเมื่อไม่มี revision ยืนยัน','ARCH'],
    ['อัปเดต Door/Window tags และ schedules เมื่อ geometry เปลี่ยน','ห้ามเปลี่ยน schedule เพื่อให้ “ดูเข้ากัน” โดยไม่มีหลักฐาน','SCHEDULE'],
    ['อัปเดต architectural details ที่ได้รับผลกระทบ','stairs/toilets/railings/façade ฯลฯ','DETAIL'],
    ['ออก REVIEW PDF พร้อม revision clouds/issue IDs','ใช้ตรวจรอบก่อน Architecture Freeze','QA']
  ]},
  {id:'P6',title:'6 · Build new Blender model from drawings',desc:'สร้าง 3D ใหม่จาก DWG/PDF ที่แก้แล้ว แล้วใช้ภาพ render เป็น visual target',tasks:[
    ['เริ่ม SHANGRILA_MASTER.blend ใหม่จาก clean template','เพราะไม่มีโมเดล 3D ต้นฉบับให้แก้','BLENDER'],
    ['ตั้ง Metric units / origin / collections','ให้สอดคล้องกับ AutoCAD','BLENDER'],
    ['Import/Link revised CAD geometry','แยก source import collection และล็อก reference','BLENDER'],
    ['ขึ้น massing จาก plan + section/elevation dimensions','ห้ามใช้ perspective เป็นตัวกำหนด scale','BLENDER'],
    ['ขึ้น walls/slabs/cores/openings/roof ตาม revised drawings','ใช้ repeatable modules/instances เมื่อเหมาะสม','BLENDER'],
    ['ปรับ façade/material/visual language ให้เข้าใกล้ภาพ 3D ล่าสุด','ภาพ reference มีอำนาจด้าน appearance ไม่ใช่มิติ','BLENDER'],
    ['ขึ้น Pavilion/Guardhouse/Pods/Pool เฉพาะส่วนที่มีข้อมูลพอ','ส่วนที่ไม่พอให้ใช้ placeholder และ tag UNKNOWN','BLENDER'],
    ['สร้าง review cameras: Top/Front/Back/Left/Right/Bird-eye','ใช้มุมเดิมทุกรอบเพื่อเทียบ drift','QA'],
    ['Render Draft v1 และทำ side-by-side กับภาพ reference','บันทึกสิ่งที่ต่างและแยก geometry vs appearance','QA']
  ]},
  {id:'P7',title:'7 · CAD ↔ Blender QA',desc:'ตรวจว่าโมเดลที่สร้างใหม่ตรงกับ revised drawings จริง',tasks:[
    ['Compare plan footprint CAD กับ Blender Top Orthographic','ใช้ scale/origin เดียวกัน','QA'],
    ['Compare elevations CAD กับ Blender orthographic 4 ด้าน','ตรวจ openings/façade/roof profile','QA'],
    ['Compare section levels กับ Blender Z values','ทุก level ที่มี dimension ต้องตรง','QA'],
    ['ตรวจ stair/lift/void/core continuity','cross-floor consistency','QA'],
    ['ตรวจ door/window tags กับ geometry','ไม่มี orphan/missing tags','QA'],
    ['ปิด mismatch ทีละ ID พร้อมหลักฐาน Before/After','ห้าม mark done ด้วย visual similarity อย่างเดียว','QA'],
    ['สร้าง Architecture Freeze v1','Freeze เมื่อ source + CAD + Blender sync กันในส่วนที่อนุมัติ','GATE']
  ]},
  {id:'P8',title:'8 · MEP coordination after Architecture Freeze',desc:'ค่อยประสานแบบระบบหลังสถาปัตย์นิ่ง',tasks:[
    ['Overlay Electrical/Fire PDF กับ revised architecture','ตรวจตำแหน่งอุปกรณ์กับ partition/ceiling ใหม่','MEP'],
    ['Overlay Sanitary PDF กับ revised architecture','ตรวจ wet core/shaft/fixture locations','MEP'],
    ['สร้าง Architecture ↔ MEP clash list','AI ช่วย mark แต่ engineer ต้องยืนยันระบบ','MEP'],
    ['ส่งจุดกระทบให้ผู้รับผิดชอบระบบตรวจ','ห้าม AI เปลี่ยน sizing/code requirement เอง','GATE'],
    ['อัปเดต openings/shafts ใน architecture ตามผล coordination','loop จน critical clash = 0 หรือมี approved exception','MEP']
  ]},
  {id:'P9',title:'9 · Final architectural drawing set',desc:'ออกชุดแบบที่ trace กลับไปยัง source และ revision ได้',tasks:[
    ['Cover / Drawing Index / General Notes','revision/date/status ต้องชัด','DELIVER'],
    ['Location / Master / Site / Enlarged Site Plans','ใช้ revision ที่ approved','DELIVER'],
    ['Floor Plans ทุกชั้นที่อยู่ใน scope','dimensions/tags/levels ครบ','DELIVER'],
    ['Roof Plans / Elevations / Sections','sync กับ Blender และ source dimensions','DELIVER'],
    ['Ancillary building sheets เฉพาะส่วนที่ยืนยันให้ก่อสร้าง','Pavilion/Guardhouse/Pods ตาม scope จริง','DELIVER'],
    ['Architectural Details + Door/Window Schedules','updated to approved revision','DELIVER'],
    ['Export Issued PDF Set','ตั้งชื่อ revision/date ชัด','DELIVER'],
    ['Archive Issued DWG Set','clean xrefs / relative paths ตามมาตรฐานทีม','DELIVER'],
    ['Archive final .blend + linked assets','Pack Resources หรือ relative paths','DELIVER'],
    ['ออก Final QA + unresolved items','UNKNOWN/PENDING ต้องแสดง ไม่ปิดบัง','DELIVER']
  ]}
];

const prompts = [
  ['Astra · Master control prompt',`คุณเป็น Architecture Coordination Agent ของโครงการ Shangri-La Hua Hin

สถานะ source ที่ต้องยึด:
- ไม่มีไฟล์ 3D editable ต้นฉบับ (.blend/.fbx/.skp/.max/BIM)
- มี PDF แบบสถาปัตย์ / Master Plan / Electrical-Fire / Sanitary / Interior และภาพ 3D-render reference ที่ผู้ใช้ให้
- ภาพ 3D/render = Visual Design Intent เท่านั้น ไม่ใช่แหล่งมิติจริง
- มิติ/ระดับ/plan/section/detail ให้ยึดจาก PDF ที่มี dimension จนกว่าจะมี revision ที่ผู้ใช้ยืนยัน

เป้าหมายคือสร้าง AutoCAD working set จาก PDF, resolve mismatch ที่ได้รับการอนุมัติ, แล้วสร้าง Blender model ใหม่จาก revised drawings ให้ visual ใกล้ภาพ reference ล่าสุด

กติกา:
1) ห้าม overwrite 00_ORIGINAL
2) อ่าน docs/SOURCE_REGISTER.md ก่อนทุก phase
3) ห้ามสมมติว่ามี 3D model ต้นฉบับ
4) ห้ามวัดมิติจาก perspective render
5) ถ้าภาพ 3D ดูไม่ตรงกับ PDF ให้สร้าง mismatch ID ก่อน ไม่แก้ทันที
6) ถ้าไม่มี dimension/หลักฐาน ให้ mark UNKNOWN และถามผู้ใช้
7) ทำงานเฉพาะ 01_WORKING และบันทึก version milestone
8) หลังแต่ละ phase ทำ QA + Before/After screenshot
9) อย่าแก้ MEP แบบเต็มก่อน Architecture Freeze

เริ่มจากตรวจ Source Register → สร้าง mismatch list → รอ approval ก่อนแก้ geometry`],

  ['AutoCAD · PDF → clean measurable base',`เปิด AutoCAD และสร้าง BASE_ARCH_WORKING.dwg ใหม่

ข้อเท็จจริง: ไม่มี DWG ต้นฉบับและไม่มี editable 3D model ให้ดึง geometry
ดังนั้นให้สร้างฐาน CAD จาก PDF เท่านั้น

ขั้นตอน:
1) ตั้ง Units / Origin / UCS
2) Attach/PDFIMPORT Master Plan และ Architectural PDF
3) Calibrate scale จาก dimension ที่พิมพ์ในแบบ ห้ามวัดจากภาพ perspective
4) Trace/Clean plan, elevation, section ที่จำเป็น
5) สร้าง layers: PDF_REF, TRACE_EXISTING, PROPOSED, REVISION, GRID, DIM, TEXT, QA
6) แยก floor/section/elevation เป็น block/xref ที่ตรวจย้อนกลับได้
7) ถ้ามิติจาก PDF สองหน้าขัดกัน ให้หยุดและสร้าง mismatch ID
8) Save เป็น BASE_ARCH_v01.dwg

ห้ามสร้าง layer NEW_3D หรืออ้างว่า import geometry จาก 3D เพราะไม่มี source ดังกล่าว`],

  ['Astra · Visual reference review',`อ่านภาพ 3D/render ล่าสุดที่ผู้ใช้ให้เป็น Visual Design Intent

ให้ทำตาราง:
- Element
- What is visible in render
- What PDF says
- Difference type: Appearance / Geometry / Unknown
- Evidence
- Mismatch ID
- Proposed next action

ตรวจอย่างน้อย: อาคารซ้าย, อาคารขวา, pavilion, guardhouse, pods, pool, road/parking, landscape

สำคัญ:
- ห้ามวัดระยะจาก perspective
- ห้ามสรุปว่าอาคารต้องแก้ทั้งหลังเพียงเพราะภาพดูต่าง
- ห้ามฟันธงว่าแบบ 7 ชั้นเป็นอาคารซ้ายหรือขวาจนกว่าจะมีหลักฐาน
- ถ้าตัดสินไม่ได้ให้เขียน UNKNOWN และถามผู้ใช้`],

  ['Blender · Rebuild from revised drawings',`สร้าง SHANGRILA_MASTER.blend ใหม่จากศูนย์ เพราะไม่มีโมเดล 3D ต้นฉบับ

ใช้ revised AutoCAD drawings เป็น geometry authority และใช้ภาพ 3D/render ล่าสุดเป็น visual reference

ขั้นตอน:
1) ตั้ง Metric units และ origin ให้ตรง CAD
2) Import/Link revised CAD
3) สร้าง collections ตามอาคาร/องค์ประกอบที่ยืนยันแล้ว
4) ขึ้น massing จาก plan + elevation + section dimensions
5) ขึ้น wall/slab/core/openings/roof ตาม drawings
6) ปรับ façade/material/visual language ให้ใกล้ render โดยไม่เปลี่ยน dimension เอง
7) ส่วนที่ไม่มีข้อมูลพอให้ใช้ placeholder + tag UNKNOWN
8) สร้าง Top/Front/Back/Left/Right/Bird-eye cameras
9) Render Draft v1 และทำ mismatch list รอบใหม่

ห้าม reverse-engineer scale จาก perspective image`],

  ['Computer Use · guarded execution',`ทำงานบน Desktop แบบ guarded execution:
- อ่าน docs/SOURCE_REGISTER.md ก่อน
- ทำเฉพาะไฟล์ใน 01_WORKING
- ก่อน action ชุดใหญ่ให้ screenshot Before
- หลัง action ตรวจ file path / units / scale / layers / version แล้ว screenshot After
- ทุก geometry change ต้องอ้าง mismatch ID ที่ approved
- ถ้า dialog ไม่แน่ใจ, source หาย, dimension ขัดกัน หรือจำเป็นต้องเดา ให้หยุดและถาม
- ห้าม overwrite/delete 00_ORIGINAL
- ห้ามอ้างว่ามี editable 3D source model
- ห้าม issue FINAL โดยไม่มี approval gate`],

  ['QA · CAD ↔ rebuilt Blender ↔ source',`ตรวจ revised CAD กับ Blender ที่สร้างใหม่ และตรวจย้อนกลับไปยัง PDF source

1) Plan: CAD footprint vs Blender Top Orthographic
2) Elevation: openings/façade/roof vs Blender orthographic
3) Section: levels/void/stairs/roof vs Blender Z values
4) Visual intent: render reference ใช้ตรวจ appearance เท่านั้น

ทำ mismatch table: ID, location, PDF source, CAD value, Blender value, render observation, status
PASS ได้เมื่อ geometry ตรงกับ source/approved revision ไม่ใช่เพียง “ดูคล้าย”`],

  ['Final issue gate',`ก่อนออกชุดแบบ FINAL ให้ตรวจ:
- SOURCE_REGISTER เป็นปัจจุบัน
- Mismatch Register ไม่มี critical item ค้าง หรือมี approved exception
- Drawing index ครบตาม scope ที่ยืนยันจริง
- Plans/elevations/sections/details/schedules sync กัน
- Revised CAD ↔ rebuilt Blender ตรงกันใน geometry ที่วัดได้
- Render reference ถูกใช้เฉพาะ visual intent ไม่ใช่ dimension source
- MEP critical clashes = 0 หรือมี signed/approved exception
- DWG/PDF/BLEND archive เปิดได้จากเครื่องอื่น
- UNKNOWN/PENDING ทุกข้อถูกแสดงใน Final QA

ห้ามเติมข้อมูลที่ source ไม่รองรับเพื่อให้แบบดูสมบูรณ์`]
];

const stateKey='shangrila_arch_checklist_v2';
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
    visible.forEach(({t,id})=>{
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
