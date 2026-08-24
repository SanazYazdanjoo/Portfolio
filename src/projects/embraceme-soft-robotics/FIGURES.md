# EmbraceMe — figures extracted from `Group_Report__EmbraceMe__.docx`

15 distinct images, 17 placements (two files are placed twice in the report).
All are full-resolution originals, untouched. Crop before optimising.

## Publishable — your own work

| File | Report caption | Pixels |
|---|---|---|
| `fig01_sketch-backpack-concept.jpg` | Fig. 1 — Early sketch, backpack model | 2048×2031 |
| `fig02_sketch-standalone-concept.jpg` | Fig. 2 — Early sketch, standalone model | 1536×2048 |
| `fig08_arm-final-structure.jpg` | Fig. 8 — The final structure of the arm | 1535×2048 |
| `fig09_tpu-transparent.jpg` | Fig. 9 — Homogenous inflatable components, transparent TPU | 1536×2048 |
| `fig10_tpu-inconsistent-inflation.png` | Fig. 10 — Inconsistent volume of inflated TPU | 1273×761 |
| `fig11_tpu-yellow.jpg` | Fig. 11 — Inflatable component, yellow TPU | 768×1024 |
| `fig12_air-channel-pipes.jpg` | Fig. 12 — Air channel, using pipes | 2048×1535 |
| `fig13_arduino-setup.jpg` | Fig. 13 — Arduino setup | 768×1024 |
| `fig14_touch-sensor-chest.png` | Fig. 14 — Touch sensor on the chest of the robot | 1031×1335 |
| `fig15_inner-structure.jpg` | Fig. 15 — Inner structure | 1152×2048 |
| `fig16_final-build-pink.jpg` | Fig. 16 — Final structure | 1535×2048 |

## `_cited-sources-do-not-publish/`

Figs. 3–7 sit in the fabrication-techniques section next to citation [18]. They
appear to be reproduced from published literature, not photographed by your team.
Fine in an academic report under citation; **not** fine on a commercial portfolio
without permission. Verify against your reference list before using any of them.

Two report errors found while mapping: Figs. 5 and 6 are the same image file, and
Figs. 7(a) and 7(b) are the same image file. If the report was meant to show two
different things in each pair, one image of each pair was lost at insert time.

## Crop notes

- `fig09` — a foot in a sandal is visible at bottom-left. Crop it.
- `fig16` — cable spaghetti and a power strip on the floor. Crop tight to the
  artefact and the stand, or keep the mess and caption it honestly as the
  exhibition build. Both are defensible; the tight crop reads more finished.
- No faces appear in any image, so no consent question arises.

## Doing this yourself next time

```bash
unzip -o report.docx -d unpacked && open unpacked/word/media/
```

A `.docx` is a ZIP. Everything embedded lives in `word/media/`, at the resolution
it was inserted at — no quality loss, no screenshotting. Same trick works on
`.pptx` and `.xlsx`.

For a PDF (your `FBHCI_Individual_Final_Report.pdf`):

```bash
pdfimages -all report.pdf out    # writes out-000.png, out-001.jpg, …
```
