const rgbToHsv = (r, g, b) => {
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const diff = max - min;

  if (!diff || !max) {
    return [0, 0, max];
  }

  var h;
  switch (max) {
  case r: h = 0 + (g - b) / diff; break;
  case g: h = 2 + (b - r) / diff; break;
  case b: h = 4 + (r - g) / diff; break;
  }

  h *= 60;
  if (h < 0) h += 360;

  return [h, diff / max, max];
};

const hsvToRgb = (h, s, v) => {
  if (!s) {
    return [v, v, v];
  }

  if (h >= 300) h -= 360;
  h /= 60;

  const f = h - ~~h;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));

  switch (~~h) {
    case 0: return [v, t, p];
    case 1: return [q, v, p];
    case 2: return [p, v, t];
    case 3: return [p, q, v];
    case 4: return [t, p, v];
    case 5: return [v, p, q];
  }
};
