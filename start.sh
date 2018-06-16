# copy gulpfile if it doesn't exist
if [ ! -f /app/gulpfile.js ]; then

	cp /tmp/gulpfile.js /app/gulpfile.js
fi

# copy our package.json if it doesn't exist
if [ ! -f /app/package.json ]; then

	cp /tmp/package.js /app/package.js
fi

# copy Gitlab CI config if none is specified
if [ ! -f /app/.gitlab-ci.yml ]; then

	cp /tmp/.gitlab-ci.yml /app/.gitlab-ci.yml
fi

# run dev
npm run dev