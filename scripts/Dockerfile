FROM node:26-alpine@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5

ENV NODE_ENV=production \
    REDLINE_DATA_DIR=/workspace/data

WORKDIR /workspace
COPY --chown=10001:10001 scan-news.mjs /app/scan-news.mjs
USER 10001:10001
ENTRYPOINT ["node", "/app/scan-news.mjs"]
