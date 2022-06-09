FROM node:latest
ADD . /app
WORKDIR /app
RUN npm install

CMD ["node", "index.js"]
# CMD ["DEBUG=express:*", "node", "index.js"]