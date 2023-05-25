# # # Dockerfile backend
FROM node:16.14

WORKDIR /usr/src/app

# Copy package.json and package-lock.json and install dependencies
COPY ./backend/package*.json ./
RUN npm install

# Copy the rest of your code
COPY ./backend .

# Run database migration and seeding command
RUN npm run migrate-seed

EXPOSE 5000

CMD [ "npm", "start" ]