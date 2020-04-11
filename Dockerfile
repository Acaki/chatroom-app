FROM gcr.io/google_appengine/nodejs
COPY . /app/
RUN npm install --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
      cat npm-debug.log; \
    fi) && false)
RUN npm install -g serve
RUN npm run-script build
CMD serve -s build
