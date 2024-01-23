
/** Implementation-specific utilities **/

// TODO

/** Internal functions **/

// Returns an array of search strings for a given day (1-365) and study guide.
// We'll support just the Orthodox Study Bible Yearly Guide for now but... who knows?
function getSearchStringsForDay(day, studyGuide) {
  const csvUrl = './osb_study_guide.csv';

  fetch(csvUrl)
      .then(response => response.text())
      .then(csvText => {
          Papa.parse(csvText, {
              header: true,
              complete: function(results) {
                  console.log("Papaparse");
                  console.log(results.data);
                  // Now you have your data as an array
              }
          });
      })
      .catch(error => console.error('Error fetching the CSV file:', error));  

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
  return searchString;
}

/** User-facing data functions **/

// Returns the proper name for a Bible code in the given locale.
// e.g., {"en", "gen"} -> "Genesis"
function codeToTitle(locale, code) {
  return "TODO";
}

// Returns the full text of daily readings for a given locale, day (1-365), and study guide.
function getDailyReadings(locale, studyGuide, day) {
  searchStrings = getSearchStringsForDay(day, studyGuide);

  const readings = new Array(searchStrings.length);
  for (let i = 0; i < searchStrings.length; i++) {
    readings[i] = getReading(locale, searchStrings[i]);
  }

  return readings;
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

// Returns true if text is a valid day. (1-365)
function isDay(text) {
  let number = Number(text);

  if (!Number.isInteger(number)) {
    return false;
  }
  if (text < 1 || text > 365) {
    return false;
  }

  return true;
}

function generate() {
  let day = document.getElementById('inputText').value;

  let toShow = "";

  if (isDay(day)) {
    let readings = getDailyReadings("en", "osb", day);
    toShow = readings.toString();
  } else {
    toShow = "Invalid day: " + day;
  }

  document.getElementById('outputText').innerText = toShow;
}

window.generate = generate;

console.log("hello");
