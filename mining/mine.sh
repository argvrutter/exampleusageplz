# make sure server is running

# read github repos from repo_urls.txt
# for each repo, clone it

for repo in $(cat repo_urls.txt); do
    git clone $repo
    npm install --prefix $repo
    # TODO: open directory with vscode NOTE: don't use on your own install
    #   code --wait $repo

    # clean up
    rm -rf $repo
done