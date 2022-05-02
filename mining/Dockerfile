FROM ubuntu:20.04

LABEL MAINTAINER="Aiden Rutter <argvrutter@gmail.com>"

RUN useradd -ms /bin/bash eupminer

# set env for tzdata
ENV TZ=America/New_York
ARG DEBIAN_FRONTEND=noninteractive

# apt install code
RUN apt-get update && apt-get install -y libasound2\
    gnupg2 software-properties-common apt-transport-https wget npm git && \
    wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | apt-key add - \
    && add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" \
    && apt update && apt install -y code

# user and group
USER eupminer
WORKDIR /home/eupminer

# copy the .vsix file, mine.sh, and repo_urls.txt to the container
COPY exampleusageplz-0.0.1.vsix mine.sh repo_urls.txt /home/eupminer/

# install .vsix extension
RUN code --install-extension exampleusageplz-0.0.1.vsix

# run the script
# CMD ["./mine.sh"]
CMD ["bash"]
