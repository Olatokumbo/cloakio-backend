FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV NODE_ENV=production
CMD ["npm", "run", "start"]