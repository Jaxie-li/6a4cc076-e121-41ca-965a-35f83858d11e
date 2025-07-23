FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN npx tsc

EXPOSE 5000

CMD ["node", "dist/index.js"]