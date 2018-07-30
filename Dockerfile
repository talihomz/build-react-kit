FROM node:9-alpine
LABEL maintainer="Wahome Kevin"
LABEL maintainer_email=wahomekevin@gmail.com

# setup
COPY gitconfig /etc/gitconfig
ENV APP_PATH /app

# install node modules
RUN mkdir -p $APP_PATH
WORKDIR $APP_PATH
ADD ./* ./tmp/
RUN mv ./tmp/* ./ && yarn install

# clean up
RUN rm -rf ./tmp
RUN rm -rf gitconfig

EXPOSE 3000