import { colors, theme } from "../interfaces/interface";

export const themes: theme<colors> = {
  default: {
    bgColor: "d1c5c0",
    color: "071a52",
    lineColor: "17b978",
    pointColor: "071a52",
  },
  dracula: {
    bgColor: "44475a",
    color: "f8f8f2",
    lineColor: "ff79c6",
    pointColor: "bd93f9",
  },
  gruvbox: {
    bgColor: "504945",
    color: "d4be98",
    lineColor: "d8a657",
    pointColor: "e78a4e",
  },
  rogue: {
    bgColor: "172030",
    color: "a3b09a",
    lineColor: "b18bb1",
    pointColor: "c6797e",
  },
  github: {
    bgColor: "293036",
    color: "ffffff",
    lineColor: "9ecbff",
    pointColor: "f97583",
  },
  xcode: {
    bgColor: "202124",
    color: "fcfcfa",
    lineColor: "c4e3ff",
    pointColor: "ff8070",
  },
};
