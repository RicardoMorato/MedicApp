/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    primary: "#419DFF",
    text: "#11181C",
    background: "#fff",
    backgroundGrey: "#F3F3F3",
    backgroundDosage: "#ECF5FC",
    backgroundGreyBlack: "#595959",
    boxShadow: "1px 2px 6px rgba(0, 0, 0, 0.25)",
    whiteText: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    separator: "#BBBBBB",
    separatorCard: "#E0E0E0",
    atention: "#FFE311",
    green: "#14AE5C",
    backgroundBoxProfile: "#E6F4FF",
    lightInteractionBgColor: "#FEF9C3",
    mediumInteractionBgColor: "#FFEDD5",
    highInteractionBgColor: "#FEE2E2",
    lightInteractionTextColor: "#FFA50A",
    mediumInteractionTextColor: "#F9802B",
    highInteractionTextColor: "#FF2525",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    bg: "#2F2F2F",
    lightBg: "#595959",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    warning: "#FFE311",
    green: "#14AE5C",
  },
  text: {
    primary: "#000",
    white: "#FFFFFF",
    warning: "#FFA50A",
    success: "#0BFF1B",
  },
  divider: {
    primary: "#000",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.7)",
    fade: "rgba(0, 0, 0, 0.8)",
  },
  modal: {
    background: "#477FAB",
  },
  shadow: {
    primary: "0px 5px 10px rgba(0, 0, 0, 0.25)",
  },
};
