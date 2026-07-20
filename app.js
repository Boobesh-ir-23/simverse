/**
 * Simverse — Buck, Boost, BB, NIBB, Semi, Full & Charging Circuit
 * Ideal CCM equations, live updates, engineering unit formatting.
 */

(function () {
  "use strict";

  const TOPOLOGY = {
    BUCK: "buck",
    BOOST: "boost",
    BUCKBOOST: "buckboost",
    NIBB: "nibb",
    SEMI: "semi",
    FULL: "full",
    CHARGE: "charge",
  };
  const LOAD = { R: "r", RL: "rl" };
  const CHARGE_MID = { VBUS: "vbus", VSEC: "vsec" };
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

    /* Charging Circuit */
    chargeForm: document.getElementById("charge-form"),
    btnChargeVbus: document.getElementById("btn-charge-vbus"),
    btnChargeVsec: document.getElementById("btn-charge-vsec"),
    chVo: document.getElementById("ch-vo"),
    chIo: document.getElementById("ch-io"),
    chMid: document.getElementById("ch-mid"),
    chMidLabel: document.getElementById("ch-mid-label"),
    chMidUnit: document.getElementById("ch-mid-unit"),
    chFsw: document.getElementById("ch-fsw"),
    chDilPct: document.getElementById("ch-dil-pct"),
    chDvoPct: document.getElementById("ch-dvo-pct"),
    chDvBulkPct: document.getElementById("ch-dvbulk-pct"),
    chargeBadge: document.getElementById("charge-badge"),
    chargeValidation: document.getElementById("charge-validation-msg"),
    chargeHint: document.getElementById("charge-hint"),
    resultsCharge: document.getElementById("results-charge"),
    chOut: {
      vsec: document.getElementById("ch-out-vsec"),
      ratio: document.getElementById("ch-out-ratio"),
      vm: document.getElementById("ch-out-vm"),
      vbusNl: document.getElementById("ch-out-vbus-nl"),
      vbusLoad: document.getElementById("ch-out-vbus-load"),
      cbulk: document.getElementById("ch-out-cbulk"),
      D: document.getElementById("ch-out-D"),
      L: document.getElementById("ch-out-L"),
      C: document.getElementById("ch-out-C"),
      R: document.getElementById("ch-out-R"),
      Ibus: document.getElementById("ch-out-Ibus"),
      Po: document.getElementById("ch-out-Po"),
      period: document.getElementById("ch-out-period"),
      pw: document.getElementById("ch-out-pw"),
      amp: document.getElementById("ch-out-amp"),
    },
  };

  const NIBB_DRIVE = { MULTI: "multi", SIMUL: "simul" };

  let topology = TOPOLOGY.BUCK;
  let semiLoadType = LOAD.R;
  let fullLoadType = LOAD.R;
  let nibbDrive = NIBB_DRIVE.MULTI;
  let chargeMid = CHARGE_MID.VBUS;
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

    // Buck-Boost / NIBB: both step-up and step-down allowed (magnitude of Vo)

    return { ok: true };
  }

  function isBbFamily() {
    return topology === TOPOLOGY.BUCKBOOST || topology === TOPOLOGY.NIBB;
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
      C,
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
    if (els.nibbModeBadge) setText(els.nibbModeBadge, "—");
    if (els.nibbModeReason) els.nibbModeReason.innerHTML = "—";
    if (els.nibbSwBuck) setText(els.nibbSwBuck, "—");
    if (els.nibbSwBoost) setText(els.nibbSwBoost, "—");
    if (els.nibbSwPwm) setText(els.nibbSwPwm, "—");
    if (els.nibbAltHint) els.nibbAltHint.innerHTML = "";
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
        "<strong>Multi-mode · Buck:</strong> one Pulse Generator → <strong>S₁ only</strong> (period, PW = D×100%, amp = 1). <strong>S₂ gate = 0</strong> (OFF).";
      if (els.dcdcSimulinkBadge) els.dcdcSimulinkBadge.textContent = "S₁ PWM";
    } else if (mode.id === "boost") {
      els.dcdcSimulinkNote.innerHTML =
        "<strong>Multi-mode · Boost:</strong> <strong>S₁ gate = 1</strong> (always ON). One Pulse Generator → <strong>S₂ only</strong> (period, PW = D×100%, amp = 1).";
      if (els.dcdcSimulinkBadge) els.dcdcSimulinkBadge.textContent = "S₂ PWM";
    } else {
      // simultaneous or multi-mode buck-boost
      els.dcdcSimulinkNote.innerHTML =
        "<strong>Both switches PWM:</strong> one Pulse Generator feeds <strong>S₁ and S₂</strong> (same period, PW = D×100%, amp = 1). Simultaneous ON/OFF every cycle. Ideal V<sub>o</sub>/V<sub>in</sub> = D/(1−D).";
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
    // Keep formula band in sync when NIBB mode changes with Vin/Vo
    if (topology === TOPOLOGY.NIBB) updateFormulas();
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

  /* ——— Charging Circuit (230 V → XFMR → bridge → bulk C → buck) ——— */

  function readChargeInputs() {
    const Vo = parseFloat(els.chVo.value);
    const Io = parseFloat(els.chIo.value);
    const mid = parseFloat(els.chMid.value);
    const fsw = parseFloat(els.chFsw.value) * 1000; // kHz → Hz
    const dilPct = parseFloat(els.chDilPct.value);
    const dvoPct = parseFloat(els.chDvoPct.value);
    let dvBulkPct = parseFloat(els.chDvBulkPct.value);
    if (!Number.isFinite(dvBulkPct) || dvBulkPct <= 0) dvBulkPct = 10;

    return { Vo, Io, mid, fsw, dilPct, dvoPct, dvBulkPct };
  }

  function validateCharge(inputs) {
    const { Vo, Io, mid, fsw, dilPct, dvoPct, dvBulkPct } = inputs;
    const checks = [
      ["V<sub>o</sub>", Vo],
      ["I<sub>o</sub>", Io],
      [chargeMid === CHARGE_MID.VBUS ? "V<sub>bus</sub>" : "V<sub>s</sub>", mid],
      ["f<sub>sw</sub>", fsw],
      ["ΔI<sub>L</sub> %", dilPct],
      ["ΔV<sub>o</sub> %", dvoPct],
      ["ΔV<sub>bulk</sub> %", dvBulkPct],
    ];

    for (const [name, val] of checks) {
      if (!Number.isFinite(val) || val <= 0) {
        return { ok: false, message: `Enter a positive value for ${name}.` };
      }
    }

    // Resolve bus for buck constraint
    let Vbus_nl;
    if (chargeMid === CHARGE_MID.VBUS) {
      Vbus_nl = mid;
    } else {
      Vbus_nl = mid * Math.SQRT2;
    }

    if (!(Vo < Vbus_nl)) {
      return {
        ok: false,
        message:
          "Buck stage needs V<sub>o</sub> &lt; V<sub>bus</sub>. Raise DC bus / secondary or lower V<sub>o</sub>.",
      };
    }

    if (dilPct > 100 || dvoPct > 50 || dvBulkPct > 50) {
      return {
        ok: false,
        message: "Ripple percentages look unrealistic. Try ΔI<sub>L</sub> ≤ 100%, ΔV ≤ 50%.",
      };
    }

    return { ok: true };
  }

  /**
   * Ideal offline charging PSU chain.
   * Primary: 230 Vrms, 50 Hz
   * Cap-input bridge: Vbus_nl ≈ √2 · Vs
   * Under load: Vbus_load ≈ Vbus_nl − ΔVbulk/2
   * Cbulk = Ibus / (2 · fline · ΔVbulk)  [full-wave 100 Hz ripple]
   * Buck CCM: D = Vo/Vbus, L, C as Phase I buck (use Vbus_load as Vin)
   */
  function calculateCharge(inputs) {
    const { Vo, Io, mid, fsw, dilPct, dvoPct, dvBulkPct } = inputs;
    const fLine = LINE.F_LINE;
    const Vp = LINE.V_PRIMARY_RMS;

    let Vs; // secondary RMS
    let Vbus_nl;

    if (chargeMid === CHARGE_MID.VBUS) {
      Vbus_nl = mid;
      Vs = Vbus_nl / Math.SQRT2;
    } else {
      Vs = mid;
      Vbus_nl = Vs * Math.SQRT2;
    }

    const Vm = Vs * Math.SQRT2;
    const turnsRatio = Vp / Vs; // Np/Ns for Vp:Vs = ratio:1
    const Po = Vo * Io;
    const R = Vo / Io;

    const dVbulk = (dvBulkPct / 100) * Vbus_nl;
    // Approx average bus under load (peak minus half ripple)
    const Vbus_load = Math.max(Vo * 1.01, Vbus_nl - dVbulk / 2);

    // Ideal power balance: Ibus ≈ Po / Vbus_load
    const Ibus = Po / Vbus_load;

    // Full-wave bulk cap: C = I / (2 f ΔV)
    const Cbulk = Ibus / (2 * fLine * dVbulk);

    // Buck on loaded bus
    const D = Vo / Vbus_load;
    const dIL = (dilPct / 100) * Io;
    const dVo = (dvoPct / 100) * Vo;
    const L = ((Vbus_load - Vo) * D) / (fsw * dIL);
    const C = dIL / (8 * fsw * dVo);

    const period = 1 / fsw;
    const pulseWidthPct = D * 100;

    return {
      Vs,
      Vm,
      turnsRatio,
      Vbus_nl,
      Vbus_load,
      dVbulk,
      Cbulk,
      D,
      L,
      C,
      R,
      Io,
      Ibus,
      Po,
      period,
      pulseWidthPct,
      amplitude: 1,
      dIL,
      dVo,
    };
  }

  function clearChargeResults() {
    Object.keys(els.chOut).forEach((k) => {
      if (k === "amp") setText(els.chOut[k], "1");
      else setText(els.chOut[k], "—");
    });
  }

  function renderChargeResults(r) {
    setText(els.chOut.vsec, formatEngineering(r.Vs, "V"));
    setText(
      els.chOut.ratio,
      `${trimTrailingZeros(Number(r.turnsRatio.toPrecision(4)))} : 1`
    );
    setText(els.chOut.vm, formatEngineering(r.Vm, "V"));
    setText(els.chOut.vbusNl, formatEngineering(r.Vbus_nl, "V"));
    setText(els.chOut.vbusLoad, formatEngineering(r.Vbus_load, "V"));
    setText(els.chOut.cbulk, formatEngineering(r.Cbulk, "F"));
    setText(els.chOut.D, formatPercent(r.D));
    setText(els.chOut.L, formatEngineering(r.L, "H"));
    setText(els.chOut.C, formatEngineering(r.C, "F"));
    setText(els.chOut.R, formatEngineering(r.R, "Ω"));
    setText(els.chOut.Ibus, formatEngineering(r.Ibus, "A"));
    setText(els.chOut.Po, formatEngineering(r.Po, "W"));
    setText(els.chOut.period, formatEngineering(r.period, "s"));
    setText(
      els.chOut.pw,
      `${trimTrailingZeros(Number(r.pulseWidthPct.toPrecision(4)))} %`
    );
    setText(els.chOut.amp, "1");
  }

  function showChargeValidation(message) {
    els.chargeValidation.innerHTML = message;
    els.chargeValidation.hidden = false;
    els.resultsCharge.classList.add("is-error");
  }

  function hideChargeValidation() {
    els.chargeValidation.hidden = true;
    els.chargeValidation.textContent = "";
    els.resultsCharge.classList.remove("is-error");
  }

  function recomputeCharge() {
    const inputs = readChargeInputs();
    const check = validateCharge(inputs);

    if (!check.ok) {
      showChargeValidation(check.message);
      clearChargeResults();
      return;
    }

    hideChargeValidation();
    renderChargeResults(calculateCharge(inputs));
  }

  function setChargeMid(next, convertValue) {
    const prev = chargeMid;
    const mid = parseFloat(els.chMid && els.chMid.value);
    chargeMid = next;
    const isBus = next === CHARGE_MID.VBUS;

    if (els.btnChargeVbus) {
      els.btnChargeVbus.classList.toggle("is-active", isBus);
      els.btnChargeVbus.setAttribute("aria-pressed", String(isBus));
    }
    if (els.btnChargeVsec) {
      els.btnChargeVsec.classList.toggle("is-active", !isBus);
      els.btnChargeVsec.setAttribute("aria-pressed", String(!isBus));
    }

    if (els.chMidLabel) {
      els.chMidLabel.innerHTML = isBus
        ? 'DC Bus Voltage <span class="sym">V<sub>bus</sub></span>'
        : 'Secondary AC (RMS) <span class="sym">V<sub>s</sub></span>';
    }

    if (
      convertValue &&
      prev !== next &&
      Number.isFinite(mid) &&
      mid > 0 &&
      els.chMid
    ) {
      if (isBus) {
        // was Vs → Vbus ≈ √2 Vs
        els.chMid.value = String(Number((mid * Math.SQRT2).toPrecision(4)));
      } else {
        // was Vbus → Vs ≈ Vbus/√2
        els.chMid.value = String(Number((mid / Math.SQRT2).toPrecision(4)));
      }
    }

    updateFormulas();
    recomputeCharge();
  }

  /* ——— Formulas ——— */

  function updateFormulas() {
    let items;
    let title = "Ideal CCM Equations";

    if (topology === TOPOLOGY.CHARGE) {
      title = "Charging Circuit Equations";
      items = [
        { label: "Architecture", expr: "230 V AC → XFMR → bridge → Cbulk → buck → Vo" },
        { label: "Secondary (from Vbus)", expr: "Vs = Vbus / √2   (cap-input peak ≈ Vbus)" },
        { label: "Peak secondary", expr: "Vm = √2 · Vs" },
        { label: "Turns ratio", expr: "Np:Ns = 230 : Vs  →  ratio = 230/Vs : 1" },
        { label: "Vbus no-load", expr: "Vbus,nl ≈ Vm = √2 · Vs" },
        { label: "Vbus under load", expr: "Vbus,load ≈ Vbus,nl − ΔVbulk/2" },
        { label: "Bulk ripple", expr: "ΔVbulk = (%/100) · Vbus,nl" },
        { label: "Bulk capacitor", expr: "Cbulk = Ibus / (2 · fline · ΔVbulk)   · fline = 50 Hz" },
        { label: "Bus current", expr: "Ibus ≈ Po / Vbus,load   · Po = Vo · Io" },
        { label: "Buck duty", expr: "D = Vo / Vbus,load" },
        { label: "Load resistance", expr: "R = Vo / Io" },
        { label: "Buck inductance", expr: "L = (Vbus − Vo) · D / (fsw · ΔIL)" },
        { label: "Buck capacitance", expr: "C = ΔIL / (8 · fsw · ΔVo)" },
        { label: "Ripples from %", expr: "ΔIL = (%IL/100)·Io · ΔVo = (%Vo/100)·Vo" },
        { label: "Simulink period", expr: "T = 1 / fsw · PW = D × 100% · A = 1" },
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
    els.semiBadge.textContent = isR ? "R load · Sym" : "RL CCM · Sym";
    els.semiHint.textContent = isR
      ? "1-φ symmetrical semi-converter (2 SCR + 2 diode). Pure resistive load — iₒ follows vₒ."
      : "1-φ symmetrical semi-converter. RL continuous conduction — freewheel π→π+α, large L assumed.";

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
    els.fullBadge.textContent = isR ? "R · 4 SCR" : "RL CCM · 4 SCR";
    els.fullHint.textContent = isR
      ? "1-φ fully controlled bridge (4 SCR). R load — current zero at π; Vₒ = (Vₘ/π)(1+cos α)."
      : "1-φ fully controlled bridge. RL continuous — Vₒ = (2Vₘ/π)cos α; negative Vₒ when α > 90° (inverter).";

    updateFormulas();
    recomputeFull();
  }

  function setDcdcChrome() {
    const isBuck = topology === TOPOLOGY.BUCK;
    const isBoost = topology === TOPOLOGY.BOOST;
    const isBb = topology === TOPOLOGY.BUCKBOOST;
    const isNibb = topology === TOPOLOGY.NIBB;

    setText(els.heroEyebrow, "Power Electronics · Continuous Conduction Mode");

    if (isBuck) {
      els.badge.textContent = "Buck";
      setText(els.navTagline, "CCM Buck Design");
      setText(
        els.heroLead,
        "Size inductors, capacitors, and load for ideal Buck converters. Get Simulink Pulse Generator settings instantly."
      );
      setText(els.footerCopy, "Simverse Phase I · Ideal CCM Buck · Frontend only");
      if (els.dcdcHint) {
        els.dcdcHint.textContent =
          "Calculations update as you type. Ideal CCM equations — no losses, continuous conduction.";
      }
      if (els.dcdcSimulinkNote) {
        els.dcdcSimulinkNote.innerHTML =
          "Map these values into a Simulink <strong>Pulse Generator</strong> block for open-loop switching.";
      }
    } else if (isBoost) {
      els.badge.textContent = "Boost";
      setText(els.navTagline, "CCM Boost Design");
      setText(
        els.heroLead,
        "Size inductors, capacitors, and load for ideal Boost converters. Get Simulink Pulse Generator settings instantly."
      );
      setText(els.footerCopy, "Simverse Phase I · Ideal CCM Boost · Frontend only");
      if (els.dcdcHint) {
        els.dcdcHint.textContent =
          "Calculations update as you type. Ideal CCM equations — no losses, continuous conduction.";
      }
      if (els.dcdcSimulinkNote) {
        els.dcdcSimulinkNote.innerHTML =
          "Map these values into a Simulink <strong>Pulse Generator</strong> block for open-loop switching.";
      }
    } else if (isBb) {
      els.badge.textContent = "Inverting · CCM";
      setText(els.navTagline, "CCM Buck-Boost Design");
      setText(
        els.heroLead,
        "Size L, C, and load for an ideal inverting buck-boost. Enter |Vₒ| (magnitude); polarity is inverted relative to Vᵢₙ."
      );
      setText(
        els.footerCopy,
        "Simverse Phase I · Ideal CCM Buck-Boost · Frontend only"
      );
      if (els.dcdcHint) {
        els.dcdcHint.textContent =
          "Ideal CCM inverting buck-boost (1 switch + 1 diode). Vₒ is magnitude; real polarity is inverted. Step-up and step-down allowed.";
      }
      if (els.dcdcSimulinkNote) {
        els.dcdcSimulinkNote.innerHTML =
          "Map these values into a Simulink <strong>Pulse Generator</strong> for the single active switch (open-loop).";
      }
    } else if (isNibb) {
      els.badge.textContent =
        nibbDrive === NIBB_DRIVE.SIMUL ? "Both PWM" : "Multi-mode";
      setText(els.navTagline, "CCM NIBB Design");
      setText(
        els.heroLead,
        "Non-inverting buck-boost with two drive strategies: Multi-mode (S₂ OFF / S₁ ON by voltages) or Both PWM (simultaneous S₁+S₂, gain D/(1−D))."
      );
      setText(els.footerCopy, "Simverse Phase I · Ideal CCM NIBB · Frontend only");
      if (els.dcdcHint) {
        els.dcdcHint.textContent =
          "Choose NIBB drive: Multi-mode (efficient scheduling) or Both PWM (both switches same duty always). Ideal CCM, no losses.";
      }
      if (els.nibbDriveWrap) els.nibbDriveWrap.hidden = false;
      if (els.nibbModePanel) els.nibbModePanel.hidden = false;
    }

    if (!isNibb) {
      if (els.nibbDriveWrap) els.nibbDriveWrap.hidden = true;
      if (els.nibbModePanel) els.nibbModePanel.hidden = true;
      if (els.outDLabel) els.outDLabel.textContent = "Duty Cycle D";
      if (els.dcdcSimulinkBadge) els.dcdcSimulinkBadge.textContent = "Pulse Generator";
    }
  }

  function setTopology(next) {
    topology = next;
    const isBuck = next === TOPOLOGY.BUCK;
    const isBoost = next === TOPOLOGY.BOOST;
    const isBb = next === TOPOLOGY.BUCKBOOST;
    const isNibb = next === TOPOLOGY.NIBB;
    const isSemi = next === TOPOLOGY.SEMI;
    const isFull = next === TOPOLOGY.FULL;
    const isCharge = next === TOPOLOGY.CHARGE;
    const isDcdc = isBuck || isBoost || isBb || isNibb;

    els.btnBuck.classList.toggle("is-active", isBuck);
    els.btnBoost.classList.toggle("is-active", isBoost);
    els.btnBuckBoost.classList.toggle("is-active", isBb);
    els.btnNibb.classList.toggle("is-active", isNibb);
    els.btnSemi.classList.toggle("is-active", isSemi);
    els.btnFull.classList.toggle("is-active", isFull);
    if (els.btnCharge) {
      els.btnCharge.classList.toggle("is-active", isCharge);
      els.btnCharge.setAttribute("aria-pressed", String(isCharge));
    }
    els.btnBuck.setAttribute("aria-pressed", String(isBuck));
    els.btnBoost.setAttribute("aria-pressed", String(isBoost));
    els.btnBuckBoost.setAttribute("aria-pressed", String(isBb));
    els.btnNibb.setAttribute("aria-pressed", String(isNibb));
    els.btnSemi.setAttribute("aria-pressed", String(isSemi));
    els.btnFull.setAttribute("aria-pressed", String(isFull));

    els.viewDcdc.hidden = !isDcdc;
    els.viewSemi.hidden = !isSemi;
    els.viewFull.hidden = !isFull;
    if (els.viewCharge) els.viewCharge.hidden = !isCharge;

    if (isSemi) {
      setText(els.navTagline, "1-φ Semi-Converter Design");
      setText(els.heroEyebrow, "Power Electronics · AC–DC Half Controlled");
      setText(
        els.heroLead,
        "Analyse a single-phase symmetrical semi-converter with R or RL load. Live average/RMS voltage, form factor, and SCR gate timing."
      );
      setText(
        els.footerCopy,
        "Simverse Phase I · 1-φ Semi-Converter · Frontend only"
      );
      setSemiLoadType(semiLoadType);
      return;
    }

    if (isFull) {
      setText(els.navTagline, "1-φ Full Converter Design");
      setText(els.heroEyebrow, "Power Electronics · AC–DC Fully Controlled");
      setText(
        els.heroLead,
        "Analyse a single-phase fully controlled bridge (4 SCR) with R or RL load. Live Vₒ laws, two-quadrant RL mode, and diagonal-pair gate timing."
      );
      setText(
        els.footerCopy,
        "Simverse Phase I · 1-φ Full Converter · Frontend only"
      );
      setFullLoadType(fullLoadType);
      return;
    }

    if (isCharge) {
      setText(els.navTagline, "Charging Circuit Design");
      setText(els.heroEyebrow, "Power Electronics · Offline AC–DC Supply");
      setText(
        els.heroLead,
        "Design a complete charging / offline PSU chain: 230 V AC → transformer → bridge → bulk capacitor → CCM buck → regulated DC. Live sizing and Simulink buck pulse settings."
      );
      setText(
        els.footerCopy,
        "Simverse · Charging Circuit · Frontend only"
      );
      setChargeMid(chargeMid, false);
      return;
    }

    setDcdcChrome();

    const vin = parseFloat(els.vin.value);
    const vout = parseFloat(els.vout.value);
    if (isBuck && Number.isFinite(vin) && Number.isFinite(vout) && vout > vin) {
      els.vout.value = "12";
      els.vin.value = "24";
    }
    if (isBoost && Number.isFinite(vin) && Number.isFinite(vout) && vout < vin) {
      els.vin.value = "12";
      els.vout.value = "24";
    }

    updateFormulas();
    recomputeDcdc();
  }

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
        els.chVo,
        els.chIo,
        els.chMid,
        els.chFsw,
        els.chDilPct,
        els.chDvoPct,
        els.chDvBulkPct,
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

    els.btnBuck.addEventListener("click", () => setTopology(TOPOLOGY.BUCK));
    els.btnBoost.addEventListener("click", () => setTopology(TOPOLOGY.BOOST));
    els.btnBuckBoost.addEventListener("click", () =>
      setTopology(TOPOLOGY.BUCKBOOST)
    );
    els.btnNibb.addEventListener("click", () => setTopology(TOPOLOGY.NIBB));
    els.btnSemi.addEventListener("click", () => setTopology(TOPOLOGY.SEMI));
    els.btnFull.addEventListener("click", () => setTopology(TOPOLOGY.FULL));
    if (els.btnCharge) {
      els.btnCharge.addEventListener("click", () =>
        setTopology(TOPOLOGY.CHARGE)
      );
    }
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
    if (els.btnChargeVbus) {
      els.btnChargeVbus.addEventListener("click", () =>
        setChargeMid(CHARGE_MID.VBUS, true)
      );
    }
    if (els.btnChargeVsec) {
      els.btnChargeVsec.addEventListener("click", () =>
        setChargeMid(CHARGE_MID.VSEC, true)
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

  bind();
  els.fieldLoadL.hidden = true;
  els.fieldFullLoadL.hidden = true;
  updateFormulas();
  recomputeDcdc();
})();
