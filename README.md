# Shangri-La Architecture Workflow

Static, Netlify-ready project control board for coordinating the revised Shangri-La Hua Hin architectural drawing set and Blender model.

## What this site is for

The final target is:

- revised architectural DWG set that matches the latest approved 3D design intent;
- issued architectural PDF drawing set;
- coordinated Blender master model;
- mismatch / revision / QA trail;
- a guarded GPT/Astra + Computer Use workflow for AutoCAD and Blender.

The website deliberately does **not** embed the source drawing PDFs, because a Netlify/GitHub deployment may be public. Keep original project files in a private local/cloud project directory unless you explicitly choose a private repository.

## Source-derived baseline used to prepare the checklist

The uploaded architecture set identifies the main residential building as a 7-storey, 35-room building and provides floor plans, roof, elevations, sections, stair details, bathroom details, and door/window schedules. The current main building grid is shown around 14.00 m × 19.50 m, with floor levels running from +0.10 through +20.90 and the main roof around +23.00 m. The uploaded electrical/fire and sanitary sets use the same existing building geometry, so the checklist freezes architecture before full MEP re-coordination.

The latest supplied 3D view visually introduces/clarifies two main blocks, a central pavilion, organic pool, a smaller guardhouse/entry arrangement, ancillary pods and a revised parking/circulation composition. Exact geometry must be taken from the actual 3D model or orthographic exports, not measured from the perspective image.

## Local use

Open `index.html` directly, or serve it locally:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

Checkbox progress is stored in browser `localStorage`. Use **Export progress** to save a JSON snapshot.

## Netlify

This is a zero-build static site. In Netlify:

- Build command: leave blank
- Publish directory: `.`

`netlify.toml` already contains the publish configuration.

## Recommended project folders (outside this public website repo)

```text
SHANGRILA_PROJECT/
├─ 00_ORIGINAL/
├─ 01_SOURCE_REGISTER/
├─ 02_3D_EXPORT/
├─ 03_AUTOCAD_WORKING/
├─ 04_BLENDER_WORKING/
├─ 05_REVIEW/
├─ 06_ISSUED/
├─ 07_RENDER/
└─ 08_REVISION_QA/
```

## Important

AI/Computer Use can accelerate drafting, comparison, scripting and coordination, but permit/construction drawings should be reviewed and issued by the responsible qualified architects/engineers.
