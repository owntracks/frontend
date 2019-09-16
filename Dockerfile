FROM nginx:alpine
EXPOSE 80
ENV LISTEN_PORT=80 \
  SERVER_HOST=otrecorder \
  SERVER_PORT=80

COPY nginx.tmpl /etc/nginx/nginx.tmpl
COPY index.html /usr/share/nginx/html
COPY static/ /usr/share/nginx/html/static/

CMD /bin/sh -c "envsubst '\${SERVER_HOST} \${SERVER_PORT} \${LISTEN_PORT}' < /etc/nginx/nginx.tmpl > /etc/nginx/nginx.conf && nginx -g 'daemon off;' || ( env; cat /etc/nginx/nginx.conf )"
