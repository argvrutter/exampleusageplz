FROM ubuntu:20.04

LABEL MAINTAINER="Aiden Rutter <argvrutter@gmail.com>"

WORKDIR /eup/mining

# apt install code
RUN apt update
RUN apt install gnupg2 software-properties-common apt-transport-https wget
RUN wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
RUN apt update
RUN apt install code

# copy the .vsix file, mine.sh, and repo_urls.txt to the container
COPY exampleusageplz-0.0.1.vsix /eup/mining/
COPY mine.sh /eup/mining/
COPY repo_urls.txt /eup/mining/

# run the script
CMD ["mine.sh"]
