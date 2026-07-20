# Simverse Phase I — Converter Design Tool

Lightweight, browser-only calculators for:

1. **Ideal CCM** DC–DC **Buck**, **Boost**, **Buck-Boost**, and **NIBB** converters (size L, C, R + Simulink pulse settings)
2. **Single-phase symmetrical semi-converter** (AC–DC, R / RL load) — Package A
3. **Single-phase fully controlled bridge** (4 SCR, R / RL CCM) — Package C
4. **Charging Circuit** — offline AC–DC chain: 230 V → XFMR → bridge → bulk C → buck → \(V_o\)

Built from the product PRD and Ferrari design system tokens (Inter as the open-source type substitute).

## Features

### Buck / Boost / Buck-Boost / NIBB

- Topology toggle: **Buck** / **Boost** / **Buck-Boost** / **NIBB** / **Semi** / **Full** / **Charging**
- Live recalculation as you type (no Calculate button)
- Inputs: \(V_{in}\), \(V_o\), \(P_o\), \(f_s\) (Hz or kHz), \(\Delta I_L\), \(\Delta V_o\)
- Core outputs: inductance, capacitance, load resistance
- Current specs: \(I_o\), \(I_{in}\), duty cycle
- Simulink panel: period (s), pulse width (%), amplitude = 1
- Validation: Buck requires \(V_o < V_{in}\); Boost requires \(V_o > V_{in}\); BB/NIBB allow step-up and step-down
- **Buck-Boost (D1):** inverting, 1 switch + 1 diode; enter \(|V_o|\)
- **NIBB (D2):** non-inverting — **two drive strategies** (toggle on the page):
  - **Multi-mode** (from \(V_{in}, V_o\)):
    - **Buck** (\(V_o < V_{in}\)): PWM S₁, S₂ **OFF**
    - **Boost** (\(V_o > V_{in}\)): S₁ **ON**, PWM S₂
    - **Buck-Boost** (\(V_o \approx V_{in}\)): both switches same PWM
  - **Both PWM:** always simultaneous S₁+S₂, \(V_o/V_{in}=D/(1-D)\), any step-up/down

### Single-phase semi-converter (Package A)

- Topology: **1-φ symmetrical** (2 SCR + 2 diode), one-quadrant
- Load types: **R** and **RL** (continuous conduction / large L)
- Inputs: \(V_s\) (RMS), \(f\), firing angle \(\alpha\), \(R\), \(L\) (RL only)
- Outputs: \(V_o\), \(V_{rms}\), \(V_m\), form factor, ripple factor
- Gate timing: AC period, \(T_1\) delay at \(\alpha\), \(T_2\) delay at \(\pi+\alpha\)
- Conduction modes table (active / freewheel / gate notes)
- Formula band updates for semi equations

### Single-phase full converter (Package C)

- Topology: **1-φ fully controlled bridge** (4 SCR), diagonal pairs \(T_1T_2\) / \(T_3T_4\)
- Load types: **R** and **RL** (continuous conduction)
- **R:** \(V_o = (V_m/\pi)(1+\cos\alpha)\) (same voltage law family as semi R)
- **RL CCM:** \(V_o = (2V_m/\pi)\cos\alpha\) — **negative** for \(\alpha > 90^\circ\) (inverter / 2-quadrant)
- Mode badge: Rectifier / Boundary / Inverter
- Gate timing: pair A at \(\alpha\), pair B at \(\pi+\alpha\)
- Conduction modes (including negative \(v_o\) lobe for RL)
- Live FF, RF

### Shared

- Engineering unit formatting (e.g. `16.9 mH`, `41 nF`)
- Fully client-side — no backend, no data leaves the browser

## Equations (ideal CCM) — Buck / Boost

**Common**

| Quantity | Formula |
|----------|---------|
| Output current | \(I_o = P_o / V_o\) |
| Input current | \(I_{in} = P_o / V_{in}\) |
| Load resistance | \(R = V_o^2 / P_o\) |

**Buck**

| Quantity | Formula |
|----------|---------|
| Duty cycle | \(D = V_o / V_{in}\) |
| Inductance | \(L = (V_{in} - V_o) \cdot D / (f_s \cdot \Delta I_L)\) |
| Capacitance | \(C = \Delta I_L / (8 \cdot f_s \cdot \Delta V_o)\) |

**Boost**

| Quantity | Formula |
|----------|---------|
| Duty cycle | \(D = 1 - V_{in} / V_o\) |
| Inductance | \(L = V_{in} \cdot D / (f_s \cdot \Delta I_L)\) |
| Capacitance | \(C = I_o \cdot D / (f_s \cdot \Delta V_o)\) |

**Buck-Boost (inverting)**

| Quantity | Formula |
|----------|---------|
| Duty cycle | \(D = V_o / (V_{in} + V_o)\) |
| Gain (magnitude) | \(V_o / V_{in} = D / (1-D)\) |
| Inductance | \(L = V_{in} \cdot D / (f_s \cdot \Delta I_L)\) |
| Capacitance | \(C = I_o \cdot D / (f_s \cdot \Delta V_o)\) |

**NIBB (non-inverting)**

*Strategy A — Multi-mode* (from \(V_o\) vs \(V_{in}\))

| Mode | Condition | Switches | Duty / sizing |
|------|-----------|----------|----------------|
| **Buck** | \(V_o < V_{in}\) | S₁ PWM, S₂ **OFF** | Buck: \(D=V_o/V_{in}\) |
| **Boost** | \(V_o > V_{in}\) | S₁ **ON**, S₂ PWM | Boost: \(D=1-V_{in}/V_o\) |
| **Buck-Boost** | \(V_o \approx V_{in}\) | S₁ & S₂ same PWM | \(D=V_o/(V_{in}+V_o)\) |

*Strategy B — Both PWM* (always)

| Quantity | Formula / drive |
|----------|-----------------|
| Switches | S₁ and S₂ **same PWM** every cycle |
| Duty | \(D = V_o/(V_{in}+V_o)\) |
| Gain | \(V_o/V_{in} = D/(1-D)\) |
| \(L\), \(C\) | \(L=V_{in}D/(f_s\Delta I_L)\), \(C=I_o D/(f_s\Delta V_o)\) |

**Simulink Pulse Generator**

| Setting | Value |
|---------|--------|
| Period (secs) | \(1 / f_s\) |
| Pulse Width (%) | \(D \times 100\) |
| Amplitude | `1` |

## Equations — Single-phase semi-converter

| Quantity | Formula |
|----------|---------|
| Peak supply | \(V_m = V_s \sqrt{2}\) |
| Average output | \(V_o = \dfrac{V_m}{\pi}(1 + \cos\alpha)\) |
| RMS output | \(V_{rms} = \dfrac{V_m}{\sqrt{2}}\sqrt{\dfrac{1}{\pi}\left(\pi - \alpha + \dfrac{\sin 2\alpha}{2}\right)}\) |
| Form factor | \(FF = V_{rms}/V_o\) |
| Ripple factor | \(RF = \sqrt{FF^2 - 1}\) |

**Gate delays (from cycle start):** \(t_1 = (\alpha/360^\circ)/f\), \(t_2 = ((180^\circ+\alpha)/360^\circ)/f\)

## Equations — Single-phase full converter (Package C)

| Load | Average \(V_o\) | Notes |
|------|-----------------|--------|
| **R** | \(\dfrac{V_m}{\pi}(1+\cos\alpha)\) | Current zero at \(\pi\) |
| **RL CCM** | \(\dfrac{2V_m}{\pi}\cos\alpha\) | Can be negative (\(\alpha>90^\circ\)) |

| Quantity | Formula |
|----------|---------|
| Peak supply | \(V_m = V_s\sqrt{2}\) |
| RMS (R) | same as semi R-load \(V_{rms}\) |
| RMS (RL CCM) | \(V_{rms} = V_m/\sqrt{2}\) |
| Mode (RL) | \(\alpha<90^\circ\) rectifier · \(=90^\circ\) boundary · \(>90^\circ\) inverter |

**Gates:** \(t(T_1T_2)=(\alpha/360^\circ)/f\), \(t(T_3T_4)=((180^\circ+\alpha)/360^\circ)/f\)

### Charging Circuit

Offline educational PSU / charger chain (ideal, 50 Hz, single-phase):

**230 V AC → step-down transformer → diode bridge → bulk capacitor → CCM buck → regulated DC**

| Inputs | Outputs |
|--------|---------|
| \(V_o\), \(I_o\) | Secondary \(V_s\) RMS, turns ratio \(230:V_s\) |
| DC bus **or** secondary AC | \(V_{bus}\) no-load & under load, \(C_{bulk}\) |
| \(f_{sw}\), \(\Delta I_L\%\), \(\Delta V_o\%\) | Buck \(D\), \(L\), \(C\), load \(R\) |
| Bulk ripple % (optional, default 10%) | \(I_{bus}\), \(P_o\), Simulink period / PW% / amp |

Key formulas: \(V_s = V_{bus}/\sqrt{2}\), \(C_{bulk} = I_{bus}/(2 f_{line}\Delta V)\), buck \(D = V_o/V_{bus}\).

## Local preview

No build step. Open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8080

# Node (if you have npx)
npx serve .
```

Then visit `http://localhost:8080`.

## Deploy to Netlify

### Option A — Drag & drop

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the project folder (or zip of `index.html`, `styles.css`, `app.js`, `netlify.toml`)
3. Netlify gives you a live URL

### Option B — Git

1. Push this repo to GitHub / GitLab / Bitbucket
2. In Netlify: **Add new site → Import an existing project**
3. Build settings:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.` (site root)
4. Deploy

`netlify.toml` already sets `publish = "."` and basic security headers.

### Option C — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=.
```

## Project structure

```
Simverse/
├── index.html      # UI shell (Buck / Boost / BB / NIBB / Semi / Full)
├── styles.css      # Ferrari design tokens + layout
├── app.js          # Math engines + live UI
├── netlify.toml    # Netlify publish + headers
├── README.md
└── Grok Build/
    ├── PRD - Power Electronics Converter Design Tool.md
    └── DESIGN-ferrari.md
```

## Tech stack

- Static **HTML / CSS / vanilla JS** (no framework, no bundler)
- **Inter** (Google Fonts) as FerrariSans substitute
- Hosting: **Netlify** static site

## License

For educational and preliminary design use. Ideal CCM only — always validate with full simulation and datasheets before hardware.
