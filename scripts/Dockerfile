FROM node:25-alpine@sha256:bdf2cca6fe3dabd014ea60163eca3f0f7015fbd5c7ee1b0e9ccb4ced6eb02ef4

ENV NODE_ENV=production \
    REDLINE_DATA_DIR=/workspace/data

WORKDIR /workspace
COPY --chown=10001:10001 scan-news.mjs /app/scan-news.mjs
USER 10001:10001
ENTRYPOINT ["node", "/app/scan-news.mjs"]
