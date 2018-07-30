ln -s $APP_PATH/node_modules node_modules
cp /app/** .

npm run build
ls public/