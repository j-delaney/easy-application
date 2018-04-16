FROM alpine:latest
MAINTAINER Jayce Gregg <jaycegregg0@gmail.com>

#
# To start a webserver for viewing the HTML version of this project run this:
# cd /src && while true ; do nc -l 80 < index.html ; done
#

RUN apk add ruby2.2 \
            ruby2.2-json --no-cache \
 && rm -rf /var/cache/apk/* \
 && gem2.2 install awesome_bot --no-ri --no-rdoc

COPY . /src
WORKDIR /src

CMD ["awesome_bot", "README.md", "--allow-dupe", "--allow-redirect", \
     "--allow-ssl", "--allow-timeout", "--allow", "999,403,405,500"]
