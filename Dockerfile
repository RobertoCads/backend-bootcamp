FROM node
COPY package.json ./
RUN npm install
COPY . ./
CMD ["node", "server.js"]