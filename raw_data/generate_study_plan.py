#!/usr/bin/env python3

# Usage: 
# cd daily-bible/raw_data
# python3 generate_study_plan.py

import csv
from html import escape

def load_bible_map(file_path):
    bible_map = {}
    with open(file_path, 'r') as f:
        for line in f:
            parts = line.strip().split(',')
            if len(parts) >= 2:
                full_name = parts[0].strip()
                abbrev = parts[1].strip()
                bible_map[abbrev] = full_name
    return bible_map

def generate_html_table(csv_file, bible_map):
    html = '''
    <table>
        <thead>
            <tr>
                <th>Day</th>
                <th>Old Testament</th>
                <th>Psalms</th>
                <th>Proverbs</th>
                <th>New Testament</th>
            </tr>
        </thead>
        <tbody>
    '''

    with open(csv_file, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            html += '<tr>\n'
            html += f'    <td>{row["Day"]}</td>\n'
            
            for column in ['Old Testament', 'Psalms', 'Proverbs', 'New Testament']:
                cell = row[column]
                parts = cell.split()
                book_abbrev = parts[0]
                book_name = bible_map.get(book_abbrev, book_abbrev)
                reading = ' '.join(parts[1:])
                html += f'    <td><span class="book">{escape(book_name)}</span> {escape(reading)}</td>\n'
            
            html += '</tr>\n'

    html += '''
        </tbody>
    </table>
    '''
    return html

def main():
    bible_map = load_bible_map('bible_map.txt')
    table_html = generate_html_table('osb_study_guide.csv', bible_map)
    
    with open('study_plan_template.html', 'r') as f:
        template = f.read()
    
    full_html = template.replace('<!-- TABLE_PLACEHOLDER -->', table_html)
    
    with open('orthodox_study_plan.html', 'w') as f:
        f.write(full_html)

if __name__ == "__main__":
    main()