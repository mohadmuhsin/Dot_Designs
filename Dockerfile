FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --prod
EXPOSE 4200
CMD ["npm", "start"]
