FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

ARG TOKEN
ARG MONGODB_HOST
ARG MONGODB_USERNAME
ARG MONGODB_PASSWORD
ARG ENVIRONMENT
ARG DB_SESSION_SECRET

RUN echo "MONGODB_HOST=$MONGODB_HOST" >> .env \
    && echo "MONGODB_USERNAME=$MONGODB_USERNAME" >> .env \
    && echo "MONGODB_PASSWORD=$MONGODB_PASSWORD" >> .env \
    && echo "ENVIRONMENT=$ENVIRONMENT" >> .env \
    && echo "DB_SESSION_SECRET=$DB_SESSION_SECRET" >> .env 
    
COPY .npmrc ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

CMD [ "npm", "start" ]
