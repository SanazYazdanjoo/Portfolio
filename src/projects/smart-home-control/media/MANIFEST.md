# Smart Home Control — asset manifest

32 files. **v1 is the version that was TESTED. v2 is the post-test revision.** Do not
reverse this — the four documented changes only make sense in that direction.

---

## `v1/` — the tested prototype (16 files)

| File | What it is | Caption note |
|---|---|---|
| `00-flow-map.jpg` | Full set laid out with torn-paper directional arrows | **Hero image.** Pair with `v2/00-flow-map.jpg` as the closing image |
| `00b-facilitator-flow-script.jpg` | Handwritten branching lookup for the four task flows | The facilitator's script — conditional routing written so a session could be run in real time |
| `01-home.jpg` | Home: home carousel, room list with toggles, frequently-used shelf | Avatar facepile with `+2` overflow |
| `02-add-device-scanning.jpg` | Scanning state, radar, `FOUND (2)` | Live found-count in the section label. Step 1 of 3 |
| `03-name-device-select-room.jpg` | Naming + room assignment | `+ADD NEW ROOM` inline, so the flow has no dead end. Step 2 of 3 |
| `04-choose-device-users.jpg` | Per-device access at setup | Step 3 of 3. Permission decided at setup, not buried in settings |
| `05-device-added-success.jpg` | Confirmation | Progress indicator deliberately absent — the stepper terminates here |
| `06-room-living-room.jpg` | Room device list | `DELETE THIS ROOM` de-emphasised below the primary action |
| `07-smart-light-control.jpg` | Brightness slider, presets, `MANAGE ACCESS`, `LOCK WHILE IN USE` | **Canonical version of this screen.** See anomaly note below |
| `08-device-settings.jpg` | Access, room, deletion | The boxed room selector is the element Participant B tapped; unframed rows read as labels |
| `09-sheet-select-room.jpg` | Bottom sheet — triggered from "change room" | Paper cut with rounded top corners to carry the sheet's affordance |
| `10-sheet-edit-device-users.jpg` | Bottom sheet — triggered from "edit device users" | Same rounded-corner treatment |
| `11-home-settings-residents.jpg` | Residents with inline `REMOVE`, invite-by-link | The "before" for iteration pair 2 |
| `12-profile.jpg` | Account, device strip with `VIEW ALL` end-cap, plain avatar | The "before" for iteration pairs 3 and 4 |
| `13-sheet-interaction.mp4` | 3.6s — the edit-users sheet sliding up over device settings | Muted loop, `playsinline`, respect `prefers-reduced-motion` |
| `13-sheet-interaction-poster.jpg` | First frame | Poster attribute + print fallback for the video |

---

## `v2/` — the post-test revision (7 files)

Partial by design: only the screens that changed, plus the revised flow map.

| File | What it is |
|---|---|
| `00-flow-map.jpg` | Revised set with arrows, including the resident-actions overlay |
| `01-home-selected-indicator.jpg` | **Iteration 1 "after".** Green highlighter bracket on the "Josh's Home" card — that bracket *is* the fix. Do not crop, retouch or clean it |
| `11-home-settings-kebab.jpg` | **Iteration 2 "after".** Per-resident menu replaces inline remove |
| `11b-resident-actions-overlay.jpg` | The menu itself — remove user / make admin |
| `12-profile-viewall-and-avatar.jpg` | **Iterations 3 and 4 "after".** Editable avatar + `VIEW ALL` promoted to section header |
| `09-sheet-select-room.jpg` | Revised select-room sheet |
| `10-sheet-edit-device-users.jpg` | Revised edit-users sheet, roster normalised |

### Iteration pairs — wire these together

| # | Before | After |
|---|---|---|
| 1 | `v1/01-home.jpg` | `v2/01-home-selected-indicator.jpg` |
| 2 | `v1/11-home-settings-residents.jpg` | `v2/11-home-settings-kebab.jpg` |
| 3 | `v1/12-profile.jpg` | `v2/12-profile-viewall-and-avatar.jpg` |
| 4 | `v1/12-profile.jpg` | `v2/12-profile-viewall-and-avatar.jpg` |

Pairs 3 and 4 share both images — two changes landed on one screen. Caption them
separately rather than duplicating the image side by side.

**Anomaly, unresolved:** v1's smart light screen has a `MANAGE ACCESS` row that the v2
photo lacks, even though the report's list of post-test changes never mentions that
screen. Most likely a card that wasn't redrawn before reshooting. Treat v1 as canonical
and build no iteration story on it.

---

## `session/` — test session documentation (7 files)

Cited as Pictures 1–5 in the report. Shot over an open laptop; some motion blur; two
different people's hands, matching the two participants. **Evidential, not aesthetic —
do not crop to the paper edge, colour-correct, or drop them for looking unpolished.**

| File | Report caption |
|---|---|
| `participantA-flick-brightness-stepG.jpg` | Participant A flicking to adjust brightness on the device-control step |
| `participantB-toggle-room-stepA.jpg` | Participant B simulating a toggle to activate a room on the home step |
| `participant-cards-in-hand.jpg` | Interacting with the cards before sorting them |
| `participant-holding-prototype.jpg` | Holding the stack mid-session |
| `participant-holding-prototype-alt.jpg` | Alternate frame; not used in the report |
| `prototype-laid-out.jpg` | The prototype laid out — both participants had to do this to backtrack |
| `participantA-discussing-home-screen.jpg` | Participant A raising the unclear-home issue that became iteration 1 |

`TODO:` six photos map to five numbered captions in the report, so one is doubled or the
ordering is off by one. Sanaz to confirm which is Picture 3 (Participant B improvising
with the cards) and which is Picture 4 (Participant A sorting them into order).

---

## `storyboards/` — 2 files

| File | Panels |
|---|---|
| `storyboard-a-happy-path.png` | 6 — shared device assigns tasks → Michael shops the co-authored list → cashless payment → task completes → guided home |
| `storyboard-b-failure-path.png` | 10 — payment fails on a server error → frustration → a friend covers it → connectivity drops → GPS can't reroute around a road closure → phones the flat's staff, struggles to describe his location |

Present side by side. The panel-count difference is the argument: six for it working,
ten for it not.

---

## Provenance

Screens, flow map, facilitator script, bottom sheets and video: uploaded directly.
Session photos, storyboards, revised flow map and all four "after" screens: extracted
from the embedded media in the Assignment 4 report.

**Never commit the source `.docx` to the repo** — it carries three classmates' names and
matriculation numbers.
