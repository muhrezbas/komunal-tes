# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . /app
# CMD node app.js
# "bare" base image with just our source files
# which only has Node runtime - not even NPM!
FROM node:lts-alpine as BASE
WORKDIR /app
COPY . .

FROM node:lts-alpine as TEST
WORKDIR /app
# Copy files _from_ BASE
# To avoid accidentally creating different
# testing environment from production
COPY --from=BASE /app .
RUN npm install

# final production image
FROM BASE as PROD
CMD node app.js