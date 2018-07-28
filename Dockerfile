FROM node:9-alpine
LABEL maintainer="Wahome Kevin"
LABEL maintainer_email=wahomekevin@gmail.com

COPY gitconfig /etc/gitconfig

# install node modules
RUN mkdir -p /app
WORKDIR /app
ADD ./* ./tmp/
RUN mv ./tmp/* ./ && yarn install

# clean up
RUN rm -rf ./tmp
RUN rm -rf gitconfig

EXPOSE 3000