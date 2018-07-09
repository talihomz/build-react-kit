FROM node:9-alpine
MAINTAINER Wahome Kevin <wahomekevin@gmail.com>
COPY gitconfig /etc/gitconfig

RUN apk add --update \
    curl wget bash git

# Install Ruby
#     ruby \
#     ruby-dev \
#     ruby-bundler \
#     libffi-dev \
#     build-base
#
# COPY Gemfile .
# RUN bundle install
WORKDIR /
ENV NODE_ENV development

WORKDIR /app

RUN git config --list 
ADD package.json temp-package.json
RUN mv temp-package.json package.json && npm install
RUN npm install -g gulp && npm link gulp

ADD gulpfile.js .
COPY build.sh .
COPY install.sh .

EXPOSE 3000 3001