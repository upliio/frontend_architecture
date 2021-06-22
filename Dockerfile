FROM node:latest AS BUILD_SERVER

WORKDIR /app
RUN npm i -g nx@11.6.3
COPY package*.json ./
RUN npm install
COPY . /app
RUN nx build frontend --prod

FROM nginx:1.17.1-alpine
WORKDIR /app

COPY --from=BUILD_SERVER /app/dist/apps/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
