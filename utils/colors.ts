const hexToRgbTriplet = (hex: string): string => {
  if (typeof hex !== "string") {
    throw new Error("Hex color must be a string");
  }

  const cleanHex = hex.replace(/^#/, "").trim().toLowerCase();

  if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(cleanHex)) {
    throw new Error(
      `Invalid hex color format: "${hex}". Expected format: #rgb or #rrggbb`
    );
  }

  let normalizedHex: string;

  if (cleanHex.length === 3) {
    normalizedHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  } else {
    normalizedHex = cleanHex;
  }

  const r = parseInt(normalizedHex.substring(0, 2), 16);
  const g = parseInt(normalizedHex.substring(2, 4), 16);
  const b = parseInt(normalizedHex.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error(`Failed to parse hex color: "${hex}"`);
  }

  return `${r} ${g} ${b}`;
};

const convertBrandingToTailwindProperties = (
  colorBranding: Record<string, Record<string | number, string>>,
  prefix: string = "color-estable"
): Record<string, string> => {
  const result: Record<string, string> = {};

  Object.entries(colorBranding).forEach(([category, shades]) => {
    Object.entries(shades).forEach(([shade, hexValue]) => {
      try {
        const rgbTriplet = hexToRgbTriplet(hexValue);

        const propertyName = `--${prefix}-${category}-${shade}`;

        result[propertyName] = rgbTriplet;
      } catch (error) {
        console.warn(
          `Failed to convert color ${category}.${shade}: ${hexValue}`,
          error
        );
      }
    });
  });

  return result;
};

const generateTailwindColorConfig = (
  colorBranding: Record<string, Record<string | number, string>>,
  prefix: string = "brand"
): Record<string, Record<string, Record<string, string>>> => {
  const result: Record<string, Record<string, Record<string, string>>> = {
    [prefix]: {},
  };

  Object.entries(colorBranding).forEach(([category, shades]) => {
    result[prefix][category] = {};

    Object.entries(shades).forEach(([shade, hexValue]) => {
      try {
        // Validate the hex color (we don't need the RGB value here, just validation)
        hexToRgbTriplet(hexValue);

        // Create the CSS custom property reference
        const cssVarReference = `rgb(var(--color-${prefix}-${category}-${shade})/<alpha-value>)`;

        result[prefix][category][shade] = cssVarReference;
      } catch (error) {
        console.warn(
          `Failed to process color ${category}.${shade}: ${hexValue}`,
          error
        );
      }
    });
  });

  return result;
};

export {
  convertBrandingToTailwindProperties,
  generateTailwindColorConfig,
  hexToRgbTriplet
};
