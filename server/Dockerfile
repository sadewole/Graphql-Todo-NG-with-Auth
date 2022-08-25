FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent && mv node_modules ../
COPY . .
RUN npm run build-ts
ENV NODE_ENV=production
EXPOSE 8080
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "dist/index.js"]
