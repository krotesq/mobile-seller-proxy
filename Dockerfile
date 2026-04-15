FROM node:20

RUN apt-get update && apt-get install -y curl

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
