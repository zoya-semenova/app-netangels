FROM node:16.0.0

ARG DEBIAN_FRONTEND=noninteractive


RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN \
rm /etc/apt/sources.list && \
  echo 'deb http://archive.debian.org/debian buster main contrib non-free'  >> /etc/apt/sources.list && \
           echo 'deb http://archive.debian.org/debian buster-updates main contrib non-free'  >> /etc/apt/sources.list && \
           echo 'deb http://archive.debian.org/debian-security buster/updates main contrib non-free'  >> /etc/apt/sources.list && \
    apt-get -y update && \
     apt-get install nodejs -y


