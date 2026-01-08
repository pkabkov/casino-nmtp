FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY nuxt.config.ts ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]