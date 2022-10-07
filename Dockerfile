FROM node:alpine
WORKDIR "/usr/src/app"
COPY package.json ./
RUN npm i
RUN /bin/sh -c "npm run build"
COPY ./ ./