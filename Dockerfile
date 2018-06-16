FROM node:9-alpine
ENV NODE_ENV development

RUN apk update
RUN apk add git

COPY gitconfig /etc/gitconfig
RUN git config --list 

WORKDIR /
RUN git clone https://gitlab.com/wahomekevin/web-starter-default.git app

WORKDIR /app
RUN npm install
RUN npm install -g gulp && npm link gulp

EXPOSE 3000 3001