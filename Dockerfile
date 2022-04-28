FROM node:16-alpine

WORKDIR .

COPY ["package.json", "package-lock.json*", "./"]

COPY src/ src/

RUN npm install

CMD ["npm", "run", "start"]
