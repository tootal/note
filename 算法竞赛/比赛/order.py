import os
from json import load, dump
os.chdir(os.path.dirname(__file__))

js = None
with open('_vnote.json', 'r', encoding='utf-8') as f:
    js = load(f)

js['files'].sort(key=lambda x: x['name'], reverse=True)

with open('_vnote.json', 'w', encoding='utf-8') as f:
    dump(js, f, indent=4, ensure_ascii=False)