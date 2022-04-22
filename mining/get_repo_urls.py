import requests
import time
import json
from lxml import html

s = "https://github.com/search?l=TypeScript&q=vscode&type=Repositories&p="
user_agent = {'User-agent': 'Mozilla/5.0'}

repo_urls = []
for i in range(1,150):

    r = requests.get(s + str(i), headers=user_agent)
    print(r.status_code)
    if r.status_code == 429:
        time.sleep(20)
    if r.status_code == 404:
        break

    #parse repo url from html repsonse
    tree = html.fromstring(r.content)
    urls = tree.xpath('//a[@class="v-align-middle"]/@href')
    for url in urls:
        print(url)
        if url not in repo_urls:
            repo_urls.append('https://github.com' + url)
    time.sleep(5)


with open ("repo_urls.txt", "w") as f:
    for url in repo_urls:
        f.write(url + "\n")
f.close()