FROM node:10 as build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

FROM nginx:1.17-alpine
LABEL version="2.0.0-beta.6"
LABEL description="OwnTracks UI"
LABEL maintainer="Linus Groh <mail@linusgroh.de>"
ENV LISTEN_PORT=80 \
  SERVER_HOST=otrecorder \
  SERVER_PORT=80
COPY ./docker/nginx.tmpl /etc/nginx/nginx.tmpl
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD /bin/sh -c " \
  envsubst '\${SERVER_HOST} \${SERVER_PORT} \${LISTEN_PORT}' \
  < /etc/nginx/nginx.tmpl \
  > /etc/nginx/nginx.conf \
  && nginx -g 'daemon off;' \
  || ( env; cat /etc/nginx/nginx.conf ) \
  "
