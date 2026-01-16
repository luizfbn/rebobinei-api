FROM node:22-alpine AS deps
WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

FROM deps AS builder

COPY . .

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/infra/http/server.js"]