# To build
#   docker build . -t vega/vega_admin_frontend
# To run
#   docker run -it -p 8000:8000 -d vega/vega_admin_frontend

# Stage 1: cache yarn packages
ARG YARN_IMAGE=node:16.16.0-slim
FROM ${YARN_IMAGE} as yarn-cache
WORKDIR /usr/local/src/vega_admin_frontend/
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Stage 2: build sources
FROM yarn-cache as build-deps
WORKDIR /usr/local/src/vega_admin_frontend/
COPY . ./
RUN yarn build


# Stage 3: run preview:
EXPOSE 8000
CMD ["yarn", "preview"]