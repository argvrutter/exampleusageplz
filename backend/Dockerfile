FROM python:3.8

LABEL MAINTAINER="Aiden Rutter <argvrutter@gmail.com>"

# debug for now
ENV FLASK_APP=app.py \
    FLASK_ENV=development \
    FLASK_DEBUG=1 \
    GROUP_ID=1000 \
    USER_ID=1000

RUN addgroup --gid $GROUP_ID www
RUN adduser --system --uid $USER_ID --gid $GROUP_ID --shell /bin/sh www

RUN mkdir -p /eup
WORKDIR /eup

COPY requirements.txt /eup/
RUN pip install -r requirements.txt

ADD backend/ /eup/www

USER www
EXPOSE 5000
CMD ["flask", "run"]
