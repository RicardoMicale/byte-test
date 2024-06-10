FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

COPY variables.env .

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:dev"]
