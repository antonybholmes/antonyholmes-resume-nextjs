# -*- coding: utf-8 -*-
"""
Created on Fri Jul 31 12:10:51 2020

@author: nt0ny
"""

# Filter for faculty publications


import frontmatter
import os
from bs4 import BeautifulSoup
import urllib
import collections
import json
import time
import re
import numpy as np

max_records = 1000

with open('faculty.json', 'r') as f:
    faculty = json.load(f)
    
people = []

for g in faculty:
    for p in g['peopleList']:
        people.append(p['person'])

print(people)



# for file in os.listdir('../../trash/publications/'):
#     if 'json' in file and 'all' not in file:
#         person = file.replace('.json', '')
#         print(person)
#         with open(os.path.join('../../trash/publications/', file), 'r') as f:
#             pubs = json.load(f)
            
#             for article in pubs:
#                 article['pmid'] = article['pmid']
                
#                 if article['title'] not in all_articles[article['year']][article['month']][article['day']]:
#                     all_articles[article['year']][article['month']][article['day']][article['title']] = article
#                 else:
#                     # merge article tags
#                     all_articles[article['year']][article['month']][article['day']][article['title']]['tags'] = list(sorted(np.union1d(all_articles[article['year']][article['month']][article['day']][article['title']]['tags'], article['tags'])))
        
    
with open('../../tmp/publications/all/all.json', 'r') as f:
    pubs = json.load(f)

all_articles = collections.defaultdict(lambda: collections.defaultdict(lambda: collections.defaultdict(lambda: collections.defaultdict(object))))

c = 0
    
for article in pubs:
    article['pmid'] = article['pmid']
                
    if article['title'] not in all_articles[article['year']][article['month']][article['day']]:
        all_articles[article['year']][article['month']][article['day']][article['title']] = article
    else:
        # merge article tags
        all_articles[article['year']][article['month']][article['day']][article['title']]['tags'] = list(sorted(np.union1d(all_articles[article['year']][article['month']][article['day']][article['title']]['tags'], article['tags'])))
    
    c += 1

all_pubs = []

for year in reversed(sorted(all_articles)):
    for month in reversed(sorted(all_articles[year])):
        for day in reversed(sorted(all_articles[year][month])):
            for title in sorted(all_articles[year][month][day]):
                all_pubs.append(all_articles[year][month][day][title])
        
with open('downloaded-publications.json', 'w') as outfile:
        json.dump(all_pubs, outfile, indent=2)