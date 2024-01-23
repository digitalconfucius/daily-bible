
/** Implementation-specific utilities **/

// TODO

/** Internal functions **/

// Returns an array of search strings for a given day (1-365) and study guide.
// We'll support just the Orthodox Study Bible Yearly Guide for now but... who knows?
function getSearchStringsForDay(day, studyGuide) {
  return ["TODO"];
}

// Returns the full text of a reading given a locale and search string.
// The search string consists of:
//    three-letter bible code (required)
//    chapter number
//    colon, indicating separation between chapter and verse
//    verse number
//    hyphen, indicating "continuous"
//    semicolon, indicating "additionally but not continuously"
// 
// Chapter and verse numbers are 1-indexed. 
// "a-b" is inclusive of both a and b.
//
// Examples of valid search strings:
// gen 1-3
// gen 24:50-26:35
// mar 16
// oba
// sus 1; dan 1
// dan 11:29; bel 42
// job 36; 37
function getReading(locale, searchString) {
  return "TODO";
}

/** User-facing data functions **/

// Returns the proper name for a Bible code in the given locale.
// e.g., {en, gen} -> "Genesis"
function codeToTitle(locale, code) {
  return "TODO";
}

// Returns the full text of the Old Testament reading for a given day (1-365) and locale.
function dailyOT(locale, day) {
  return "TODO";
}

// Returns the full text of the Psalm for a given day (1-365) and locale.
function dailyPsalm(locale, day) {
  return "TODO";
}

// Returns the full text of the Proverbs reading for a given day (1-365) and locale.
function dailyProverb(locale, day) {
  return "TODO";
}

// Returns the full text of the New Testament reading for a given day (1-365) and locale.
function dailyNT(locale, day) {
  return "TODO";
}

/** UX/UI functions **/

// Grab the day (1-365).
function fetchDay() {
  return 1;
}

// Fetch locale. English only for now.
function fetchLocale() {
  return "en";
}

function generate() {
  let text = document.getElementById('inputText').value;
  let toShow = "Hello, " + text;
  document.getElementById('outputText').innerText = toShow;
}

window.generate = generate;

console.log("hello");
