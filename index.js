import { osb_study_guide, bible_en, bible_titles_en } from './data.js';

/** Utilities **/

// Converts a dictionary to string.
function dictionaryToString(dict) {
  let toReturn = "";
  for (const [key, value] of Object.entries(dict)) {
     toReturn += `${key}: ${JSON.stringify(value)} \n`;
  }
  return toReturn;
}

// Function to extract a query parameter from the URL
// format: ?myParam=value
function getQueryParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

/** Internal functions **/

// Returns an array of search strings for a given day (1-365) and study guide.
// We'll support just the Orthodox Study Bible Yearly Guide for now but... who knows?
function getSearchStringsForDay(day, studyGuide) {

  // e.g. "5,gen 16-18,psa 7,pro 1:20-24,mat 5:1-20,",
  let rawSearchString = osb_study_guide[day-1];

  console.log("raw search string : " + rawSearchString);

  let splitted = rawSearchString.split(',');

  // temp looks like: [1, gen 16-18, psa 7, pro 1:20-24, mat 5:1-20, ""]
  let temp = splitted;

  let toReturn = [];

  for (let i = 0; i < temp.length; i++) {
    let bookCodesCount = getBookCodes(temp[i]).length;

    // e.g. "psa 7"
    if (bookCodesCount == 1) {
      toReturn.push(temp[i]);
      continue;
    }

    // e.g. "dan 11:29; bel 42"
    if (bookCodesCount > 1) {
      let splitBySemicolon = temp[i].split("; ");

      for (let j = 0; j < splitBySemicolon.length; j++) {
        toReturn.push(splitBySemicolon[j]);
      }

      continue;
    }
  }

  return toReturn;
}

// Gets the verses of a chapter from start to end.
// The range is INCLUSIVE! of both start and end.
function getVersesFromStartAndEnd(locale, book, chapter, verseStart, verseEnd) {
  let chapterDict = bible_en[book][chapter];
  let toReturn = {};

  for (const [key, value] of Object.entries(chapterDict)) {
    if (Number(key) >= verseStart && Number(key) <= verseEnd) {
      toReturn[key] = value;
    }
  }

  return dictionaryToString(toReturn);
}

// Gets the verse of a chapter from start to the end of that chapter.
// Chapters start at "1", so you can get the whole chapter that way too.
function getVersesFromStart(locale, book, chapter, verseStart) {
  let chapterDict = bible_en[book][chapter];
  let toReturn = {};

  for (const [key, value] of Object.entries(chapterDict)) {
    if (Number(key) >= verseStart) {
      toReturn[key] = value;
    }
  }

  return dictionaryToString(toReturn);
}

function getFullChaptersFromStartAndEnd(locale, book, chapterStart, chapterEnd) {
  let bookDict = bible_en[book];
  let toReturn = "";

  for (const [key, value] of Object.entries(chapterDict)) {
    if (Number(key) >= verseStart) {
      toReturn[key] = value;
    }
  }

  return toReturn;
}

function getFullChapter(locale, book, chapter) {
  return dictionaryToString(bible_en[book][chapter]);
}

// Returns true if it contains a book code.
function containsBookCode(searchString) {
  if (searchString.length < 3) {
    return false;
  }

  // Regular expression to test if the first three characters are alphabetical
  const regex = /^[A-Za-z]{3}/;
  return regex.test(searchString);
}

// Given a string like dan 5; bel 3, or just job 3, returns
// the book codes in an array. Can be empty, 1, or 2 sized.
function getBookCodes(searchString) {
  let splitted = searchString.split('; ');

  let toReturn = [];

  for (let i = 0; i < splitted.length; i++) {
    if (containsBookCode(splitted[i])) {
      toReturn.push(splitted[i].substring(3));
    }
  }

  return toReturn;
}

// Returns the text of a full book in the Bible. e.g. "joh"
function getFullBook(locale, book) {
  let toReturn = "";

  let dict = bible_en[book];

  for (const [key, value] of Object.entries(dict)) {
    toReturn += getFullChapter(locale, book, key);
  }

  return toReturn;
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
// pro 31:26-30
function getReading(locale, searchString) {
  let book = searchString.slice(0, 3);

  console.log("book = " + book);

  // When the assignment is just a book, we print that whole book., e.g. day 292
  if (searchString.length <= 4) {
    toShow += humanReadableAssignment(locale, [searchString]) + "\n";  

    return getFullBook(locale, book);
  }

  let semicolonSplitted = searchString.split("; "); // split by semicolon
  
  let spaceSplitted = semicolonSplitted[0].split(" ");

  let pageRange = spaceSplitted[1]; // The pageRange (e.g. 24:50-26:35) is the first string after the space.

  let firstPage = pageRange.split("-")[0]; // e.g. 24:50

  let firstChapter = firstPage.split(":")[0]; // e.g. 24

  console.log("showing chapter: " + firstChapter);

  let toShow = "";

  toShow += humanReadableAssignment(locale, [searchString]) + "\n";  
  toShow += getFullChapter(locale, book, firstChapter);

  return toShow;
}


/** User-facing data functions **/

// Returns the proper name for a Bible code in the given locale.
// e.g., {"en", "gen"} -> "Genesis"
function codeToTitle(locale, code) {
  return bible_titles_en[code];
}

// Convert the search string into something pleasant for humans to read.
function humanReadableAssignment(locale, searchStrings) {
  let toReturn = "";

  for (let i = 0; i < searchStrings.length; i++) {
    let book = searchStrings[i].substring(0, 3);

    toReturn += bible_titles_en[book] + " " + searchStrings[i].substring(4);

    // Add a comma if it's not the last element
    if (i!= searchStrings.length - 1) { toReturn += ", " };
  }  

  console.log("human readable assignment = " + toReturn);

  return toReturn;
}

// Returns the full text of daily readings for a given locale, day (1-365), and study guide.
function getDailyReadings(locale, studyGuide, day) {
  let searchStrings = getSearchStringsForDay(day, studyGuide);

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

// Converts the readings array into something viewable by the user.
function readingsRenderableString(readings) {
  let toShow = "";

  for (let i = 0; i < readings.length; i++) {
    toShow += readings[i] + "\n";
  }

  return toShow;
}

// Render the current page for the current day.
function generateForDay(locale, day) {
  let toShow = "";

  // Exit early on invalid input.
  if (!isDay(day)) {
     toShow = "Invalid day: " + day;
     document.getElementById('outputText').innerText = toShow;
     return;
  }

  let readings = getDailyReadings("en", "osb", day);
  let assignment = getSearchStringsForDay(day, "osb");

  let headerText = "Day " + day + ": " + humanReadableAssignment("en", assignment);

  // Render header
  document.getElementById('readingHeader').innerText = headerText;

  toShow += readingsRenderableString(readings);

  // Render main textbox
  document.getElementById('outputText').innerText = toShow;

  // Update URL of the current page
  const stateObj = {};
  history.replaceState(stateObj, "Daily Bible", "?day=" + day);

  // Update input text box
  document.getElementById('inputText').innerText = day;
}

// Click the submit button.
function clickSubmit() {
  let day = document.getElementById('inputText').value;

  if (day != null && day != " " && day != "") {
    generateForDay("en", day);
  }
}

// Export the function.
window.clickSubmit = clickSubmit;

console.log("hello");

// Check if the user already specified a day in the url.
function checkAndGenerateDayFromURL() {
  // Extract a specific parameter from the URL
  const myDay = getQueryParam('day');

  if (myDay !== null) {
    console.log("check day parameter:", myDay);
    generateForDay("en", myDay);
  }
}

// Export the function.
window.checkAndGenerateDayFromURL = checkAndGenerateDayFromURL;

// Click the next button.
function clickNext() {
  // Extract a specific parameter from the URL
  const myDay = getQueryParam('day');

  // Return 1st day if there's null input on "next" button press.
  if (myDay == null) {
    generateForDay("en", 1);
    return;
  }

  // Exit early on invalid input.
  if (!isDay(myDay)) {
    toShow = "Invalid day: " + day;
    document.getElementById('outputText').innerText = toShow;
    return;
  }
  
  console.log("click next. day parameter:", myDay);
  generateForDay("en", Number(myDay) + 1);
}

// Export the function.
window.clickNext = clickNext;
