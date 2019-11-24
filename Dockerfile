FROM node:12

WORKDIR /app

RUN npm i -g yarn

COPY package.json ./

RUN yarn

COPY . .

CMD ["yarn", "dev"]
