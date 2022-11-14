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
import boto3
from botocore.exceptions import ClientError
import gzip
import base64

TOP = [15, 25, 50, 100, 200, 500, 1000]

TMP = '../../tmp/publications'
os.makedirs(TMP, exist_ok=True)
#os.makedirs('{}/selected'.format(TMP), exist_ok=True)

data = collections.defaultdict(lambda: collections.defaultdict(list))

for file in os.listdir('publications'):
    name = re.sub(r'\.json', '', file)
    
    with open(os.path.join('publications', file), 'r') as f:
        d = json.load(f)
        
    for p in d['publications']:
        #p['authorList'] = p['authorList']
        p['authors'] = ', '.join(p['authorList'])
        #p['tagList'] = p['tagList']
        #del p['tagList']
        #p['peopleList'] = p['peopleList']
        #del p['peopleList']
        
        
    data[name]['all'] = d['publications']
    data[name]['selected'] = []
    
    #with open(os.path.join('../../static/api/v1/publications', name, 'data.json'), 'w') as outfile:
    #    json.dump(d['publications'], outfile)#, indent=2)

for file in os.listdir('selected-publications'):
    name = re.sub(r'\.json', '', file)
    
    with open(os.path.join('selected-publications', file), 'r') as f:
        d = json.load(f)
        
    for p in d['publications']:
        #p['authorList'] = p['authorList']
        p['authors'] = ', '.join(p['authorList'])
        #p['tagList'] = p['tagList']
        #del p['tagList']
        #p['peopleList'] = p['peopleList']
        #del p['peopleList']
        del p['labs']
        
    data[name]['selected'] = d['publications']

for name in data:
    dir = '{}/{}'.format(TMP, name)
    os.makedirs(dir, exist_ok=True)
    
    out = '{}/all.json.gz'.format(dir, name)
    
    obj = 'api/v6/publications/{}/all.json.gz'.format(name)
    
    with gzip.open(out, 'wt') as outfile:
        json.dump(data[name]['all'], outfile)
        
    s3_client = boto3.client('s3')
    
    try:
        response = s3_client.upload_file(out, 'www-columbia-icg-data', obj, ExtraArgs={'ContentType': 'application/json'})
    except ClientError as e:
        logging.error(e)
        
    out = '{}/all.json.gz.b64'.format(dir, name)
    obj = 'api/v6/publications/{}/all.json.gz.b64'.format(name)
    
    d = data[name]['all']
    d = json.dumps(d)
    d = gzip.compress(d.encode())
    d = base64.b64encode(d)
    
    with open(out, 'wb') as outfile:
        outfile.write(d)
        
    s3_client = boto3.client('s3')
    
    try:
        response = s3_client.upload_file(out, 'www-columbia-icg-data', obj, ExtraArgs={'ContentType': 'application/json'})
    except ClientError as e:
        logging.error(e)
        
        
    # print subsets
    for top in TOP:
        out = f'{dir}/top{top}.json.gz'
    
        obj = f'api/v6/publications/{name}/top{top}.json.gz'
        
        d = data[name]['all'][0:min(top, len(data[name]['all']))]
        
        with gzip.open(out, 'wt') as outfile:
            json.dump(d, outfile)
            
        s3_client = boto3.client('s3')
        
        try:
            response = s3_client.upload_file(out, 'www-columbia-icg-data', obj, ExtraArgs={'ContentType': 'application/json'})
        except ClientError as e:
            logging.error(e)
            
        out = f'{dir}/top{top}.json.gz.b64'
        obj = f'api/v6/publications/{name}/top{top}.json.gz.b64'
        
        d = data[name]['all'][0:min(top, len(data[name]['all']))]
        d = json.dumps(d)
        d = gzip.compress(d.encode())
        d = base64.b64encode(d)
        
        with open(out, 'wb') as outfile:
            outfile.write(d)
            
        s3_client = boto3.client('s3')
        
        try:
            response = s3_client.upload_file(out, 'www-columbia-icg-data', obj, ExtraArgs={'ContentType': 'application/json'})
        except ClientError as e:
            logging.error(e)    
            
        
        
        
    out = '{}/all.json'.format(dir, name)
    
    obj = 'api/v6/publications/{}/all.json'.format(name)
    
    with open(out, 'w') as outfile:
        json.dump(data[name]['all'], outfile)
        
    s3_client = boto3.client('s3')
    
    try:
        response = s3_client.upload_file(out, 'www-columbia-icg-data', obj, ExtraArgs={'ContentType': 'application/json'})
    except ClientError as e:
        logging.error(e)    
        
        
    #dir = '{}/selected'.format(TMP, name)
    #os.makedirs(dir, exist_ok=True)
    out = f'{dir}/selected.json.gz'
    
    obj = f'api/v6/publications/{name}/selected.json.gz'
    
    with gzip.open(out, 'wt') as outfile:
        json.dump(data[name]['selected'], outfile)#, indent=2)
    
    try:
        response = s3_client.upload_file(out, 'www-columbia-icg-data', obj, ExtraArgs={'ContentType': 'application/json'})
    except ClientError as e:
        logging.error(e)
        
    
    out = f'{dir}/selected.json.gz.b64'
    obj = f'api/v6/publications/{name}/selected.json.gz.b64'
    
    d = data[name]['selected']
    d = json.dumps(d)
    d = gzip.compress(d.encode())
    d = base64.b64encode(d)
    
    with open(out, 'wb') as outfile:
        outfile.write(d)
        
    try:
        response = s3_client.upload_file(out, 'www-columbia-icg-data', obj, ExtraArgs={'ContentType': 'application/json'})
    except ClientError as e:
        logging.error(e)    
        
    out = '{}/selected.json'.format(dir, name)
    
    obj = 'api/v6/publications/{}/selected.json'.format(name)
    
    with open(out, 'w') as outfile:
        json.dump(data[name]['selected'], outfile)#, indent=2)
    
    try:
        response = s3_client.upload_file(out, 'www-columbia-icg-data', obj, ExtraArgs={'ContentType': 'application/json'})
    except ClientError as e:
        logging.error(e)