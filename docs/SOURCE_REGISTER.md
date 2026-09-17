# SOURCE REGISTER — Shangri-La Hua Hin

> Purpose: identify every source currently available to the project, what it is allowed to be used for, and what must **not** be assumed from it.

## Important limitation

There is **no original editable 3D model file** available in this project at this time. The only current 3D/design-intent evidence is the rendered image(s) provided by the user. Therefore:

- Do **not** assume any `.blend`, `.fbx`, `.obj`, `.skp`, `.max`, `.dwg 3D`, or BIM model exists.
- Do **not** derive exact dimensions from perspective images.
- Do **not** treat the latest 3D image as a dimensionally reliable geometric source.
- Use the latest 3D image for **visual / form / massing / façade intent only** until geometry is rebuilt and verified against drawings.
- When the image and drawing set appear inconsistent, log the difference in `MISMATCH_REGISTER.md`; do not silently overwrite dimensions.

---

## Source hierarchy

Use this hierarchy only for the type of information stated below.

1. **Latest user-provided 3D/render image** — visual design intent only
2. **Architectural drawing PDF** — primary source for dimensions, floor levels, plans, elevations, sections, door/window schedules and architectural details
3. **Master Plan PDF** — site boundary, site arrangement, access and overall planning reference
4. **Electrical / Fire PDF** — existing electrical and fire-protection coordination reference
5. **Sanitary PDF** — existing sanitary/plumbing coordination reference
6. **Interior design PDF** — interior visual/reference intent
7. **Older rendering/presentation PDFs** — historical visual reference only unless specifically confirmed by the user

A later date does not automatically supersede another source. Supersession must be explicitly recorded.

---

## Register

| ID | Source file / item | Category | Known date / revision | Primary use | Authority / status | Restrictions / notes |
|---|---|---|---|---|---|---|
| SRC-001 | `PDF_แบบงานสถาปัตยกรรม_02-08-69.pdf` | Architecture | 02-08-69 | Floor plans, elevations, sections, levels, stairs, bathrooms, door/window schedules, architectural dimensions/details | **Primary dimensional architectural baseline** | Existing drawing set. Must be checked against latest visual design intent before issuing revised drawings. |
| SRC-002 | `MASTER PLAN(01-08-69).pdf` | Site / Master Plan | 01-08-69 | Site layout, boundary geometry, access, overall arrangement | **Primary site baseline** | Use as site reference; verify against architectural site-plan sheets where differences exist. |
| SRC-003 | `PDF_แบบงานระบบไฟฟ้าและดับเพลิง_02-08-69.pdf` | Electrical / Fire | 02-08-69 | Lighting, outlets, fire alarm and fire-system coordination | **Existing MEP coordination reference** | Do not update MEP geometry before architecture is frozen. |
| SRC-004 | `PDF_แบบงานระบบสุขาภิบาล_02-08-69.pdf` | Sanitary / Plumbing | 02-08-69 | Water supply, waste, soil, vent, tanks, pumps and sanitary coordination | **Existing MEP coordination reference** | Do not use to define architecture. Re-coordinate only after architectural geometry is confirmed. |
| SRC-005 | `SHANGRILA HUAHIN ,งานออกแบบตกแต่งภายใน(05-08-69).pdf` | Interior | 05-08-69 | Interior mood, material and visual intent | **Interior reference** | Presentation/reference source; not assumed dimensionally authoritative unless dimensions are explicitly shown and verified. |
| SRC-006 | `SHANGRILA HUAHIN(04-08-69).pdf` | Presentation / Exterior render | 04-08-69 | Historical exterior/master-plan visual reference | **Historical visual reference** | Must not override current architectural dimensions or latest user-provided 3D image. |
| SRC-007 | `Architectural_Renderings.pdf` | Render / Interior + exterior reference | Unknown / exported 2026-09-06 | Visual reference for rooms, outdoor areas and overall appearance | **Reference only** | Use for material/appearance comparison, not exact geometry. |
| SRC-008 | `guardhouse_smaller_edit(1).png` | Latest 3D / design-intent image | Current user-provided image | Latest visible massing, façade, site composition, guardhouse scale and overall appearance | **Current visual design intent** | **Image only. No original 3D model exists.** Never derive exact dimensions or hidden geometry from this perspective alone. |

---

## What each source controls

### Visual / appearance decisions
Use `SRC-008` first for:
- overall architectural appearance
- visible massing
- façade language
- visible guardhouse scale
- visible pool / landscape composition
- visible relationship between major site elements

If a visual element is unclear because of perspective, obstruction or resolution, mark it `UNVERIFIED`.

### Dimensional / technical architectural decisions
Use `SRC-001` first for:
- dimensions
- floor-to-floor / finished-floor levels
- plan geometry
- sections
- stairs
- doors and windows
- room layouts
- architectural construction details

If a shape in `SRC-008` clearly appears different from `SRC-001`, do **not** immediately alter technical dimensions. Record a mismatch and rebuild only after the intended change is understood.

### Site decisions
Use `SRC-002` as the primary baseline for site geometry, then compare with:
- architectural site-plan sheets inside `SRC-001`
- visible composition in `SRC-008`

### MEP coordination
Use `SRC-003` and `SRC-004` only after the revised architectural base is sufficiently stable.

---

## Current assumptions that are NOT allowed

The following assumptions are prohibited unless the user later provides confirming files or instructions:

- “There is an original 3D model somewhere.”
- “The latest render is dimensionally accurate.”
- “The left and right buildings must both be redesigned.”
- “A visual difference automatically means the architectural drawing is wrong.”
- “A later PDF date automatically supersedes every earlier file.”
- “A hidden façade, rear elevation, roof arrangement or plan can be inferred accurately from one perspective image.”

---

## Required workflow when sources disagree

1. Identify the exact source IDs involved.
2. Describe the mismatch precisely.
3. Classify it as one of:
   - `VISUAL ONLY`
   - `DIMENSIONAL`
   - `PLAN GEOMETRY`
   - `ELEVATION / FAÇADE`
   - `SECTION / LEVEL`
   - `SITE`
   - `MEP COORDINATION`
4. Mark confidence: `HIGH / MEDIUM / LOW`.
5. Do not edit the original source.
6. Make changes only in working files.
7. Record the decision and who approved it.

Recommended companion file:

`docs/MISMATCH_REGISTER.md`

---

## Folder policy

```text
00_original/   # Original supplied files only. Never overwrite.
01_working/    # AutoCAD / Blender / derived working files.
02_review/     # PDFs, screenshots, overlays and QA exports.
03_final/      # Approved final deliverables only.
docs/
  SOURCE_REGISTER.md
  MISMATCH_REGISTER.md
  REVISION_LOG.md
```

### `00_original/`
Store only exact originals supplied by the user. Because no editable 3D source exists, `00_original/` should contain the latest PNG/JPG render image as an image source — **not** a placeholder `.blend` file.

---

## Astra / Computer Use instruction

When Astra is operating AutoCAD or Blender, use this rule:

> Read `docs/SOURCE_REGISTER.md` before editing. There is no original editable 3D model. Treat the latest 3D/render image as visual design intent only. Use the architectural PDF for dimensions and technical geometry. Never infer exact dimensions from perspective. When a drawing and the latest image conflict, create a mismatch entry and wait for a defined design decision before making irreversible geometry changes. Never overwrite files in `00_original/`.

---

## Register maintenance

Update this file whenever:
- a new DWG is obtained
- an original Blender / SketchUp / Revit / BIM model becomes available
- the user confirms one source supersedes another
- a new design render becomes the approved visual intent
- a revised architectural drawing set is issued
- a consultant submits updated MEP drawings

Last updated: 2026-09-17
