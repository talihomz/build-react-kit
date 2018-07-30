ln -s $APP_PATH/node_modules node_modules
cp -s $APP_PATH/*.* .

npm run build
ls public/