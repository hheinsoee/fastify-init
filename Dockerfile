FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma
RUN npm install -D prisma-generator-typescript-interfaces

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3001

# CMD ["sh", "-c", "prisma migrate deploy && npm start"]
CMD ["npm", "start"]
