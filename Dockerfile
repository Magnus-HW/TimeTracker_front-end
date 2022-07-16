FROM node:12
WORKDIR /app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm install

COPY . /usr/src/app

EXPOSE 3001
CMD npm run dev