import 'virtual:uno.css';

const defaults = {
  dr: 622,
  dt: 33,
  s: 300,
};
const values = { ...defaults };

{
  const url = new URL(window.location.href);
  for (const k in values) {
    const qv = url.searchParams.get(k);
    const n = Number(qv);
    if (n && !isNaN(n) && isInputId(k)) {
      values[k] = n;
    }
  }
}
function isInputId(k: string): k is keyof typeof values {
  return k in values;
}
const inputs = [
  ...document.querySelectorAll('input[id],select[id]'),
] as (HTMLInputElement | HTMLSelectElement)[];
function recalc() {
  const tire = values.dt / 2;
  const rim = values.dr / 2;
  const outer = rim + tire;
  const sealantR = values.s * 1e-3;
  const area =
    1000 * (4 * Math.PI * Math.PI * ((rim + tire) / 1000) * (tire / 1000));
  const sealantVolume = sealantR * area;
  const calcs = {
    rim,
    tire,
    outer,
    sealantR,
    area,
    sealantVolume,
  };
  function isCalcId(k: string): k is keyof typeof calcs {
    return k in calcs;
  }
  for (const output of document.querySelectorAll('span[id]')) {
    if (isCalcId(output.id)) {
      output.textContent = calcs[output.id].toFixed(2);
    }
  }
  const url = new URL(window.location.href);
  for (const [k, v] of Object.entries(values)) {
    if (!isInputId(k)) {
      continue;
    }
    if (v === defaults[k]) {
      url.searchParams.delete(k);
    } else {
      url.searchParams.set(k, String(v));
    }
  }
  history.replaceState(history.state, '', url);
}
for (const input of inputs) {
  if (isInputId(input.id)) {
    input.value = String(values[input.id]);
    input.addEventListener('change', () => {
      if (isInputId(input.id)) {
        const v = Number(input.value);
        if (v > 0 && !isNaN(v)) {
          values[input.id] = +input.value;
          recalc();
        }
      }
    });
  }
}
recalc();
