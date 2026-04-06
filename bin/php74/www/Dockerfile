FROM php:7.4.30-apache-buster as build1

# Surpresses debconf complaints of trying to install apt packages interactively
# https://github.com/moby/moby/issues/4032#issuecomment-192327844

ARG DEBIAN_FRONTEND=noninteractive

# Update
RUN \
rm /etc/apt/sources.list && \
  echo 'deb http://archive.debian.org/debian buster main contrib non-free'  >> /etc/apt/sources.list && \
           echo 'deb http://archive.debian.org/debian buster-updates main contrib non-free'  >> /etc/apt/sources.list && \
           echo 'deb http://archive.debian.org/debian-security buster/updates main contrib non-free'  >> /etc/apt/sources.list && \
    apt-get -y update --fix-missing && \
    apt-get upgrade -y && \
    apt-get --no-install-recommends install -y apt-utils && \
    rm -rf /var/lib/apt/lists/*


# Install useful tools and install important libaries
RUN apt-get -y update && \
    apt-get -y --no-install-recommends install nano wget \
dialog \
libsqlite3-dev \
libsqlite3-0 && \
    apt-get -y --no-install-recommends install default-mysql-client \
zlib1g-dev \
libzip-dev \
libicu-dev && \
    apt-get -y --no-install-recommends install --fix-missing apt-utils \
build-essential \
git \
curl \
libonig-dev && \
    apt-get -y --no-install-recommends install --fix-missing libcurl4 \
libcurl4-openssl-dev \
zip \
openssl && \
    rm -rf /var/lib/apt/lists/* && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install xdebug
RUN pecl install xdebug-2.8.0 && \
    docker-php-ext-enable xdebug

# Install redis
RUN pecl install redis-5.1.1 && \
    docker-php-ext-enable redis

# Install imagick
RUN apt-get update && \
    apt-get -y --no-install-recommends install --fix-missing libmagickwand-dev && \
    rm -rf /var/lib/apt/lists/* && \
    pecl install imagick && \
    docker-php-ext-enable imagick

# Other PHP7 Extensions

RUN docker-php-ext-install pdo_mysql && \
    docker-php-ext-install pdo_sqlite && \
    docker-php-ext-install mysqli && \
    docker-php-ext-install curl && \
    docker-php-ext-install tokenizer && \
    docker-php-ext-install json && \
    docker-php-ext-install zip && \
    docker-php-ext-install -j$(nproc) intl && \
    docker-php-ext-install mbstring && \
    docker-php-ext-install gettext && \
    docker-php-ext-install exif


# Install Freetype
RUN apt-get -y update && \
    apt-get --no-install-recommends install -y libfreetype6-dev \
libjpeg62-turbo-dev \
libpng-dev && \
    rm -rf /var/lib/apt/lists/* && \
    docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd

# Enable apache modules
RUN a2enmod rewrite headers

RUN apt-get update -y && apt-get install imagemagick -y


RUN rm -rf /var/lib/apt/lists/ && curl -sL https://deb.nodesource.com/setup_22.x | bash
RUN apt-get install nodejs -y


#ENV APP_ROOT /var/www/html/nuxt

#WORKDIR /home/zoya/aka-lamer-localhost-5c59b39fc75f/aka-lamer-localhost-5c59b39fc75f/bin/php74/www/nuxt

#WORKDIR /var/www/html/nuxt
#WORKDIR /var/www/html/nuxt
#WORKDIR .
#COPY ${APP_ROOT}/package.json ./
#FROM node:16-alpine as builder
#COPY /bin/php74/www/nuxt/ /var/www/html/
#COPY  package.json /var/www/html/nuxt/package.json
#RUN rm -rf ./node_modules
#ADD . /var/www/html
#ADD
#RUN rm -rf /var/www/html/nuxt/node_modules
#RUN cd ../../nuxt
#RUN npm install
#RUN chown -R 1000:1000 /var/www/html/nuxt
COPY . /var/www/html
#ENV npm_config_cache /home/zoya/.npm
WORKDIR /var/www/html
EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
#RUN npm install
#CMD [ "npm", "run", "dev" ]
#CMD node .output/server/index.mjs


RUN npm install node-cron -y

# Cleanup
RUN rm -rf /usr/src/*


