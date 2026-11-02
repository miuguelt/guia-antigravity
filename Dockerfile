FROM nginx:1.27-alpine

RUN apk add --no-cache curl
RUN rm -rf /usr/share/nginx/html/*

COPY index.html ruta-antigravity.html manual-antigravity.html laboratorio-prompts.html ruta-canvas.html /usr/share/nginx/html/
COPY devbrain-prose.css devbrain-prose.js /usr/share/nginx/html/
COPY guide.manifest.json deliverables.registry.json /usr/share/nginx/html/
COPY docs/ /usr/share/nginx/html/docs/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
