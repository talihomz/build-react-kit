FROM node:9-alpine
ENV NODE_ENV development

COPY . /tmp/
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
COPY . .

RUN npm install -g gulp && npm link gulp
EXPOSE 3000 3001