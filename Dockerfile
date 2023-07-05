# build environment
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
#RUN npm ci
RUN npm install
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine AS server
COPY --from=builder ./app/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/build /usr/share/nginx/html