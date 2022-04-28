# make sure server is running

# read github repos from repo_urls.txt
# for each repo, clone it
process_string="code"

for repo in $(cat repo_urls.txt); do
    git clone $repo
    sleep 3
    npm install --prefix $repo
    # TODO: open directory with vscode NOTE: don't use on your own install
    #   code --wait $repo
    while ! pgrep -f "$process_string"
    do
       echo "Waiting for $process_string"
       sleep 3
    done

    while pgrep -f "$process_string"
    do
       echo "Waiting for $process_string to exit"
       sleep 3
    done

    echo "Process $process_string exited"
    

    # clean up
    rm -rf $repo
done