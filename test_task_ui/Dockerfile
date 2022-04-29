FROM node:16.14-alpine

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH


COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

EXPOSE 3080

CMD ["npm", "run", "start"]