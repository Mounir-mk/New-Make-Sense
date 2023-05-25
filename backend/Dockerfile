# # Dockerfile backend
FROM node:16.14.0

WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install

# Set build arguments
ARG APP_PORT
ARG FRONTEND_URL
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG JWT_SECRET

# Set environment variables
ENV APP_PORT=${APP_PORT} \
    FRONTEND_URL=${FRONTEND_URL} \
    DB_HOST=${DB_HOST} \
    DB_PORT=${DB_PORT} \
    DB_USER=${DB_USER} \
    DB_PASSWORD=${DB_PASSWORD} \
    DB_NAME=${DB_NAME} \
    JWT_SECRET=${JWT_SECRET}

ENV DATABASE_URL="mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

# Run your database migration and seeding command
RUN npm run migrate-seed

COPY ./backend .

EXPOSE 5000

CMD [ "npm", "start" ]
