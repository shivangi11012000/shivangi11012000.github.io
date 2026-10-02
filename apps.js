// ============================================================
//  EDIT THIS FILE to update apps, screenshots, store links and profile links.
//  Screenshots live in assets/screens/<app>/ (1.webp, 2.webp, ...).
//  Leave a store link as "" to hide that button.
// ============================================================
const PL = "https://play-lh.googleusercontent.com/";
const shots = (app, n) => Array.from({ length: n }, (_, i) => `assets/screens/${app}/${i + 1}.webp`);

window.APPS = [
  {
    id: "astrolokal",
    name: "AstroLokal",
    tagline: "Talk to an astrologer, live. Audio, video and chat consultations in regional languages.",
    role: "Frontend Pod Lead",
    company: "Lokal",
    period: "Mar 2025 to now",
    description:
      "I architected the app from zero and own frontend delivery end to end: calling, chat, wallet, the expert queue and the iOS launch.",
    facts: [
      { v: "50L+", l: "downloads" },
      { v: ">99.2%", l: "crash-free sessions" },
      { v: "+11%", l: "ARPU from frontend experiments" }
    ],
    built: [
      "Audio/video calling with in-call chat and a persistent call UI over WebSockets",
      "Offers, packages, wallet and in-session recharge flows",
      "Bidirectional user/expert queue that turns a waitlist into a live session",
      "iOS launch with CallKit, VoIP, push, UPI and deep linking"
    ],
    stack: ["React Native", "TypeScript", "Swift", "WebSockets", "CallKit", "Stream", "AppsFlyer"],
    icon: PL + "DC01Xd6oys_Qj4E1OrmcyyFcSw7SeuZXat0hHZBw4osoJ7zUcP-llW2knsXT81HcZrXhaXtcbZJF-pe_Uubcmj4=w160",
    accent: "#FF7A45",
    glow: "rgba(255,122,69,.28)",
    screenshots: shots("astrolokal", 7),
    captions: ["Offer sheet", "Home and experts", "Chat with kundli", "Wallet", "Waitlist joined", "History", "Leave waitlist"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.astrolokal.astrology&hl=en_IN",
      appStore: "https://apps.apple.com/in/app/astrolokal/id6744983158"
    }
  },
  {
    id: "simpliscada",
    name: "Simpliscada",
    tagline: "A SCADA app that takes PLC data to your phone: monitor, analyse, control and get alerts from anywhere.",
    role: "Software Engineer",
    company: "VT Netzwelt",
    period: "Nov 2022 to Mar 2025",
    description:
      "I led the React Native New Architecture migration and rebuilt the navigation stack, then built the web companion alongside the mobile app.",
    facts: [
      { v: "0.68 → 0.72", l: "React Native, New Architecture" },
      { v: "3 levels", l: "nested file manager on web" }
    ],
    built: [
      "Navigation rebuilt for deeply nested, multi-stack routing",
      "State moved from Redux Saga to RTK Query, cutting boilerplate",
      "Bidirectional WebView bridge rendering JSON-driven IoT diagrams with Canvas.js, Chart.js and Hammer.js",
      "React.js companion app with strict CSP, drag-and-drop file manager and report sharing"
    ],
    stack: ["React Native", "React.js", "RTK Query", "Chart.js", "Canvas.js", "Hammer.js", "WebView"],
    icon: PL + "QaCZCvLULDM3J8kVuYSktIhDM1sVzsZ61Z-odptNnE35nTWiqRIcE_g8FsyDHp5YR2UmP_-vXS5Dzj4PiOqL=w160",
    accent: "#3DBE6B",
    glow: "rgba(61,190,107,.24)",
    screenshots: shots("simpliscada", 7),
    captions: ["Cloud sign-in", "Alerts", "Totals chart", "Location access", "Alert history", "Site overview", "Profile"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.simpliscada.app&hl=en_IN",
      appStore: "https://apps.apple.com/in/app/simpliscada/id6444334908"
    }
  }
];

window.EARLIER = [
  {
    name: "Vocabimate",
    text: "Video-led vocabulary learning. Custom React Native bridges to the native iOS AVPlayer give offline playback and usage tracking.",
    meta: "NovoInvent Software, 2021–2022",
    links: { playStore: "", appStore: "" }
  },
  {
    name: "Custom CRM",
    text: "A CRM that tracks customer contacts and each interaction through its lifecycle, built to raise customer lifetime value.",
    meta: "NovoInvent Software, 2021–2022",
    links: { playStore: "", appStore: "" }
  }
];

window.BUGBUBBLE = {
  name: "BugBubble",
  pkg: "@lokal-dev/react-native-bugbubble",
  version: "1.0.2",
  license: "MIT",
  npm: "https://www.npmjs.com/package/@lokal-dev/react-native-bugbubble",
  github: "https://github.com/lokal-app/react-native-bugbubble",
  // Demo recordings from the project README. The page tries the local file first (assets/bugbubble/android.gif and ios.gif),
  // then falls back to GitHub. Download both GIFs from the repo's docs/ folder into assets/bugbubble/ for the most reliable result.
  demos: [
    { label: "Android", local: "assets/bugbubble/android.gif", src: "https://raw.githubusercontent.com/lokal-app/react-native-bugbubble/main/docs/android.gif" },
    { label: "iOS", local: "assets/bugbubble/ios.gif", src: "https://raw.githubusercontent.com/lokal-app/react-native-bugbubble/main/docs/ios.gif" }
  ]
};

window.PROFILE = {
  name: "Shivangi",
  email: "shivangi11012000@gmail.com",
  linkedin: "https://www.linkedin.com/in/shivangi1101",
  medium: "https://medium.com/@shivangi1101",
  github: "",  // TODO: your personal GitHub profile URL
  cv: "assets/Shivangi_Resume2026.pdf"
};
