FROM node:16-slim
WORKDIR /microservices
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=10000
EXPOSE 10000
CMD ["npm", "start"]