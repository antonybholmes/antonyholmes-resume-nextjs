# -*- coding: utf-8 -*-
"""
Created on Fri Jul 31 12:10:51 2020

@author: nt0ny
"""


import frontmatter
import os
from bs4 import BeautifulSoup
import urllib
import collections
import json
import time
import re
import numpy as np


dir = 'people'

people = []

name_map = {}
faculty_map = {}

for file in os.listdir(dir):
    if '.md' not in file:
        continue
    
    post = frontmatter.load(os.path.join(dir, file))
    
    search = []
    
    for t in post['tagList']:
        if 'alt-pubmed-author' in t:
            search = t.replace('alt-pubmed-author::', '').split(' ')
            break
    
    firstName = post['firstName'].split(' ')[0]
    people.append({'name':[firstName, post['lastName']], 'search':search, 'id':post['id']})
    name_map['{} {}'.format(firstName, post['lastName']).lower()] = post['id']
    name_map['{} {}'.format(firstName[0], post['lastName']).lower()] = post['id']
    
    if len(search) > 0:
        name_map['{} {}'.format(search[0], search[1]).lower()] = post['id']
        name_map['{} {}'.format(search[0][0], search[1]).lower()] = post['id']
    
    is_faculty = False
    
    for title in post['titles']:
        if 'Prof' in title:
            is_faculty = True
            break
    
    if is_faculty:
        faculty_map['{} {}'.format(firstName, post['lastName']).lower()] = post['id']
        faculty_map['{} {}'.format(firstName[0], post['lastName']).lower()] = post['id']
        
        if len(search) > 0:
            faculty_map['{} {}'.format(search[0], search[1]).lower()] = post['id']
            faculty_map['{} {}'.format(search[0][0], search[1]).lower()] = post['id']
            
            

pubmap = collections.defaultdict(lambda: collections.defaultdict(lambda: collections.defaultdict(lambda: collections.defaultdict())))

sel_pubmap = collections.defaultdict(lambda: collections.defaultdict(lambda: collections.defaultdict(lambda: collections.defaultdict())))


with open('downloaded-publications.json', 'r') as f:
    publications = json.load(f)

used = set()

for pub in publications:
    if (pub['pmid'] not in used):
        used.add(pub['pmid'])
        pubmap[pub['year']][pub['month']][pub['day']][pub['title']] = pub

for file in os.listdir('faculty'):
    if 'selected-publications.json' in file:
        print(file)
        
        person = file.replace('-selected-publications.json', '')
        
        with open(os.path.join('faculty', file), 'r') as f:
            selectedpublications = json.load(f)
        
        file2 = os.path.join('faculty', '{}-additional-publications.json'.format(person))
        
        if os.path.exists(file2):
            print(file2)
            with open(file2, 'r') as f:
                additionalpublications = json.load(f)
                
            for pub in additionalpublications:
                pub['tagList'].append('additional')
            
            selectedpublications.extend(additionalpublications)
        
        # copy to api    
        # os.makedirs('../../static/api/v1/publications/{}/selected'.format(person), exist_ok=True) 
        # with open('../../static/api/v1/publications/{}/selected/data.json'.format(person), 'w') as outfile:
        #     json.dump(selectedpublications, outfile)
        
        for pub in selectedpublications:
            if 'article' not in pub['tagList']:
                pub['tagList'].append('article')
            
            if 'selected' not in pub['tagList']:
                pub['tagList'].append('selected')
                
            if 'selected::{}'.format(person) not in pub['tagList']:
                pub['tagList'].append('selected::{}'.format(person))
            
            if 'Article' in pub['tagList']:
                pub['tagList'].remove('Article')
                
            if 'doi' not in pub:
                pub['doi'] = ''
                
            if 'isbn' not in pub:
                pub['isbn'] = ''
                
            pub['authors'] = ', '.join(pub['authorList'])
            
        pubs = {'person':person, 'publications':selectedpublications}
    
        with open('selected-publications/{}.json'.format(person), 'w') as outfile:
            json.dump(pubs, outfile, indent=2)
            
        for pub in selectedpublications:
            sel_pubmap[pub['year']][pub['month']][pub['day']][pub['title']] = pub
            
            if pub['title'] not in pubmap[pub['year']][pub['month']][pub['day']]:
                pubmap[pub['year']][pub['month']][pub['day']][pub['title']] = pub
            else:
                # merge article tags
                pubmap[pub['year']][pub['month']][pub['day']][pub['title']]['tagList'] = list(sorted(np.union1d(pubmap[pub['year']][pub['month']][pub['day']][pub['title']]['tagList'], pub['tagList'])))
        
            # if (pub['pmid'] not in used):
            #     used.add(pub['pmid'])
            #     pubmap[pub['year']][pub['month']][pub['day']][pub['title']] = pub
                
            # else:
            #     print('used', pub['pmid'])





ret = []

for year in reversed(sorted(pubmap)):
    for month in reversed(sorted(pubmap[year])):
        for day in reversed(sorted(pubmap[year][month])):
            for title in sorted(pubmap[year][month][day]):
                ret.append(pubmap[year][month][day][title])
                
for pub in ret:
    if 'Article' in pub['tagList']:
        pub['tagList'].remove('Article')
        
    if 'doi' not in pub:
        pub['doi'] = ''
    
    if 'isbn' not in pub:
        pub['isbn'] = ''
    
    institute_pub = False
    
    print(pub['title'], pub['authorList'])
    
    author = pub['authorList'][-1]
    
    if not re.match(r' +', author):
        firstName = author.lower().split(' ')[-1]
        firstName = firstName[0]
        lastName = ' '.join(author.lower().split(' ')[0:-1])
        name = '{} {}'.format(firstName, lastName)
        institute_pub = name in faculty_map
    
    if not institute_pub:
        author = pub['authorList'][0]
        
        if not re.match(r' +', author):
            firstName = author.lower().split(' ')[-1]
            firstName = firstName[0]
            lastName = ' '.join(author.lower().split(' ')[0:-1])
            name = '{} {}'.format(firstName, lastName)
            institute_pub = name in faculty_map
        
    if institute_pub:
        pub['tagList'].append('first-author')


pubs = {'person':'all', 'publications':ret} 
with open('publications/all.json', 'w') as outfile:
    json.dump(pubs, outfile, indent=2)
    
# pubs for all people
pub_map = collections.defaultdict(list)

for pub in ret:
    for person in pub['peopleList']:
        if 'powers' in person:
            print(person, pub['title'])
        pub_map[person].append(pub)
        

for person in pub_map:
    pubs = {'person':person, 'publications':pub_map[person]}
    
    with open('publications/{}.json'.format(person), 'w') as outfile:
        json.dump(pubs, outfile, indent=2)


ret2 = []

for year in reversed(sorted(sel_pubmap)):
    for month in reversed(sorted(sel_pubmap[year])):
        for day in reversed(sorted(sel_pubmap[year][month])):
            for title in sorted(sel_pubmap[year][month][day]):
                ret2.append(sel_pubmap[year][month][day][title])


pubs = {'person':'all', 'publications':ret2}    
with open('selected-publications/all.json', 'w') as outfile:
    json.dump(pubs, outfile) #, indent=2)
    
    
