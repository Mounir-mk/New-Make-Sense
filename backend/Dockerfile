# # # Dockerfile backend
FROM node:16.14

WORKDIR /usr/src/app

# Copy package.json and package-lock.json and install dependencies
COPY ./backend/package*.json ./
RUN npm install

# Copy the rest of your code
COPY ./backend .

# Generate Prisma client
RUN npx prisma generate


# Expose port 5000
EXPOSE 5000

CMD [ "npm", "start"]
