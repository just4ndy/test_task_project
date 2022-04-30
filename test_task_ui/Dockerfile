FROM node:16.14-alpine

WORKDIR /client

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 3080
CMD ["npm", "run", "start"]