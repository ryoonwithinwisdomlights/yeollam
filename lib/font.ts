/**
 * Configure fonts here
 */
// const { BLOG } = require("../blog.config");
import { BLOG } from "../blog.config";
// const { fontFamily } = require('tailwindcss/defaultTheme')

function CJK() {
  switch (BLOG.LANG.toLowerCase()) {
    case "zh-cn":
    case "zh-sg":
      return "SC";
    case "zh":
    case "zh-hk":
    case "zh-tw":
      return "TC";
    case "ja":
    case "ja-jp":
      return "JP";
    case "ko":
    case "kr-KR":
      return "KR";
    default:
      return null;
  }
}

const fontSansCJK = !CJK()
  ? []
  : [`"Noto Sans CJK ${CJK()}"`, `"Noto Sans ${CJK()}"`];
const fontSerifCJK = !CJK()
  ? []
  : [`"Noto Serif CJK ${CJK()}"`, `"Noto Serif ${CJK()}"`];

export const fontFamilies = {
  sans: [...BLOG.FONT_SANS, ...fontSansCJK],
  serif: [...BLOG.FONT_SERIF, ...fontSerifCJK],
  noEmoji: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "sans-serif",
  ],
};
// module.exports = { fontFamilies };