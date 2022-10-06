FROM node:alpine
WORKDIR "/usr/src/app"
COPY package.json ./
RUN npm i
CMD ["npm", "run", "build"]
COPY ./ ./