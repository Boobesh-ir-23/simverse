/**
 * Simverse — Buck, Boost, BB, NIBB, SEPIC, Semi, Full & Charging Circuit
 * Ideal CCM equations, live updates, engineering unit formatting.
 */

(function () {
  "use strict";

  const TOPOLOGY = {
    BUCK: "buck",
    BOOST: "boost",
    BUCKBOOST: "buckboost",
    NIBB: "nibb",
    SEPIC: "sepic",
    SEMI: "semi",
    FULL: "full",
    CHARGE: "charge",
  };
  const LOAD = { R: "r", RL: "rl" };
  const LINE = { V_PRIMARY_RMS: 230, F_LINE: 50 };

  const els = {
    navTagline: document.getElementById("nav-tagline"),
    heroEyebrow: document.getElementById("hero-eyebrow"),
    heroLead: document.getElementById("hero-lead"),
    footerCopy: document.getElementById("footer-copy"),
    formulaHeading: document.getElementById("formula-heading"),
    formulaGrid: document.getElementById("formula-grid"),
    btnToggleFormulas: document.getElementById("btn-toggle-formulas"),

    btnBuck: document.getElementById("btn-buck"),
    btnBoost: document.getElementById("btn-boost"),
    btnBuckBoost: document.getElementById("btn-buckboost"),
    btnNibb: document.getElementById("btn-nibb"),
    btnSepic: document.getElementById("btn-sepic"),
    btnSemi: document.getElementById("btn-semi"),
    btnFull: document.getElementById("btn-full"),
    btnCharge: document.getElementById("btn-charge"),

    viewDcdc: document.getElementById("view-dcdc"),
    viewSemi: document.getElementById("view-semi"),
    viewFull: document.getElementById("view-full"),
    viewCharge: document.getElementById("view-charge"),

    /* DC–DC */
    form: document.getElementById("design-form"),
    vin: document.getElementById("vin"),
    vout: document.getElementById("vout"),
    pout: document.getElementById("pout"),
    fs: document.getElementById("fs"),
    fsUnit: document.getElementById("fs-unit"),
    dil: document.getElementById("dil"),
    dvo: document.getElementById("dvo"),
    badge: document.getElementById("topology-badge"),
    validation: document.getElementById("validation-msg"),
    dcdcHint: document.getElementById("dcdc-hint"),
    dcdcSimulinkNote: document.getElementById("dcdc-simulink-note"),
    dcdcSimulinkBadge: document.getElementById("dcdc-simulink-badge"),
    resultsDcdc: document.getElementById("results-dcdc"),
    outDLabel: document.getElementById("out-D-label"),
    outLLabel: document.getElementById("out-L-label"),
    outCLabel: document.getElementById("out-C-label"),
    sepicExtraPanel: document.getElementById("sepic-extra-panel"),
    nibbDriveWrap: document.getElementById("nibb-drive-wrap"),
    btnNibbMulti: document.getElementById("btn-nibb-multi"),
    btnNibbSimul: document.getElementById("btn-nibb-simul"),
    nibbModePanel: document.getElementById("nibb-mode-panel"),
    nibbModeBadge: document.getElementById("nibb-mode-badge"),
    nibbModeReason: document.getElementById("nibb-mode-reason"),
    nibbSwBuck: document.getElementById("nibb-sw-buck"),
    nibbSwBoost: document.getElementById("nibb-sw-boost"),
    nibbSwPwm: document.getElementById("nibb-sw-pwm"),
    nibbAltHint: document.getElementById("nibb-alt-hint"),
    out: {
      L: document.getElementById("out-L"),
      C: document.getElementById("out-C"),
      R: document.getElementById("out-R"),
      L2: document.getElementById("out-L2"),
      Cs: document.getElementById("out-Cs"),
      IL1: document.getElementById("out-IL1"),
      Io: document.getElementById("out-Io"),
      Iin: document.getElementById("out-Iin"),
      D: document.getElementById("out-D"),
      period: document.getElementById("out-period"),
      pw: document.getElementById("out-pw"),
      amp: document.getElementById("out-amp"),
    },

    /* Semi */
    semiForm: document.getElementById("semi-form"),
    btnLoadR: document.getElementById("btn-load-r"),
    btnLoadRl: document.getElementById("btn-load-rl"),
    fieldLoadL: document.getElementById("field-load-l"),
    vs: document.getElementById("vs"),
    fAc: document.getElementById("f-ac"),
    alpha: document.getElementById("alpha"),
    loadR: document.getElementById("load-r"),
    loadL: document.getElementById("load-l"),
    loadLUnit: document.getElementById("load-l-unit"),
    semiBadge: document.getElementById("semi-badge"),
    semiValidation: document.getElementById("semi-validation-msg"),
    semiHint: document.getElementById("semi-hint"),
    resultsSemi: document.getElementById("results-semi"),
    semiModeTable: document.getElementById("semi-mode-table"),
    semiOut: {
      Vo: document.getElementById("semi-out-Vo"),
      Vrms: document.getElementById("semi-out-Vrms"),
      Vm: document.getElementById("semi-out-Vm"),
      FF: document.getElementById("semi-out-FF"),
      RF: document.getElementById("semi-out-RF"),
      alpha: document.getElementById("semi-out-alpha"),
      Tac: document.getElementById("semi-out-Tac"),
      delayT1: document.getElementById("semi-out-delay-t1"),
      delayT2: document.getElementById("semi-out-delay-t2"),
    },

    /* Full (Package C) */
    fullForm: document.getElementById("full-form"),
    btnFullLoadR: document.getElementById("btn-full-load-r"),
    btnFullLoadRl: document.getElementById("btn-full-load-rl"),
    fieldFullLoadL: document.getElementById("field-full-load-l"),
    fullVs: document.getElementById("full-vs"),
    fullFAc: document.getElementById("full-f-ac"),
    fullAlpha: document.getElementById("full-alpha"),
    fullLoadR: document.getElementById("full-load-r"),
    fullLoadL: document.getElementById("full-load-l"),
    fullLoadLUnit: document.getElementById("full-load-l-unit"),
    fullBadge: document.getElementById("full-badge"),
    fullModeBadge: document.getElementById("full-mode-badge"),
    fullValidation: document.getElementById("full-validation-msg"),
    fullHint: document.getElementById("full-hint"),
    resultsFull: document.getElementById("results-full"),
    fullModeTable: document.getElementById("full-mode-table"),
    fullOut: {
      Vo: document.getElementById("full-out-Vo"),
      Vrms: document.getElementById("full-out-Vrms"),
      Vm: document.getElementById("full-out-Vm"),
      FF: document.getElementById("full-out-FF"),
      RF: document.getElementById("full-out-RF"),
      alpha: document.getElementById("full-out-alpha"),
      Tac: document.getElementById("full-out-Tac"),
      delayPairA: document.getElementById("full-out-delay-pair-a"),
      delayPairB: document.getElementById("full-out-delay-pair-b"),
    },

    /* Charging Circuit (beginner) */
    chargeForm: document.getElementById("charge-form"),
    chVs: document.getElementById("ch-vs"),
    chVo: document.getElementById("ch-vo"),
    chIo: document.getElementById("ch-io"),
    chVdiode: document.getElementById("ch-vdiode"),
    chFsw: document.getElementById("ch-fsw"),
    chDilPct: document.getElementById("ch-dil-pct"),
    chDvoPct: document.getElementById("ch-dvo-pct"),
    chargeBadge: document.getElementById("charge-badge"),
    chargeValidation: document.getElementById("charge-validation-msg"),
    chargeHint: document.getElementById("charge-hint"),
    resultsCharge: document.getElementById("results-charge"),
    chOut: {
      vsec: document.getElementById("ch-out-vsec"),
      ratio: document.getElementById("ch-out-ratio"),
      vprimary: document.getElementById("ch-out-vprimary"),
      vdcApprox: document.getElementById("ch-out-vdc-approx"),
      vdcNl: document.getElementById("ch-out-vdc-nl"),
      vinBuck: document.getElementById("ch-out-vin-buck"),
      D: document.getElementById("ch-out-D"),
      R: document.getElementById("ch-out-R"),
      dil: document.getElementById("ch-out-dil"),
      L: document.getElementById("ch-out-L"),
      C: document.getElementById("ch-out-C"),
      dvo: document.getElementById("ch-out-dvo"),
      freq: document.getElementById("ch-out-freq"),
      period: document.getElementById("ch-out-period"),
      pw: document.getElementById("ch-out-pw"),
      amp: document.getElementById("ch-out-amp"),
      Po: document.getElementById("ch-out-Po"),
      pwNote: document.getElementById("ch-out-pw-note"),
    },
  };

  const NIBB_DRIVE = { MULTI: "multi", SIMUL: "simul" };

  let topology = TOPOLOGY.BUCK;
  let semiLoadType = LOAD.R;
  let fullLoadType = LOAD.R;
  let nibbDrive = NIBB_DRIVE.MULTI;
  let formulasOpen = true;

  /* ——— Engineering unit formatting ——— */

  function formatEngineering(value, baseUnit, opts) {
    if (!Number.isFinite(value)) return "—";
    if (value === 0) return `0 ${baseUnit}`;

    const digits = (opts && opts.digits) || 3;
    const abs = Math.abs(value);
    const prefixes = [
      { p: 1e12, s: "T" },
      { p: 1e9, s: "G" },
      { p: 1e6, s: "M" },
      { p: 1e3, s: "k" },
      { p: 1, s: "" },
      { p: 1e-3, s: "m" },
      { p: 1e-6, s: "µ" },
      { p: 1e-9, s: "n" },
      { p: 1e-12, s: "p" },
      { p: 1e-15, s: "f" },
    ];

    let chosen = prefixes[prefixes.length - 1];
    for (let i = 0; i < prefixes.length; i++) {
      if (abs >= prefixes[i].p) {
        chosen = prefixes[i];
        break;
      }
    }

    const scaled = value / chosen.p;
    const formatted = Number(scaled.toPrecision(digits));
    return `${trimTrailingZeros(formatted)} ${chosen.s}${baseUnit}`;
  }

  function trimTrailingZeros(n) {
    if (!Number.isFinite(n)) return String(n);
    if (Math.abs(n) >= 1e6 || (Math.abs(n) < 1e-4 && n !== 0)) {
      return n.toPrecision(3).replace(/\.?0+e/, "e");
    }
    const s = String(n);
    if (!s.includes(".")) return s;
    return s.replace(/\.?0+$/, "");
  }

  function formatPercent(fraction, digits) {
    if (!Number.isFinite(fraction)) return "—";
    const pct = fraction * 100;
    return `${trimTrailingZeros(Number(pct.toPrecision(digits || 4)))} %`;
  }

  function formatPlain(value, unit, digits) {
    if (!Number.isFinite(value)) return "—";
    const d = digits || 4;
    return `${trimTrailingZeros(Number(value.toPrecision(d)))}${unit ? " " + unit : ""}`;
  }

  function setText(el, text) {
    if (el) el.textContent = text;
  }

  function formFactor(Vrms, Vo) {
    if (!Number.isFinite(Vrms) || !Number.isFinite(Vo) || Math.abs(Vo) < 1e-12) {
      return NaN;
    }
    return Vrms / Math.abs(Vo);
  }

  function rippleFactor(FF) {
    if (!Number.isFinite(FF)) return NaN;
    return Math.sqrt(Math.max(0, FF * FF - 1));
  }

  /* ——— DC–DC math ——— */

  function readDcdcInputs() {
    const vin = parseFloat(els.vin.value);
    const vout = parseFloat(els.vout.value);
    const pout = parseFloat(els.pout.value);
    let fs = parseFloat(els.fs.value);
    const dil = parseFloat(els.dil.value);
    const dvo = parseFloat(els.dvo.value);

    if (els.fsUnit.value === "khz" && Number.isFinite(fs)) {
      fs = fs * 1000;
    }

    return { vin, vout, pout, fs, dil, dvo };
  }

  function validateDcdc(inputs) {
    const { vin, vout, pout, fs, dil, dvo } = inputs;
    const positives = [
      ["V<sub>in</sub>", vin],
      ["V<sub>o</sub>", vout],
      ["P<sub>o</sub>", pout],
      ["f<sub>s</sub>", fs],
      ["ΔI<sub>L</sub>", dil],
      ["ΔV<sub>o</sub>", dvo],
    ];

    for (const [name, val] of positives) {
      if (!Number.isFinite(val) || val <= 0) {
        return { ok: false, message: `Enter a positive value for ${name}.` };
      }
    }

    if (topology === TOPOLOGY.BUCK && !(vout < vin)) {
      return {
        ok: false,
        message:
          "Buck converter requires V<sub>o</sub> &lt; V<sub>in</sub>. Raise input voltage or lower output voltage.",
      };
    }

    if (topology === TOPOLOGY.BOOST && !(vout > vin)) {
      return {
        ok: false,
        message:
          "Boost converter requires V<sub>o</sub> &gt; V<sub>in</sub>. Lower input voltage or raise output voltage.",
      };
    }

    // Buck-Boost / NIBB / SEPIC: both step-up and step-down allowed

    return { ok: true };
  }

  function isBbFamily() {
    return (
      topology === TOPOLOGY.BUCKBOOST ||
      topology === TOPOLOGY.NIBB ||
      topology === TOPOLOGY.SEPIC
    );
  }

  /**
   * Multi-mode NIBB (voltage-scheduled):
   *   Vo < Vin  → Buck:  PWM S1, S2 OFF
   *   Vo > Vin  → Boost: S1 ON, PWM S2
   *   Vo = Vin  → Buck-Boost: both PWM
   *
   * Simultaneous NIBB (Keysan basic / always both PWM):
   *   always both switches same D, gain Vo/Vin = D/(1-D)
   */
  function detectNibbMultiMode(vin, vout) {
    const eps = Math.max(1e-9, Math.abs(vin) * 1e-9);
    if (vout < vin - eps) {
      return {
        id: "buck",
        label: "Buck mode",
        reason:
          "<strong>Multi-mode:</strong> V<sub>o</sub> &lt; V<sub>in</sub> → pure buck drive. PWM buck switch S<sub>1</sub>; keep boost switch S<sub>2</sub> permanently OFF.",
        swBuck: "PWM @ D",
        swBoost: "OFF",
        pwmDevice: "Buck S₁",
        dLabel: "Duty Cycle D (buck S₁)",
        altHint:
          "Also available: switch NIBB drive to “Both PWM” for simultaneous S₁+S₂ with D = Vₒ/(Vᵢₙ+Vₒ).",
      };
    }
    if (vout > vin + eps) {
      return {
        id: "boost",
        label: "Boost mode",
        reason:
          "<strong>Multi-mode:</strong> V<sub>o</sub> &gt; V<sub>in</sub> → pure boost drive. Hold buck switch S<sub>1</sub> ON; PWM boost switch S<sub>2</sub>.",
        swBuck: "ON (100%)",
        swBoost: "PWM @ D",
        pwmDevice: "Boost S₂",
        dLabel: "Duty Cycle D (boost S₂)",
        altHint:
          "Also available: switch NIBB drive to “Both PWM” for simultaneous S₁+S₂ with D = Vₒ/(Vᵢₙ+Vₒ).",
      };
    }
    return {
      id: "buckboost",
      label: "Buck-Boost mode",
      reason:
        "<strong>Multi-mode:</strong> V<sub>o</sub> ≈ V<sub>in</sub> → simultaneous buck-boost. Drive both S<sub>1</sub> and S<sub>2</sub> with the same PWM duty D.",
      swBuck: "PWM @ D",
      swBoost: "PWM @ D",
      pwmDevice: "S₁ + S₂",
      dLabel: "Duty Cycle D (both)",
      altHint:
        "Same gate pattern as “Both PWM”. Multi-mode only forces this when Vₒ ≈ Vᵢₙ; Both PWM uses it for any Vₒ/Vᵢₙ.",
    };
  }

  function simultaneousNibbMode(vin, vout) {
    const ratio = vout / vin;
    let rangeNote = "step-down or step-up";
    if (ratio < 1 - 1e-9) rangeNote = "step-down (Vₒ &lt; Vᵢₙ)";
    else if (ratio > 1 + 1e-9) rangeNote = "step-up (Vₒ &gt; Vᵢₙ)";
    else rangeNote = "unity gain (Vₒ ≈ Vᵢₙ)";

    return {
      id: "simultaneous",
      label: "Both PWM",
      reason:
        "<strong>Simultaneous PWM:</strong> both switches turn ON/OFF together every cycle. Ideal gain V<sub>o</sub>/V<sub>in</sub> = D/(1−D). Works for " +
        rangeNote +
        ". Same D to S<sub>1</sub> and S<sub>2</sub>.",
      swBuck: "PWM @ D",
      swBoost: "PWM @ D",
      pwmDevice: "S₁ + S₂",
      dLabel: "Duty Cycle D (both)",
      altHint:
        "Also available: “Multi-mode” for lower stress — S₂ OFF when bucking, S₁ ON when boosting.",
    };
  }

  function resolveNibbMode(vin, vout) {
    if (nibbDrive === NIBB_DRIVE.SIMUL) {
      return simultaneousNibbMode(vin, vout);
    }
    return detectNibbMultiMode(vin, vout);
  }

  function calculateDcdc(inputs) {
    const { vin, vout, pout, fs, dil, dvo } = inputs;

    const Io = pout / vout;
    const Iin = pout / vin;
    const R = (vout * vout) / pout;

    let D;
    let L;
    let C;
    let nibbMode = null;

    let L2 = null;
    let Cs = null;
    let IL1 = null;
    let IL2 = null;

    if (topology === TOPOLOGY.BUCK) {
      D = vout / vin;
      L = ((vin - vout) * D) / (fs * dil);
      C = dil / (8 * fs * dvo);
    } else if (topology === TOPOLOGY.BOOST) {
      D = 1 - vin / vout;
      L = (vin * D) / (fs * dil);
      C = (Io * D) / (fs * dvo);
    } else if (topology === TOPOLOGY.BUCKBOOST) {
      // Classic inverting buck-boost (single switch)
      D = vout / (vin + vout);
      L = (vin * D) / (fs * dil);
      C = (Io * D) / (fs * dvo);
    } else if (topology === TOPOLOGY.NIBB) {
      nibbMode = resolveNibbMode(vin, vout);

      if (nibbMode.id === "buck") {
        D = vout / vin;
        L = ((vin - vout) * D) / (fs * dil);
        C = dil / (8 * fs * dvo);
      } else if (nibbMode.id === "boost") {
        D = 1 - vin / vout;
        L = (vin * D) / (fs * dil);
        C = (Io * D) / (fs * dvo);
      } else {
        // simultaneous (always) or multi-mode at Vo ≈ Vin
        D = vout / (vin + vout);
        L = (vin * D) / (fs * dil);
        C = (Io * D) / (fs * dvo);
      }
    } else if (topology === TOPOLOGY.SEPIC) {
      // Ideal CCM SEPIC (non-inverting step-up/down)
      // Vo/Vin = D/(1−D)  →  D = Vo/(Vin+Vo)
      D = vout / (vin + vout);
      // L1 = L2 when same ΔI_L (beginner / common design choice)
      L = (vin * D) / (fs * dil);
      L2 = L;
      // Output capacitor Co (same form as boost / buck-boost)
      C = (Io * D) / (fs * dvo);
      // Coupling capacitor Cs — same ΔV_o allowance for beginner sizing
      Cs = (Io * D) / (fs * dvo);
      IL1 = Iin;
      IL2 = Io;
    } else {
      D = NaN;
      L = NaN;
      C = NaN;
    }

    return {
      Io,
      Iin,
      R,
      D,
      L,
      L2,
      C,
      Cs,
      IL1,
      IL2,
      period: 1 / fs,
      pulseWidthPct: D * 100,
      amplitude: 1,
      nibbMode,
    };
  }

  function clearDcdcResults() {
    setText(els.out.L, "—");
    setText(els.out.C, "—");
    setText(els.out.R, "—");
    setText(els.out.Io, "—");
    setText(els.out.Iin, "—");
    setText(els.out.D, "—");
    setText(els.out.period, "—");
    setText(els.out.pw, "—");
    setText(els.out.amp, "1");
    if (els.out.L2) setText(els.out.L2, "—");
    if (els.out.Cs) setText(els.out.Cs, "—");
    if (els.out.IL1) setText(els.out.IL1, "—");
    if (els.nibbModeBadge) setText(els.nibbModeBadge, "—");
    if (els.nibbModeReason) els.nibbModeReason.innerHTML = "—";
    if (els.nibbSwBuck) setText(els.nibbSwBuck, "—");
    if (els.nibbSwBoost) setText(els.nibbSwBoost, "—");
    if (els.nibbSwPwm) setText(els.nibbSwPwm, "—");
    if (els.nibbAltHint) els.nibbAltHint.innerHTML = "";
  }

  function setDcdcComponentLabels(isSepic) {
    if (els.outLLabel) {
      els.outLLabel.innerHTML = isSepic
        ? "Inductance L<sub>1</sub>"
        : "Inductance L";
    }
    if (els.outCLabel) {
      els.outCLabel.innerHTML = isSepic
        ? "Output Cap C<sub>o</sub>"
        : "Capacitance C";
    }
  }

  function renderNibbMode(mode) {
    if (!els.nibbModePanel) return;
    if (!mode || topology !== TOPOLOGY.NIBB) {
      els.nibbModePanel.hidden = true;
      return;
    }
    els.nibbModePanel.hidden = false;
    setText(els.nibbModeBadge, mode.label);
    if (els.nibbModeReason) els.nibbModeReason.innerHTML = mode.reason;
    setText(els.nibbSwBuck, mode.swBuck);
    setText(els.nibbSwBoost, mode.swBoost);
    setText(els.nibbSwPwm, mode.pwmDevice);
    if (els.nibbAltHint) {
      els.nibbAltHint.innerHTML = mode.altHint || "";
    }
  }

  function renderDcdcResults(r) {
    setText(els.out.L, formatEngineering(r.L, "H"));
    setText(els.out.C, formatEngineering(r.C, "F"));
    setText(els.out.R, formatEngineering(r.R, "Ω"));
    setText(els.out.Io, formatEngineering(r.Io, "A"));
    setText(els.out.Iin, formatEngineering(r.Iin, "A"));
    setText(els.out.D, formatPercent(r.D));
    setText(els.out.period, formatEngineering(r.period, "s"));
    setText(
      els.out.pw,
      `${trimTrailingZeros(Number(r.pulseWidthPct.toPrecision(4)))} %`
    );
    setText(els.out.amp, "1");

    const isSepic = topology === TOPOLOGY.SEPIC;
    setDcdcComponentLabels(isSepic);
    if (els.sepicExtraPanel) els.sepicExtraPanel.hidden = !isSepic;
    if (isSepic) {
      if (els.out.L2)
        setText(els.out.L2, formatEngineering(r.L2 != null ? r.L2 : r.L, "H"));
      if (els.out.Cs)
        setText(els.out.Cs, formatEngineering(r.Cs, "F"));
      if (els.out.IL1)
        setText(els.out.IL1, formatEngineering(r.IL1 != null ? r.IL1 : r.Iin, "A"));
    } else {
      if (els.out.L2) setText(els.out.L2, "—");
      if (els.out.Cs) setText(els.out.Cs, "—");
      if (els.out.IL1) setText(els.out.IL1, "—");
    }

    if (els.outDLabel) {
      els.outDLabel.textContent =
        r.nibbMode && r.nibbMode.dLabel ? r.nibbMode.dLabel : "Duty Cycle D";
    }

    renderNibbMode(r.nibbMode || null);

    if (topology === TOPOLOGY.NIBB && r.nibbMode) {
      updateNibbSimulinkNote(r.nibbMode);
      if (els.badge) {
        const driveTag =
          nibbDrive === NIBB_DRIVE.SIMUL ? "Both PWM" : r.nibbMode.label;
        els.badge.textContent = driveTag;
      }
    }
  }

  function updateNibbSimulinkNote(mode) {
    if (!els.dcdcSimulinkNote) return;
    if (mode.id === "buck") {
      els.dcdcSimulinkNote.innerHTML =
        "<strong>S₁ PWM</strong> · S₂ OFF (gate = 0)";
      if (els.dcdcSimulinkBadge) els.dcdcSimulinkBadge.textContent = "S₁ PWM";
    } else if (mode.id === "boost") {
      els.dcdcSimulinkNote.innerHTML =
        "<strong>S₁ ON</strong> · S₂ PWM only";
      if (els.dcdcSimulinkBadge) els.dcdcSimulinkBadge.textContent = "S₂ PWM";
    } else {
      els.dcdcSimulinkNote.innerHTML =
        "<strong>S₁ + S₂</strong> same PWM · D/(1−D)";
      if (els.dcdcSimulinkBadge) els.dcdcSimulinkBadge.textContent = "S₁+S₂ PWM";
    }
  }

  function setNibbDrive(next) {
    nibbDrive = next;
    const isMulti = next === NIBB_DRIVE.MULTI;
    if (els.btnNibbMulti) {
      els.btnNibbMulti.classList.toggle("is-active", isMulti);
      els.btnNibbMulti.setAttribute("aria-pressed", String(isMulti));
    }
    if (els.btnNibbSimul) {
      els.btnNibbSimul.classList.toggle("is-active", !isMulti);
      els.btnNibbSimul.setAttribute("aria-pressed", String(!isMulti));
    }
    if (topology === TOPOLOGY.NIBB) {
      updateFormulas();
      recomputeDcdc();
    }
  }

  function showDcdcValidation(message) {
    els.validation.innerHTML = message;
    els.validation.hidden = false;
    els.resultsDcdc.classList.add("is-error");
  }

  function hideDcdcValidation() {
    els.validation.hidden = true;
    els.validation.textContent = "";
    els.resultsDcdc.classList.remove("is-error");
  }

  function markVoltageFields(invalid) {
    const vinCtrl = els.vin.closest(".field-control");
    const voutCtrl = els.vout.closest(".field-control");
    if (vinCtrl) vinCtrl.classList.toggle("is-invalid", invalid);
    if (voutCtrl) voutCtrl.classList.toggle("is-invalid", invalid);
  }

  function recomputeDcdc() {
    try {
      if (!els.vin || !els.vout) return;
      const inputs = readDcdcInputs();
      const check = validateDcdc(inputs);

      if (!check.ok) {
        showDcdcValidation(check.message);
        clearDcdcResults();
        markVoltageFields(
          /V<sub>o<\/sub>|V<sub>in<\/sub>|Buck|Boost/.test(check.message)
        );
        if (topology === TOPOLOGY.NIBB && els.nibbModePanel) {
          els.nibbModePanel.hidden = false;
        }
        return;
      }

      hideDcdcValidation();
      markVoltageFields(false);
      const result = calculateDcdc(inputs);
      renderDcdcResults(result);
      if (topology === TOPOLOGY.NIBB) updateFormulas();
    } catch (err) {
      console.error("recomputeDcdc failed:", err);
    }
  }

  /* ——— Shared AC rectifier helpers ——— */

  function parseInductance(value, unit) {
    let L = parseFloat(value);
    if (!Number.isFinite(L)) return L;
    if (unit === "mh") L *= 1e-3;
    else if (unit === "uh") L *= 1e-6;
    return L;
  }

  function validateAcInputs(inputs, loadType, needsL) {
    const { vs, f, alphaDeg, R, L } = inputs;

    if (!Number.isFinite(vs) || vs <= 0) {
      return { ok: false, message: "Enter a positive supply voltage V<sub>s</sub>." };
    }
    if (!Number.isFinite(f) || f <= 0) {
      return { ok: false, message: "Enter a positive supply frequency f." };
    }
    if (!Number.isFinite(alphaDeg) || alphaDeg < 0 || alphaDeg >= 180) {
      return {
        ok: false,
        message: "Firing angle α must be in the range 0° ≤ α &lt; 180°.",
      };
    }
    if (!Number.isFinite(R) || R <= 0) {
      return { ok: false, message: "Enter a positive load resistance R." };
    }
    if (needsL && loadType === LOAD.RL && (!Number.isFinite(L) || L <= 0)) {
      return {
        ok: false,
        message: "Enter a positive load inductance L for RL continuous conduction.",
      };
    }

    return { ok: true };
  }

  function gateDelays(alphaDeg, f) {
    const Tac = 1 / f;
    return {
      Tac,
      delayA: (alphaDeg / 360) * Tac,
      delayB: ((180 + alphaDeg) / 360) * Tac,
    };
  }

  function modeTableHtml(rows) {
    return `
      <div class="mode-row mode-row-head" role="row">
        <span role="columnheader">Interval</span>
        <span role="columnheader">Angle</span>
        <span role="columnheader">Output</span>
        <span role="columnheader">Path / note</span>
      </div>
      ${rows
        .map(
          (row) => `
        <div class="mode-row" role="row">
          <span role="cell">${row.interval}</span>
          <span role="cell">${row.degrees}</span>
          <span role="cell">${row.vo}</span>
          <span role="cell">${row.path}</span>
        </div>`
        )
        .join("")}
    `;
  }

  /* ——— Semi-converter math (Package A) ——— */

  function readSemiInputs() {
    return {
      vs: parseFloat(els.vs.value),
      f: parseFloat(els.fAc.value),
      alphaDeg: parseFloat(els.alpha.value),
      R: parseFloat(els.loadR.value),
      L: parseInductance(els.loadL.value, els.loadLUnit.value),
    };
  }

  /**
   * Ideal single-phase symmetrical semi-converter.
   * Vo = (Vm/π)(1 + cos α) for R and RL CCM (freewheel keeps vo ≥ 0).
   */
  function calculateSemi(inputs) {
    const { vs, f, alphaDeg, R } = inputs;
    const Vm = vs * Math.SQRT2;
    const alpha = (alphaDeg * Math.PI) / 180;

    const Vo = (Vm / Math.PI) * (1 + Math.cos(alpha));
    const rmsArg = (1 / Math.PI) * (Math.PI - alpha + 0.5 * Math.sin(2 * alpha));
    const Vrms = (Vm / Math.SQRT2) * Math.sqrt(Math.max(0, rmsArg));

    const FF = formFactor(Vrms, Vo);
    const RF = rippleFactor(FF);
    const gates = gateDelays(alphaDeg, f);

    return {
      Vm,
      Vo,
      Vrms,
      FF,
      RF,
      alpha,
      alphaDeg,
      Tac: gates.Tac,
      delayT1: gates.delayA,
      delayT2: gates.delayB,
    };
  }

  function clearSemiResults() {
    Object.keys(els.semiOut).forEach((k) => setText(els.semiOut[k], "—"));
    els.semiModeTable.innerHTML = "";
  }

  function renderSemiModes(r) {
    const isRl = semiLoadType === LOAD.RL;
    const rows = [
      {
        interval: `α → π`,
        degrees: `${formatPlain(r.alphaDeg, "°", 4)} → 180°`,
        vo: "v<sub>o</sub> = +v<sub>s</sub>",
        path: "T<sub>1</sub>–D<sub>1</sub> (pos.) / T<sub>2</sub>–D<sub>2</sub> (neg.)",
      },
      {
        interval: `π → π+α`,
        degrees: `180° → ${formatPlain(180 + r.alphaDeg, "°", 4)}`,
        vo: "v<sub>o</sub> = 0",
        path: isRl ? "Freewheel (inductor discharge)" : "No conduction (R load)",
      },
      {
        interval: "Gate T<sub>1</sub>",
        degrees: `α = ${formatPlain(r.alphaDeg, "°", 4)}`,
        vo: "—",
        path: `Delay ${formatEngineering(r.delayT1, "s")}`,
      },
      {
        interval: "Gate T<sub>2</sub>",
        degrees: `π+α = ${formatPlain(180 + r.alphaDeg, "°", 4)}`,
        vo: "—",
        path: `Delay ${formatEngineering(r.delayT2, "s")}`,
      },
    ];
    els.semiModeTable.innerHTML = modeTableHtml(rows);
  }

  function renderSemiResults(r) {
    setText(els.semiOut.Vo, formatEngineering(r.Vo, "V"));
    setText(els.semiOut.Vrms, formatEngineering(r.Vrms, "V"));
    setText(els.semiOut.Vm, formatEngineering(r.Vm, "V"));
    setText(els.semiOut.FF, formatPlain(r.FF, "", 4));
    setText(els.semiOut.RF, formatPlain(r.RF, "", 4));
    setText(els.semiOut.alpha, formatPlain(r.alpha, "rad", 4));
    setText(els.semiOut.Tac, formatEngineering(r.Tac, "s"));
    setText(els.semiOut.delayT1, formatEngineering(r.delayT1, "s"));
    setText(els.semiOut.delayT2, formatEngineering(r.delayT2, "s"));
    renderSemiModes(r);
  }

  function showSemiValidation(message) {
    els.semiValidation.innerHTML = message;
    els.semiValidation.hidden = false;
    els.resultsSemi.classList.add("is-error");
  }

  function hideSemiValidation() {
    els.semiValidation.hidden = true;
    els.semiValidation.textContent = "";
    els.resultsSemi.classList.remove("is-error");
  }

  function recomputeSemi() {
    const inputs = readSemiInputs();
    const check = validateAcInputs(inputs, semiLoadType, true);

    if (!check.ok) {
      showSemiValidation(check.message);
      clearSemiResults();
      return;
    }

    hideSemiValidation();
    renderSemiResults(calculateSemi(inputs));
  }

  /* ——— Full converter math (Package C) ——— */

  function readFullInputs() {
    return {
      vs: parseFloat(els.fullVs.value),
      f: parseFloat(els.fullFAc.value),
      alphaDeg: parseFloat(els.fullAlpha.value),
      R: parseFloat(els.fullLoadR.value),
      L: parseInductance(els.fullLoadL.value, els.fullLoadLUnit.value),
    };
  }

  /**
   * Ideal 1-φ fully controlled bridge (4 SCR).
   * R load:     Vo = (Vm/π)(1 + cos α), Vrms same as semi R
   * RL CCM:     Vo = (2 Vm/π) cos α  (can be negative for α > 90°)
   *             Vrms = Vm/√2 (conduction over full π window each half-cycle)
   */
  function calculateFull(inputs) {
    const { vs, f, alphaDeg, R } = inputs;
    const Vm = vs * Math.SQRT2;
    const alpha = (alphaDeg * Math.PI) / 180;
    const isRl = fullLoadType === LOAD.RL;

    let Vo;
    let Vrms;

    if (isRl) {
      Vo = ((2 * Vm) / Math.PI) * Math.cos(alpha);
      Vrms = Vm / Math.SQRT2;
    } else {
      Vo = (Vm / Math.PI) * (1 + Math.cos(alpha));
      const rmsArg =
        (1 / Math.PI) * (Math.PI - alpha + 0.5 * Math.sin(2 * alpha));
      Vrms = (Vm / Math.SQRT2) * Math.sqrt(Math.max(0, rmsArg));
    }

    const FF = formFactor(Vrms, Vo);
    const RF = rippleFactor(FF);
    const gates = gateDelays(alphaDeg, f);

    let modeLabel = "Rectifier";
    if (isRl) {
      if (alphaDeg > 90 + 1e-9) modeLabel = "Inverter";
      else if (Math.abs(alphaDeg - 90) < 1e-6) modeLabel = "Boundary";
      else modeLabel = "Rectifier";
    }

    return {
      Vm,
      Vo,
      Vrms,
      FF,
      RF,
      alpha,
      alphaDeg,
      Tac: gates.Tac,
      delayPairA: gates.delayA,
      delayPairB: gates.delayB,
      modeLabel,
      isRl,
    };
  }

  function clearFullResults() {
    Object.keys(els.fullOut).forEach((k) => setText(els.fullOut[k], "—"));
    els.fullModeTable.innerHTML = "";
    if (els.fullModeBadge) els.fullModeBadge.textContent = "—";
  }

  function renderFullModes(r) {
    const rows = [];

    if (r.isRl) {
      rows.push({
        interval: `α → π`,
        degrees: `${formatPlain(r.alphaDeg, "°", 4)} → 180°`,
        vo: "v<sub>o</sub> = +v<sub>s</sub>",
        path: "T<sub>1</sub>–T<sub>2</sub> (pos. half)",
      });
      rows.push({
        interval: `π → π+α`,
        degrees: `180° → ${formatPlain(180 + r.alphaDeg, "°", 4)}`,
        vo: "v<sub>o</sub> = −v<sub>s</sub> (negative lobe)",
        path: "Same pair still on (L holds i<sub>o</sub>)",
      });
      rows.push({
        interval: `π+α → 2π+α`,
        degrees: `Alternate half-cycle`,
        vo: "mirror of above",
        path: "T<sub>3</sub>–T<sub>4</sub> diagonal pair",
      });
    } else {
      rows.push({
        interval: `α → π`,
        degrees: `${formatPlain(r.alphaDeg, "°", 4)} → 180°`,
        vo: "v<sub>o</sub> = +|v<sub>s</sub>|",
        path: "T<sub>1</sub>–T<sub>2</sub> then T<sub>3</sub>–T<sub>4</sub>",
      });
      rows.push({
        interval: `π → π+α`,
        degrees: `180° → ${formatPlain(180 + r.alphaDeg, "°", 4)}`,
        vo: "v<sub>o</sub> = 0",
        path: "Current zero — natural commutation (R)",
      });
    }

    rows.push({
      interval: "Gate T<sub>1</sub>·T<sub>2</sub>",
      degrees: `α = ${formatPlain(r.alphaDeg, "°", 4)}`,
      vo: "—",
      path: `Delay ${formatEngineering(r.delayPairA, "s")}`,
    });
    rows.push({
      interval: "Gate T<sub>3</sub>·T<sub>4</sub>",
      degrees: `π+α = ${formatPlain(180 + r.alphaDeg, "°", 4)}`,
      vo: "—",
      path: `Delay ${formatEngineering(r.delayPairB, "s")}`,
    });

    els.fullModeTable.innerHTML = modeTableHtml(rows);
  }

  function renderFullResults(r) {
    setText(els.fullOut.Vo, formatEngineering(r.Vo, "V"));
    setText(els.fullOut.Vrms, formatEngineering(r.Vrms, "V"));
    setText(els.fullOut.Vm, formatEngineering(r.Vm, "V"));
    setText(els.fullOut.FF, formatPlain(r.FF, "", 4));
    setText(els.fullOut.RF, formatPlain(r.RF, "", 4));
    setText(els.fullOut.alpha, formatPlain(r.alpha, "rad", 4));
    setText(els.fullOut.Tac, formatEngineering(r.Tac, "s"));
    setText(els.fullOut.delayPairA, formatEngineering(r.delayPairA, "s"));
    setText(els.fullOut.delayPairB, formatEngineering(r.delayPairB, "s"));
    if (els.fullModeBadge) els.fullModeBadge.textContent = r.modeLabel;
    renderFullModes(r);
  }

  function showFullValidation(message) {
    els.fullValidation.innerHTML = message;
    els.fullValidation.hidden = false;
    els.resultsFull.classList.add("is-error");
  }

  function hideFullValidation() {
    els.fullValidation.hidden = true;
    els.fullValidation.textContent = "";
    els.resultsFull.classList.remove("is-error");
  }

  function recomputeFull() {
    const inputs = readFullInputs();
    const check = validateAcInputs(inputs, fullLoadType, true);

    if (!check.ok) {
      showFullValidation(check.message);
      clearFullResults();
      return;
    }

    hideFullValidation();
    renderFullResults(calculateFull(inputs));
  }

  /* ——— Charging Circuit (beginner: transformer + rectifier + buck) ——— */

  function readChargeInputs() {
    const Vs = parseFloat(els.chVs && els.chVs.value);
    const Vo = parseFloat(els.chVo && els.chVo.value);
    const Io = parseFloat(els.chIo && els.chIo.value);
    let fsw = parseFloat(els.chFsw && els.chFsw.value);
    if (Number.isFinite(fsw)) fsw = fsw * 1000; // kHz → Hz
    const dilPct = parseFloat(els.chDilPct && els.chDilPct.value);
    const dvoPct = parseFloat(els.chDvoPct && els.chDvoPct.value);
    let Vdiode = parseFloat(els.chVdiode && els.chVdiode.value);
    if (!Number.isFinite(Vdiode) || Vdiode < 0) Vdiode = 0;

    return { Vs, Vo, Io, fsw, dilPct, dvoPct, Vdiode };
  }

  function validateCharge(inputs) {
    const { Vs, Vo, Io, fsw, dilPct, dvoPct, Vdiode } = inputs;
    const checks = [
      ["V<sub>s</sub> (secondary)", Vs],
      ["V<sub>out</sub>", Vo],
      ["I<sub>out</sub>", Io],
      ["f (switching)", fsw],
      ["ΔI %", dilPct],
      ["ΔV %", dvoPct],
    ];

    for (const [name, val] of checks) {
      if (!Number.isFinite(val) || val <= 0) {
        return { ok: false, message: `Enter a positive value for ${name}.` };
      }
    }

    if (!Number.isFinite(Vdiode) || Vdiode < 0) {
      return { ok: false, message: "Enter a non-negative V<sub>diode</sub> (use 0 to ignore)." };
    }

    // Beginner DC after rectifier + cap
    const VdcApprox = Vs * Math.SQRT2;
    const Vin = VdcApprox - 2 * Vdiode;

    if (!(Vin > 0)) {
      return {
        ok: false,
        message:
          "DC bus is not positive. Raise V<sub>s</sub> or lower V<sub>diode</sub>.",
      };
    }

    if (!(Vo < Vin)) {
      return {
        ok: false,
        message:
          "Buck needs V<sub>out</sub> &lt; V<sub>in</sub> (DC bus). Raise V<sub>s</sub> or lower V<sub>out</sub>.",
      };
    }

    if (dilPct > 100 || dvoPct > 50) {
      return {
        ok: false,
        message: "Ripple percentages look high. Try ΔI ≤ 100%, ΔV ≤ 50%.",
      };
    }

    return { ok: true };
  }

  /**
   * Beginner design equations:
   * 1) Transformer: winding ratio = 230 / Vs
   * 2) DC after rect+cap: ≈ Vs × 1.414; no-load ≈ Vs×√2 − 2·Vdiode
   * 3) Buck: D = Vout/Vin · R = Vout/Iout
   *          L = (Vin − Vout) · D / (ΔI · f)
   *          C = ΔI / (8 · f · ΔV)
   * 4) Pulse: Period = 1/f · PW% = D×100
   */
  function calculateCharge(inputs) {
    const { Vs, Vo, Io, fsw, dilPct, dvoPct, Vdiode } = inputs;
    const Vp = LINE.V_PRIMARY_RMS;

    // 1. Transformer
    const n = Vp / Vs;

    // 2. DC after rectifier + capacitor
    const VdcApprox = Vs * Math.SQRT2; // ≈ Vs × 1.414
    const VdcNl = VdcApprox - 2 * Vdiode; // no-load (e.g. ~15.75 V for 12 V + diodes)
    const Vin = VdcNl; // buck input

    // 3. Buck converter
    const D = Vo / Vin;
    const R = Vo / Io;
    const dIL = (dilPct / 100) * Io; // ΔI
    const dVo = (dvoPct / 100) * Vo; // ΔV
    const L = ((Vin - Vo) * D) / (dIL * fsw);
    const C = dIL / (8 * fsw * dVo);

    // 4. Pulse generator
    const period = 1 / fsw;
    const pulseWidthPct = D * 100;
    const Po = Vo * Io;

    return {
      Vs,
      n,
      Vp,
      VdcApprox,
      VdcNl,
      Vin,
      Vdiode,
      Vo,
      Io,
      D,
      R,
      dIL,
      dVo,
      L,
      C,
      fsw,
      period,
      pulseWidthPct,
      Po,
      amplitude: 1,
    };
  }

  function clearChargeResults() {
    Object.keys(els.chOut).forEach((k) => {
      if (k === "amp") setText(els.chOut[k], "1");
      else if (k === "vprimary") setText(els.chOut[k], "230 V");
      else setText(els.chOut[k], "—");
    });
  }

  function renderChargeResults(r) {
    setText(els.chOut.vsec, formatEngineering(r.Vs, "V"));
    setText(
      els.chOut.ratio,
      trimTrailingZeros(Number(r.n.toPrecision(4)))
    );
    if (els.chOut.vprimary) setText(els.chOut.vprimary, "230 V");
    if (els.chOut.vdcApprox)
      setText(els.chOut.vdcApprox, formatEngineering(r.VdcApprox, "V"));
    if (els.chOut.vdcNl)
      setText(els.chOut.vdcNl, formatEngineering(r.VdcNl, "V"));
    if (els.chOut.vinBuck)
      setText(els.chOut.vinBuck, formatEngineering(r.Vin, "V"));
    setText(els.chOut.D, formatPercent(r.D));
    setText(els.chOut.R, formatEngineering(r.R, "Ω"));
    if (els.chOut.dil) setText(els.chOut.dil, formatEngineering(r.dIL, "A"));
    setText(els.chOut.L, formatEngineering(r.L, "H"));
    setText(els.chOut.C, formatEngineering(r.C, "F"));
    if (els.chOut.dvo) setText(els.chOut.dvo, formatEngineering(r.dVo, "V"));
    if (els.chOut.freq)
      setText(els.chOut.freq, formatEngineering(r.fsw, "Hz"));
    setText(els.chOut.period, formatEngineering(r.period, "s"));
    setText(
      els.chOut.pw,
      `${trimTrailingZeros(Number(r.pulseWidthPct.toPrecision(4)))} %`
    );
    setText(els.chOut.amp, "1");
    setText(els.chOut.Po, formatEngineering(r.Po, "W"));
    if (els.chOut.pwNote)
      setText(
        els.chOut.pwNote,
        trimTrailingZeros(Number(r.D.toPrecision(4)))
      );
  }

  function showChargeValidation(message) {
    if (els.chargeValidation) {
      els.chargeValidation.innerHTML = message;
      els.chargeValidation.hidden = false;
    }
    if (els.resultsCharge) els.resultsCharge.classList.add("is-error");
  }

  function hideChargeValidation() {
    if (els.chargeValidation) {
      els.chargeValidation.hidden = true;
      els.chargeValidation.textContent = "";
    }
    if (els.resultsCharge) els.resultsCharge.classList.remove("is-error");
  }

  function recomputeCharge() {
    try {
      if (!els.chVs || !els.chVo || !els.chIo || !els.chFsw) {
        console.error("Charge inputs missing from DOM");
        return;
      }
      const inputs = readChargeInputs();
      const check = validateCharge(inputs);

      if (!check.ok) {
        showChargeValidation(check.message);
        clearChargeResults();
        return;
      }

      hideChargeValidation();
      renderChargeResults(calculateCharge(inputs));
    } catch (err) {
      console.error("recomputeCharge failed:", err);
    }
  }

  /* ——— Formulas ——— */

  function updateFormulas() {
    let items;
    let title = "Ideal CCM Equations";

    if (topology === TOPOLOGY.CHARGE) {
      title = "Charging Circuit — Beginner Equations";
      items = [
        { label: "Chain", expr: "230 V AC → transformer → rectifier + cap → buck → Vout" },
        { label: "1 · Secondary voltage", expr: "Vs = user (e.g. 12 V)" },
        { label: "1 · Winding ratio", expr: "n = 230 / Vs   (e.g. 230/12 ≈ 19.17)" },
        { label: "2 · Approx DC", expr: "Vdc ≈ Vs × 1.414   (= Vs × √2)" },
        { label: "2 · No-load DC (used as Vin)", expr: "Vin ≈ Vs × √2 − 2 · Vdiode   (e.g. ≈ 15.75 V)" },
        { label: "3 · Duty cycle", expr: "D = Vout / Vin" },
        { label: "3 · Load resistance", expr: "R = Vout / Iout" },
        { label: "3 · Inductor", expr: "L = (Vin − Vout) · D / (ΔI · f)" },
        { label: "3 · Capacitor", expr: "C = ΔI / (8 · f · ΔV)" },
        { label: "3 · Ripples from %", expr: "ΔI = (%/100)·Iout · ΔV = (%/100)·Vout" },
        { label: "4 · Pulse period", expr: "Period = 1 / f" },
        { label: "4 · Pulse width", expr: "Pulse Width (%) = D × 100" },
      ];
    } else if (topology === TOPOLOGY.SEMI) {
      title = "Ideal Semi-Converter Equations";
      items = [
        { label: "Peak supply", expr: "Vₘ = Vₛ · √2" },
        { label: "Average output voltage", expr: "Vₒ = (Vₘ / π) · (1 + cos α)" },
        {
          label: "RMS output voltage",
          expr: "Vᵣₘₛ = (Vₘ / √2) · √[(1/π)(π − α + sin(2α)/2)]",
        },
        { label: "Form factor", expr: "FF = Vᵣₘₛ / Vₒ" },
        { label: "Ripple factor", expr: "RF = √(FF² − 1)" },
        { label: "T₁ gate delay", expr: "t₁ = (α / 360°) · (1 / f)" },
        { label: "T₂ gate delay", expr: "t₂ = ((180° + α) / 360°) · (1 / f)" },
        {
          label: "Topology",
          expr: "1-φ symmetrical · 2 SCR + 2 diode · one quadrant",
        },
      ];
    } else if (topology === TOPOLOGY.FULL) {
      title = "Ideal Full Converter Equations";
      const isRl = fullLoadType === LOAD.RL;

      items = [
        { label: "Peak supply", expr: "Vₘ = Vₛ · √2" },
        {
          label: "Average output voltage",
          expr: isRl
            ? "Vₒ = (2 Vₘ / π) · cos α   (RL continuous)"
            : "Vₒ = (Vₘ / π) · (1 + cos α)   (R load)",
        },
        {
          label: "RMS output voltage",
          expr: isRl
            ? "Vᵣₘₛ = Vₘ / √2   (full π conduction window)"
            : "Vᵣₘₛ = (Vₘ / √2) · √[(1/π)(π − α + sin(2α)/2)]",
        },
        {
          label: "Quadrant / mode",
          expr: isRl
            ? "α < 90° rectifier · α = 90° Vₒ = 0 · α > 90° inverter (2-quadrant)"
            : "Always Vₒ ≥ 0 (R extinguishes at π) · one-quadrant voltage",
        },
        { label: "Form factor", expr: "FF = Vᵣₘₛ / |Vₒ|" },
        { label: "Ripple factor", expr: "RF = √(FF² − 1)" },
        {
          label: "Pair A gate delay",
          expr: "t(T₁·T₂) = (α / 360°) · (1 / f)",
        },
        {
          label: "Pair B gate delay",
          expr: "t(T₃·T₄) = ((180° + α) / 360°) · (1 / f)",
        },
        {
          label: "Topology",
          expr: "1-φ fully controlled bridge · 4 SCR · diagonal pairs",
        },
      ];
    } else {
      const common = [
        { label: "Output current", expr: "Iₒ = Pₒ / Vₒ" },
        { label: "Input current", expr: "Iᵢₙ = Pₒ / Vᵢₙ" },
        { label: "Load resistance", expr: "R = Vₒ² / Pₒ" },
      ];

      const buck = [
        { label: "Duty cycle", expr: "D = Vₒ / Vᵢₙ" },
        { label: "Inductance", expr: "L = (Vᵢₙ − Vₒ) · D / (fₛ · ΔIₗ)" },
        { label: "Capacitance", expr: "C = ΔIₗ / (8 · fₛ · ΔVₒ)" },
      ];

      const boost = [
        { label: "Duty cycle", expr: "D = 1 − Vᵢₙ / Vₒ" },
        { label: "Inductance", expr: "L = Vᵢₙ · D / (fₛ · ΔIₗ)" },
        { label: "Capacitance", expr: "C = Iₒ · D / (fₛ · ΔVₒ)" },
      ];

      const buckBoostInv = [
        { label: "Duty cycle", expr: "D = Vₒ / (Vᵢₙ + Vₒ)" },
        { label: "Voltage gain (magnitude)", expr: "Vₒ / Vᵢₙ = D / (1 − D)" },
        { label: "Inductance", expr: "L = Vᵢₙ · D / (fₛ · ΔIₗ)" },
        { label: "Capacitance", expr: "C = Iₒ · D / (fₛ · ΔVₒ)" },
        {
          label: "Topology",
          expr: "Inverting · 1 switch + 1 diode · polarity −Vₒ",
        },
      ];

      const sepic = [
        { label: "Duty cycle", expr: "D = Vₒ / (Vᵢₙ + Vₒ)" },
        { label: "Voltage gain", expr: "Vₒ / Vᵢₙ = D / (1 − D)   (non-inverting)" },
        { label: "Inductor L₁", expr: "L₁ = Vᵢₙ · D / (fₛ · ΔIₗ)" },
        { label: "Inductor L₂", expr: "L₂ = Vᵢₙ · D / (fₛ · ΔIₗ)   (same ΔIₗ → L₁ = L₂)" },
        { label: "Coupling cap Cₛ", expr: "Cₛ = Iₒ · D / (fₛ · ΔVₒ)" },
        { label: "Output cap Cₒ", expr: "Cₒ = Iₒ · D / (fₛ · ΔVₒ)" },
        { label: "Inductor currents", expr: "Iₗ₁ ≈ Iᵢₙ · Iₗ₂ ≈ Iₒ" },
        {
          label: "Topology",
          expr: "Non-inverting · 1 switch + 1 diode · step-up or step-down · +Vₒ",
        },
      ];

      let nibbEqs = [];
      if (topology === TOPOLOGY.NIBB) {
        const vin = parseFloat(els.vin.value);
        const vout = parseFloat(els.vout.value);
        let modeId = "simultaneous";
        if (
          Number.isFinite(vin) &&
          Number.isFinite(vout) &&
          vin > 0 &&
          vout > 0
        ) {
          modeId = resolveNibbMode(vin, vout).id;
        }

        if (modeId === "buck") {
          nibbEqs = [
            { label: "Drive strategy", expr: "Multi-mode · Buck (Vₒ < Vᵢₙ)" },
            { label: "Duty cycle (S₁)", expr: "D = Vₒ / Vᵢₙ" },
            { label: "Inductance", expr: "L = (Vᵢₙ − Vₒ) · D / (fₛ · ΔIₗ)" },
            { label: "Capacitance", expr: "C = ΔIₗ / (8 · fₛ · ΔVₒ)" },
            { label: "Buck switch S₁", expr: "PWM @ D" },
            { label: "Boost switch S₂", expr: "OFF (gate = 0)" },
          ];
        } else if (modeId === "boost") {
          nibbEqs = [
            { label: "Drive strategy", expr: "Multi-mode · Boost (Vₒ > Vᵢₙ)" },
            { label: "Duty cycle (S₂)", expr: "D = 1 − Vᵢₙ / Vₒ" },
            { label: "Inductance", expr: "L = Vᵢₙ · D / (fₛ · ΔIₗ)" },
            { label: "Capacitance", expr: "C = Iₒ · D / (fₛ · ΔVₒ)" },
            { label: "Buck switch S₁", expr: "ON (gate = 1)" },
            { label: "Boost switch S₂", expr: "PWM @ D" },
          ];
        } else {
          // simultaneous (Both PWM) or multi at Vo≈Vin
          const driveLabel =
            nibbDrive === NIBB_DRIVE.SIMUL
              ? "Both PWM · simultaneous (any Vₒ/Vᵢₙ)"
              : "Multi-mode · Buck-Boost (Vₒ ≈ Vᵢₙ)";
          nibbEqs = [
            { label: "Drive strategy", expr: driveLabel },
            { label: "Duty cycle (S₁ & S₂)", expr: "D = Vₒ / (Vᵢₙ + Vₒ)" },
            { label: "Voltage gain", expr: "Vₒ / Vᵢₙ = D / (1 − D)" },
            { label: "Inductance", expr: "L = Vᵢₙ · D / (fₛ · ΔIₗ)" },
            { label: "Capacitance", expr: "C = Iₒ · D / (fₛ · ΔVₒ)" },
            {
              label: "Gate drive",
              expr: "S₁ and S₂ same PWM · simultaneous ON/OFF",
            },
          ];
        }
        nibbEqs.push({
          label: "Topology",
          expr: "Non-inverting · 2 active switches · common ground · +Vₒ",
        });
        nibbEqs.push({
          label: "Other strategy",
          expr:
            nibbDrive === NIBB_DRIVE.SIMUL
              ? "Multi-mode: S₂ OFF (buck) or S₁ ON (boost) by voltages"
              : "Both PWM: always D/(1−D) with both switches switching",
        });
      }

      const sim = [
        { label: "Period", expr: "T = 1 / fₛ" },
        { label: "Pulse width", expr: "PW = D × 100 %" },
        { label: "Amplitude", expr: "A = 1" },
      ];

      let topoEqs = boost;
      if (topology === TOPOLOGY.BUCK) topoEqs = buck;
      else if (topology === TOPOLOGY.BUCKBOOST) topoEqs = buckBoostInv;
      else if (topology === TOPOLOGY.NIBB) topoEqs = nibbEqs;
      else if (topology === TOPOLOGY.SEPIC) topoEqs = sepic;

      items = common.concat(topoEqs).concat(sim);
    }

    if (els.formulaHeading) els.formulaHeading.textContent = title;

    els.formulaGrid.innerHTML = items
      .map(
        (item) =>
          `<dl class="formula-item"><dt>${item.label}</dt><dd>${item.expr}</dd></dl>`
      )
      .join("");
  }

  /* ——— Topology / load switching ——— */

  function setSemiLoadType(next) {
    semiLoadType = next;
    const isR = next === LOAD.R;

    els.btnLoadR.classList.toggle("is-active", isR);
    els.btnLoadRl.classList.toggle("is-active", !isR);
    els.btnLoadR.setAttribute("aria-pressed", String(isR));
    els.btnLoadRl.setAttribute("aria-pressed", String(!isR));

    els.fieldLoadL.hidden = isR;
    els.semiBadge.textContent = isR ? "R load" : "RL CCM";
    els.semiHint.textContent = isR
      ? "1-φ semi · R load"
      : "1-φ semi · RL continuous";

    updateFormulas();
    recomputeSemi();
  }

  function setFullLoadType(next) {
    fullLoadType = next;
    const isR = next === LOAD.R;

    els.btnFullLoadR.classList.toggle("is-active", isR);
    els.btnFullLoadRl.classList.toggle("is-active", !isR);
    els.btnFullLoadR.setAttribute("aria-pressed", String(isR));
    els.btnFullLoadRl.setAttribute("aria-pressed", String(!isR));

    els.fieldFullLoadL.hidden = isR;
    els.fullBadge.textContent = isR ? "R · 4 SCR" : "RL CCM";
    els.fullHint.textContent = isR
      ? "1-φ full bridge · R load"
      : "1-φ full bridge · RL (α>90° inverter)";

    updateFormulas();
    recomputeFull();
  }

  function setDcdcChrome() {
    const isBuck = topology === TOPOLOGY.BUCK;
    const isBoost = topology === TOPOLOGY.BOOST;
    const isBb = topology === TOPOLOGY.BUCKBOOST;
    const isNibb = topology === TOPOLOGY.NIBB;
    const isSepic = topology === TOPOLOGY.SEPIC;

    setText(els.heroEyebrow, "Power Electronics · Ideal CCM");
    setDcdcComponentLabels(isSepic);
    if (els.sepicExtraPanel) els.sepicExtraPanel.hidden = !isSepic;

    // Always hide NIBB UI unless NIBB is active (prevents leftover panels on SEPIC)
    if (els.nibbDriveWrap) els.nibbDriveWrap.hidden = !isNibb;
    if (els.nibbModePanel) els.nibbModePanel.hidden = !isNibb;
    if (!isNibb && els.outDLabel) els.outDLabel.textContent = "Duty Cycle D";
    if (els.dcdcSimulinkBadge) els.dcdcSimulinkBadge.textContent = "Pulse Generator";

    const shortPulse =
      "Use in a Simulink <strong>Pulse Generator</strong> (open-loop).";

    if (isBuck) {
      els.badge.textContent = "Buck";
      setText(els.navTagline, "CCM Buck");
      setText(els.heroLead, "Ideal buck converter sizing — L, C, R and pulse settings.");
      setText(els.footerCopy, "Simverse · Buck");
      if (els.dcdcHint) els.dcdcHint.textContent = "Ideal CCM · Vₒ < Vᵢₙ";
      if (els.dcdcSimulinkNote) els.dcdcSimulinkNote.innerHTML = shortPulse;
    } else if (isBoost) {
      els.badge.textContent = "Boost";
      setText(els.navTagline, "CCM Boost");
      setText(els.heroLead, "Ideal boost converter sizing — L, C, R and pulse settings.");
      setText(els.footerCopy, "Simverse · Boost");
      if (els.dcdcHint) els.dcdcHint.textContent = "Ideal CCM · Vₒ > Vᵢₙ";
      if (els.dcdcSimulinkNote) els.dcdcSimulinkNote.innerHTML = shortPulse;
    } else if (isBb) {
      els.badge.textContent = "Inverting";
      setText(els.navTagline, "CCM Buck-Boost");
      setText(els.heroLead, "Inverting buck-boost — enter |Vₒ|; step-up or step-down.");
      setText(els.footerCopy, "Simverse · Buck-Boost");
      if (els.dcdcHint) els.dcdcHint.textContent = "Ideal CCM · inverting · |Vₒ|";
      if (els.dcdcSimulinkNote) els.dcdcSimulinkNote.innerHTML = shortPulse;
    } else if (isNibb) {
      els.badge.textContent =
        nibbDrive === NIBB_DRIVE.SIMUL ? "Both PWM" : "Multi-mode";
      setText(els.navTagline, "CCM NIBB");
      setText(els.heroLead, "Non-inverting buck-boost — multi-mode or both-PWM drive.");
      setText(els.footerCopy, "Simverse · NIBB");
      if (els.dcdcHint) els.dcdcHint.textContent = "Ideal CCM · non-inverting";
      if (els.nibbDriveWrap) els.nibbDriveWrap.hidden = false;
      if (els.nibbModePanel) els.nibbModePanel.hidden = false;
    } else if (isSepic) {
      els.badge.textContent = "SEPIC";
      setText(els.navTagline, "CCM SEPIC");
      setText(els.heroLead, "Ideal SEPIC — L₁, L₂, Cₛ, Cₒ. Step-up or step-down.");
      setText(els.footerCopy, "Simverse · SEPIC");
      if (els.dcdcHint) els.dcdcHint.textContent = "Ideal CCM · non-inverting · L₁ = L₂";
      if (els.dcdcSimulinkNote) els.dcdcSimulinkNote.innerHTML = shortPulse;
      if (els.sepicExtraPanel) els.sepicExtraPanel.hidden = false;
    }
  }

  /** Sync exclusive active state across all main topology buttons. */
  function syncTopoButtons(activeId) {
    const buttons = document.querySelectorAll(
      "button.topo-btn[data-topology], .topo-picker .topo-btn[data-topology]"
    );
    buttons.forEach((btn) => {
      const id = (btn.getAttribute("data-topology") || "").trim();
      const on = id === activeId;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });
  }

  function showOnlyView(viewEl) {
    const views = [els.viewDcdc, els.viewSemi, els.viewFull, els.viewCharge];
    views.forEach((v) => {
      if (!v) return;
      if (v === viewEl) {
        v.hidden = false;
        v.removeAttribute("hidden");
        v.style.display = "";
      } else {
        v.hidden = true;
        v.setAttribute("hidden", "");
      }
    });
  }

  function setTopology(next) {
    try {
      const id = String(next || "")
        .trim()
        .toLowerCase();
      const valid = Object.values(TOPOLOGY);
      if (!id || valid.indexOf(id) === -1) {
        console.warn("Unknown topology:", next);
        return;
      }

      topology = id;
      const isBuck = id === TOPOLOGY.BUCK;
      const isBoost = id === TOPOLOGY.BOOST;
      const isBb = id === TOPOLOGY.BUCKBOOST;
      const isNibb = id === TOPOLOGY.NIBB;
      const isSepic = id === TOPOLOGY.SEPIC;
      const isSemi = id === TOPOLOGY.SEMI;
      const isFull = id === TOPOLOGY.FULL;
      const isCharge = id === TOPOLOGY.CHARGE;
      const isDcdc = isBuck || isBoost || isBb || isNibb || isSepic;

      // Exclusive single selection
      syncTopoButtons(id);

      if (els.nibbDriveWrap) els.nibbDriveWrap.hidden = true;
      if (els.nibbModePanel) els.nibbModePanel.hidden = true;
      if (els.sepicExtraPanel) els.sepicExtraPanel.hidden = true;

      if (isSemi) {
        showOnlyView(els.viewSemi);
        setText(els.navTagline, "1-φ Semi");
        setText(els.heroEyebrow, "Power Electronics · AC–DC");
        setText(
          els.heroLead,
          "Single-phase semi-converter — average/RMS voltage and gate timing."
        );
        setText(els.footerCopy, "Simverse · Semi");
        setSemiLoadType(semiLoadType);
        return;
      }

      if (isFull) {
        showOnlyView(els.viewFull);
        setText(els.navTagline, "1-φ Full");
        setText(els.heroEyebrow, "Power Electronics · AC–DC");
        setText(
          els.heroLead,
          "Fully controlled bridge (4 SCR) — R / RL, rectifier or inverter."
        );
        setText(els.footerCopy, "Simverse · Full");
        setFullLoadType(fullLoadType);
        return;
      }

      if (isCharge) {
        showOnlyView(els.viewCharge);
        setText(els.navTagline, "Charging Circuit");
        setText(els.heroEyebrow, "Power Electronics · AC–DC supply");
        setText(
          els.heroLead,
          "Transformer → rectifier → buck — beginner design equations."
        );
        setText(els.footerCopy, "Simverse · Charge");
        updateFormulas();
        recomputeCharge();
        return;
      }

      if (isDcdc) {
        showOnlyView(els.viewDcdc);
        setDcdcChrome();

        if (els.vin && els.vout) {
          const vin = parseFloat(els.vin.value);
          const vout = parseFloat(els.vout.value);
          if (
            isBuck &&
            Number.isFinite(vin) &&
            Number.isFinite(vout) &&
            vout > vin
          ) {
            els.vout.value = "12";
            els.vin.value = "24";
          }
          if (
            isBoost &&
            Number.isFinite(vin) &&
            Number.isFinite(vout) &&
            vout < vin
          ) {
            els.vin.value = "12";
            els.vout.value = "24";
          }
        }

        updateFormulas();
        recomputeDcdc();
      }
    } catch (err) {
      console.error("setTopology failed:", err);
    }
  }

  // Public API so topology buttons always work (even if binding order changes)
  window.simverseSetTopology = setTopology;

  /* ——— Events ——— */

  function bind() {
    const dcdcInputs = [
      els.vin,
      els.vout,
      els.pout,
      els.fs,
      els.dil,
      els.dvo,
      els.fsUnit,
    ];

    dcdcInputs.forEach((el) => {
      el.addEventListener("input", recomputeDcdc);
      el.addEventListener("change", recomputeDcdc);
    });

    els.form.addEventListener("submit", (e) => {
      e.preventDefault();
      recomputeDcdc();
    });

    const semiInputs = [
      els.vs,
      els.fAc,
      els.alpha,
      els.loadR,
      els.loadL,
      els.loadLUnit,
    ];

    semiInputs.forEach((el) => {
      el.addEventListener("input", recomputeSemi);
      el.addEventListener("change", recomputeSemi);
    });

    els.semiForm.addEventListener("submit", (e) => {
      e.preventDefault();
      recomputeSemi();
    });

    const fullInputs = [
      els.fullVs,
      els.fullFAc,
      els.fullAlpha,
      els.fullLoadR,
      els.fullLoadL,
      els.fullLoadLUnit,
    ];

    fullInputs.forEach((el) => {
      el.addEventListener("input", recomputeFull);
      el.addEventListener("change", recomputeFull);
    });

    els.fullForm.addEventListener("submit", (e) => {
      e.preventDefault();
      recomputeFull();
    });

    if (els.chargeForm) {
      const chargeInputs = [
        els.chVs,
        els.chVo,
        els.chIo,
        els.chVdiode,
        els.chFsw,
        els.chDilPct,
        els.chDvoPct,
      ];
      chargeInputs.forEach((el) => {
        if (!el) return;
        el.addEventListener("input", recomputeCharge);
        el.addEventListener("change", recomputeCharge);
      });
      els.chargeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        recomputeCharge();
      });
    }

    // Topology selection: direct listeners on every button + delegated fallback
    function onTopoClick(e) {
      const btn =
        e.currentTarget && e.currentTarget.getAttribute
          ? e.currentTarget
          : e.target && e.target.closest
            ? e.target.closest("button.topo-btn[data-topology]")
            : null;
      if (!btn) return;
      const id = (btn.getAttribute("data-topology") || "").trim();
      if (!id) return;
      e.preventDefault();
      e.stopPropagation();
      setTopology(id);
    }

    const topoButtons = document.querySelectorAll(
      "button.topo-btn[data-topology]"
    );
    topoButtons.forEach((btn) => {
      btn.addEventListener("click", onTopoClick);
    });

    // Also bind by id map (SEPIC / Charge must always work)
    const topoMap = [
      [els.btnBuck, TOPOLOGY.BUCK],
      [els.btnBoost, TOPOLOGY.BOOST],
      [els.btnBuckBoost, TOPOLOGY.BUCKBOOST],
      [els.btnNibb, TOPOLOGY.NIBB],
      [els.btnSepic, TOPOLOGY.SEPIC],
      [els.btnSemi, TOPOLOGY.SEMI],
      [els.btnFull, TOPOLOGY.FULL],
      [els.btnCharge, TOPOLOGY.CHARGE],
    ];
    topoMap.forEach(([btn, id]) => {
      if (!btn) {
        console.warn("Missing topology button for", id);
        return;
      }
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        setTopology(id);
      });
    });
    els.btnLoadR.addEventListener("click", () => setSemiLoadType(LOAD.R));
    els.btnLoadRl.addEventListener("click", () => setSemiLoadType(LOAD.RL));
    els.btnFullLoadR.addEventListener("click", () => setFullLoadType(LOAD.R));
    els.btnFullLoadRl.addEventListener("click", () => setFullLoadType(LOAD.RL));
    if (els.btnNibbMulti) {
      els.btnNibbMulti.addEventListener("click", () =>
        setNibbDrive(NIBB_DRIVE.MULTI)
      );
    }
    if (els.btnNibbSimul) {
      els.btnNibbSimul.addEventListener("click", () =>
        setNibbDrive(NIBB_DRIVE.SIMUL)
      );
    }
    if (els.btnToggleFormulas) {
      els.btnToggleFormulas.addEventListener("click", () => {
        formulasOpen = !formulasOpen;
        if (els.formulaGrid) els.formulaGrid.hidden = !formulasOpen;
        els.btnToggleFormulas.textContent = formulasOpen ? "Hide" : "Show";
        els.btnToggleFormulas.setAttribute(
          "aria-expanded",
          String(formulasOpen)
        );
      });
    }
  }

  /* ——— Init ——— */

  function init() {
    try {
      bind();
      if (els.fieldLoadL) els.fieldLoadL.hidden = true;
      if (els.fieldFullLoadL) els.fieldFullLoadL.hidden = true;
      setTopology(TOPOLOGY.BUCK);
    } catch (err) {
      console.error("Simverse init failed:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
