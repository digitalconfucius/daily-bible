#!/usr/bin/env python3

# Usage: 
# cd daily-bible/raw_data
# python3 bible_parser.py > output.txt

bible_dict = {}

def process_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            for line in file:
                # Splitting each line by '|'
                split_line = line.strip().split('|')

                book = split_line[0].lower() # to lowercase
                chapter = split_line[1]
                verse = split_line[2]
                content = split_line[3]

                if book not in bible_dict:
                    bible_dict[book] = {}

                if chapter not in bible_dict[book]:
                    bible_dict[book][chapter] = {}

                if verse not in bible_dict[book][chapter]:
                    bible_dict[book][chapter][verse] = ""

                bible_dict[book][chapter][verse] = content

    except FileNotFoundError:
        print(f"File not found: {file_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

file_path = "bible_en.txt"
process_file(file_path)

def print_as_javascript_dict(py_dict):
    """
    Converts a Python dictionary into a JavaScript object and prints it.
    """
    js_dict_lines = ["{"]
    for key, value in py_dict.items():
        # Assuming the keys are strings and the values can be of any data type that's valid in both Python and JavaScript
        if isinstance(value, str):
            js_line = f'  "{key}": "{value}",'
        else:
            js_line = f'  "{key}": {value},'
        js_dict_lines.append(js_line)
    js_dict_lines.append("}")

    js_dict_string = "\n".join(js_dict_lines)
    print(js_dict_string)

print_as_javascript_dict(bible_dict)
