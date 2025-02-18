import 'virtual:uno.css';

const values = {
  rimDiameter: 622,
  tireDiameter: 33,
  sealantDepth: 300,
};
function isInputId(k: string): k is keyof typeof values {
  return k in values;
}
const inputs = [
  ...document.querySelectorAll('input[id]'),
] as HTMLInputElement[];
function recalc() {
  console.log('recalc');
  const tire = values.tireDiameter / 2;
  const rim = values.rimDiameter / 2;
  const outer = rim + tire;
  const sealantR = values.sealantDepth * 1e-3;
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
  for (const input of inputs) {
    if (isCalcId(input.id)) {
      console.log(input.id);
      input.value = calcs[input.id].toFixed(2);
    }
  }
}
for (const input of inputs) {
  if (isInputId(input.id)) {
    input.value = String(values[input.id]);
    input.addEventListener('change', () => {
      if (isInputId(input.id)) {
        values[input.id] = +input.value;
        recalc();
      }
    });
  }
}
recalc();
