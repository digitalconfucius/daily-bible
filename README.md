![logo](bible_logo.png)

# daily-bible
This website helps you read the Bible in a year according to the [Orthodox Study Bible](https://en.wikipedia.org/wiki/Orthodox_Study_Bible) yearly planner.

See the live webpage here: https://digitalconfucius.github.io/daily-bible/

![image](https://github.com/digitalconfucius/daily-bible/assets/156959605/aa76eba9-1a05-48a5-a63b-d8811871338b)

# Process
1) Convert OSB Study guide from [PDF](https://github.com/digitalconfucius/daily-bible/blob/main/raw_data/osb_study_guide.pdf) to [CSV](https://github.com/digitalconfucius/daily-bible/blob/main/raw_data/osb_study_guide.csv).
2) Clean up lots of dirty data, weird symbols, strange spacing, and missing entries from conversion process.
3) Download raw Bible data from the [sacred-texts Bible repository](https://sacred-texts.com/bib/osrc/index.htm).
4) Convert the OSB study guide from its own abbreviation style to the sacred-text style.
5) Update abbreviations to match Orthodox style.
6) Augment KJV Bible with Psalm 151.
7) Merge Bible and Apocrypha together.
8) [Parse Bible](https://github.com/digitalconfucius/daily-bible/blob/main/raw_data/bible_parser.py) into JavaScript dictionary format.
9) Given a user-specified day, extract the OSB study plan for that day.
10) Augment study plan into user-readable English.
11) Extract corresponding Bible chapters for that study plan.
12) Extract verses from the assignments
13) Handle chapter/verse ranges.
14) Handle edge cases with separate books in a single reading.
15) Handle differences between Vulgate and Septuagint psalm numbering [(1)](http://www.churchofthenativity.net/church-of-the-nativity/orthodoxy/faqs/why-are-your-psalms-numbered-differently-than-in-all-non-orthodox-bibles) [(2)](https://www.oca.org/liturgics/outlines/septuagint-numbering-psalms)

# Technical information
This is a self-contained static web app with zero backend. We made this decision for speed and ease of hosting on Github Pages. One tradeoff is that all the local data needs to be loaded into memory, including the full text of the Bible. Modern web browsers should be able to handle it well. You could conceivably download this app and use it to read the full Bible in a year without any internet access.

The core business logic is contained in [index.js](index.js).

The main English text is the King James Bible with "Apocrypha", which is in the public domain. Additionally, we source Psalm 151 from the NSRV: http://bible.oremus.org/?ql=364191858.

# Resources
Bible Data Project (KJV): https://sacred-texts.com/bib/osrc/index.htm

Orthodox Study Bible, Yearly Reading List ([PDF](https://github.com/digitalconfucius/daily-bible/blob/main/raw_data/osb_study_guide.pdf)). [CSV version](https://github.com/digitalconfucius/daily-bible/blob/main/raw_data/osb_study_guide.csv) by me.
