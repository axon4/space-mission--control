FROM node:16.20.0-alpine3.16

WORKDIR /application

COPY . .

RUN npm install --only=production

RUN npm run build --prefix client

USER node

CMD ["npm", "start", "--prefix", "server"]