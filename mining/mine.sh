#!/bin/bash
# make sure server is running

# read github repos from repo_urls.txt
# for each repo, clone it
process_string="code"

for repo in $(cat repo_urls.txt); do
   git clone $repo
   # get the repo name from the url
   repo_name=$(echo $repo | cut -d'/' -f5)
   echo "Processing $repo_name"
   # break

   # check if package.json exists in repo dir
   if [ -f "$repo_name/package.json" ]; then
      # if package.json exists, run npm install
      cd $repo_name
      npm install
      code .
      # sleep for 5 seconds
      cd ..
      sleep 5
   fi
   rm -rf $repo_name

done