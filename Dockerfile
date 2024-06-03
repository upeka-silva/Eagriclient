# build environment
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
#RUN npm ci
RUN npm config set legacy-peer-deps true
RUN npm install
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine AS server

# Install Certbot
RUN apk --no-cache add certbot

# Create directories for Let's Encrypt and Certbot
RUN mkdir -p /etc/letsencrypt /var/www/certbot

# Set permissions for the certbot directory
RUN chown -R root:root /var/www/certbot

# Set permissions for the letsencrypt directory
RUN chown -R root:root /etc/letsencrypt

COPY --from=builder ./app/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/nginx/ssl /etc/nginx

RUN chmod 600 /etc/nginx/*

COPY --from=builder ./app/build /usr/share/nginx/html