# build environment
FROM node:18-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder ./app/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build ./app/build /usr/share/nginx/html