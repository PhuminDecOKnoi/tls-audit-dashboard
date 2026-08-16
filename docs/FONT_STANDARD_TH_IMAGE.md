# FONT_STANDARD_TH_IMAGE.md

## Default Thai Image Font Standard

**Version:** 1.0  
**Status:** Active / Default Standard  
**Owner / Context:** Phumin Decoknoi — HR / Labour Law / Labour Audit / ISO / Legal Infographic Workflows  
**Effective Use:** All SKILL workflows related to image generation, infographic, mockup, legal visual, mind-mapping, presentation image, dashboard image, and social knowledge visuals.

---

## 1. Core Font Standard

| Visual Role | Default Font | Usage Intent |
|---|---|---|
| Heading / Main Title | `TH Chakra Petch Bold` | Strong, modern, professional Thai headline for infographic and legal visuals |
| Body / Explanation | `THSarabunNew` | Clear Thai body text, legal explanation, audit notes, and formal content |
| Alternative Premium | `TH Niramit AS` | Executive, premium, formal presentation, dashboard, and professional visual tone |

### Mandatory Default Mapping

- **Heading** = `TH Chakra Petch Bold`
- **Body** = `THSarabunNew`
- **Alternative Premium** = `TH Niramit AS`

---

## 2. Font Family Inventory

The following Thai font families are recognized from the `19_Fonts` library and may be used in image-related SKILL workflows where appropriate.

| Font Family | Recommended Role | Notes |
|---|---|---|
| `THSarabunNew` | Primary body / formal text | Best default for Thai legal, HR, audit, and official content |
| `THSarabun` | Body / fallback | Use when `THSarabunNew` is unavailable |
| `THSarabunIT๙` | Formal Thai / numeric variant | Use for official-style Thai documents where appropriate |
| `TH Chakra Petch` | Heading / infographic | Best default for modern legal infographic titles |
| `TH Niramit AS` | Premium / executive | Use for polished reports, dashboards, presentations |
| `TH NiramitIT๙` | Formal Thai / alternate | Use as formal alternative where appropriate |
| `TH Fahkwang` | Modern Thai / presentation | Use for clean presentation-style visuals |
| `TH Kodchasal` | Contemporary Thai | Use for modern explanatory visuals |
| `TH KoHo` | Corporate / modern | Use for professional design variation |
| `TH Krub` | Friendly professional | Use for less formal educational visuals |
| `TH Baijam` | Creative / graphic | Use only when visual tone allows |
| `TH K2D July8` | Display / graphic | Use sparingly for display emphasis |
| `TH Charmonman` | Decorative | Use only for special decorative heading; avoid for legal body text |
| `TH Charm of AU` | Decorative | Use only for special visual effects |
| `TH Mali Grade6` | Educational / handwritten | Avoid in formal legal/audit content unless intentionally educational |
| `TH Srisakdi` | Traditional / decorative | Use for ceremonial or traditional accent only |

---

## 3. Typography Rules for Image / Infographic SKILLs

### 3.1 Main Title

Use:

```text
TH Chakra Petch Bold
```

Recommended for:

- Legal topic title
- Labour law section title
- ISO / audit heading
- Mind-map central node
- Dashboard cover heading
- Executive visual headline

Examples:

```text
มาตรา 70 การจ่ายค่าจ้าง
สินจ้างแทนการบอกกล่าวล่วงหน้า
Labour Compliance Mapping
TLS 8001 Audit Dashboard
```

---

### 3.2 Section Heading

Use one of the following:

```text
TH Chakra Petch Bold
THSarabunNew Bold
TH Niramit AS Bold
```

Recommended for:

- Group title
- Legal clause grouping
- Step title
- Risk category
- Process phase
- Compliance control title

---

### 3.3 Body Text

Use:

```text
THSarabunNew
```

Recommended for:

- Explanation
- Legal analysis
- Audit criteria
- Finding summary
- Corrective action
- Notes / limitations
- Evidence list

Body text must be readable, not decorative.

---

### 3.4 Legal Text / Statutory Reference

Use:

```text
THSarabunNew
THSarabunNew Bold
```

Recommended format:

```text
[LAW] พระราชบัญญัติคุ้มครองแรงงาน พ.ศ. 2541 มาตรา XX
```

Rules:

- Keep legal references clear and formal.
- Avoid decorative fonts for statutory text.
- Use bold only for section number, article number, or legal keyword.
- Do not compress Thai legal text too tightly.

---

### 3.5 Highlight Number / Key Metric

Use:

```text
TH Chakra Petch Bold
```

Recommended for:

- Section number
- KPI number
- Timeline number
- Risk level
- Audit score
- Manday count

---

### 3.6 Caption / Footnote / Source Note

Use:

```text
THSarabunNew
```

Recommended for:

- Source note
- Disclaimer
- Audit limitation
- Version note
- Date note

Minimum readability rule:

- Do not use very small Thai text in final PNG/JPG.
- If citation/source text is too long, move it to a separate note area.

---

## 4. SKILL Integration Policy

This standard applies by default to every SKILL workflow that creates or designs visual outputs, including but not limited to:

- `/SKILL * infographic`
- `/SKILL * legal * infographic`
- `/SKILL * legal * mockup png`
- `/SKILL * mockup * png`
- `/SKILL * mind-mapping`
- `/SKILL * legal * mind-mapping`
- `/SKILL * Image png`
- `/SKILL * dashboard image`
- `/SKILL * A3 infographic`
- `/SKILL * presentation visual`
- `/SKILL * LinkedIn visual`

### Default Instruction Block for Visual SKILLs

```md
## Default Thai Image Font Standard

For all image-generation, infographic, mockup, and mind-mapping outputs, apply this typography standard unless the user explicitly requests otherwise:

- Heading: `TH Chakra Petch Bold`
- Body: `THSarabunNew`
- Alternative Premium: `TH Niramit AS`

### Typography Mapping

- Main title / central node: `TH Chakra Petch Bold`
- Section heading: `TH Chakra Petch Bold` or `THSarabunNew Bold`
- Body explanation: `THSarabunNew`
- Legal text / statutory reference / article / clause: `THSarabunNew`
- Highlight number / key term: `TH Chakra Petch Bold`
- Premium executive tone: `TH Niramit AS`

### Thai Readability Rules

- Prioritize Thai readability over decorative style.
- Avoid overcrowded text in one frame.
- Use strong contrast between text and background.
- Preserve Thai spelling, legal terminology, section numbers, and statutory names accurately.
- For complex legal content, prefer concise grouped boxes over dense paragraphs.
```

---

## 5. Image Production Method

For best quality Thai infographic output, use the following workflow:

```text
1. Design visual structure / layout
2. Generate or prepare background / illustration
3. Render Thai text with selected TTF font
4. Check Thai spelling, spacing, line breaks, and legal references
5. Export as PNG/JPG/PDF as required
```

### Important Technical Note

AI image generation may approximate fonts visually. For outputs that require exact Thai typography, the final text should be rendered using the actual `.ttf` font file through a text-rendering engine, design software, or image composition workflow.

---

## 6. Recommended Visual Pairings

| Use Case | Heading | Body | Premium / Alternative |
|---|---|---|---|
| Legal infographic | `TH Chakra Petch Bold` | `THSarabunNew` | `TH Niramit AS` |
| Labour law mind-map | `TH Chakra Petch Bold` | `THSarabunNew` | `TH Niramit AS` |
| HR / audit visual | `TH Chakra Petch Bold` | `THSarabunNew` | `TH Niramit AS` |
| ISO / management system visual | `TH Chakra Petch Bold` | `THSarabunNew` | `TH Niramit AS` |
| Executive dashboard image | `TH Chakra Petch Bold` | `THSarabunNew` | `TH Niramit AS` |
| LinkedIn knowledge post | `TH Chakra Petch Bold` | `THSarabunNew` | `TH Fahkwang` or `TH KoHo` |
| Formal Thai document visual | `THSarabunNew Bold` | `THSarabunNew` | `TH Niramit AS` |

---

## 7. CSS / HTML Reference Snippet

When building HTML, dashboard, or web-based image exports, use a structure similar to the following.

```css
/* Thai Visual Font Standard */
:root {
  --font-th-heading: "TH Chakra Petch", "TH Chakra Petch Bold", sans-serif;
  --font-th-body: "THSarabunNew", "TH Sarabun New", sans-serif;
  --font-th-premium: "TH Niramit AS", "TH Niramit", serif;
}

.visual-title,
.mindmap-central-node,
.legal-heading {
  font-family: var(--font-th-heading);
  font-weight: 700;
}

.visual-body,
.legal-body,
.audit-note,
.caption {
  font-family: var(--font-th-body);
  font-weight: 400;
}

.premium-heading,
.executive-summary {
  font-family: var(--font-th-premium);
}
```

---

## 8. Do / Do Not

### Do

- Use `TH Chakra Petch Bold` for strong infographic headings.
- Use `THSarabunNew` for readable Thai explanation and legal content.
- Use `TH Niramit AS` when a more premium/executive look is needed.
- Keep Thai text large enough for mobile viewing.
- Separate dense legal information into clear groups.
- Verify section numbers, article numbers, legal names, and spelling before final export.

### Do Not

- Do not use decorative fonts for statutory text.
- Do not pack too many legal paragraphs into one image.
- Do not rely on AI-generated text where exact Thai spelling is critical.
- Do not distribute or embed font files unless the font license permits it.
- Do not treat font style as a substitute for legal accuracy.

---

## 9. Source Classification

| Classification | Meaning |
|---|---|
| `[CONS]` | Consultant / design methodology recommendation |
| `[CLIENT]` | User-specific design preference and workflow standard |
| `[DATA]` | Font file inventory identified from the user’s Drive font library |
| `[EVID]` | File names and font family names observed in the font library |

This font standard is a **workflow and design standard**, not a legal, regulatory, or ISO requirement.

---

## 10. Version Control

| Version | Date | Change Summary |
|---|---|---|
| 1.0 | 2026-08-14 | Established default Thai visual font standard: Heading = `TH Chakra Petch Bold`, Body = `THSarabunNew`, Alternative Premium = `TH Niramit AS` |

---

## 11. Standard Summary

```text
Default Thai Image Font Standard

Heading = TH Chakra Petch Bold
Body = THSarabunNew
Alternative Premium = TH Niramit AS

Apply to:
- infographic
- legal visual
- mockup png
- mind-mapping
- dashboard image
- presentation image
- LinkedIn visual
- Thai legal / HR / audit knowledge visuals
```
