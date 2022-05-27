FROM node:16-alpine as base

WORKDIR /app
COPY package*.json ./
EXPOSE 4001

FROM base as production

RUN apk add --no-cache git

RUN npm i
COPY . ./
RUN npm run build
CMD ["npm", "run", "serve"]
