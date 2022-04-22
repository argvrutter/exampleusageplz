# make sure you're in the same fodler as this when you run it
# clones a repo, moves all .ts files to tsfiles folder, repeat
import os

#print(os.getcwd())
os.system("mkdir tsfiles")

with open ("repo_urls.txt", "r") as f:
    for url in f.readlines():
        i = 0
        reponame = url.split("/")[-1].strip()
        os.system("git clone " + url)
        # extract all .ts files from cloned repo
        os.system("find . -name '*.ts' > tsfiles.txt")
        with open("tsfiles.txt", "r") as f:
            filenames = f.readlines()
            #print(filenames)

        # move all .ts files to a new folder
        for filename in filenames:
            if '$shared' in filename:
                continue
            filename = filename.rstrip('\n')
            #print(filename)

            if ' ' in filename:
                filename = filename.replace(' ', '\ ')

            print(filename)
            os.system("mv " + filename + " tsfiles/"+ reponame + '-' + str(i))
            i+=1

        # delete cloned repo
        os.system("rm -rf "+ reponame)
os.system("rm tsfiles.txt")
f.close()
