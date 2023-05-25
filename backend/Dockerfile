# # # Dockerfile backend
FROM node:16.14

WORKDIR /usr/src/app

# Copy package.json and package-lock.json and install dependencies
COPY ./backend/package*.json ./
RUN npm install

ARG DB_HOST=${DB_HOST}
ENV DB_HOST=${DB_HOST}
ARG DB_USER=${DB_USER}
ENV DB_USER=${DB_USER}
ARG DB_PASSWORD=${DB_PASSWORD}
ENV DB_PASSWORD=${DB_PASSWORD}
ARG DB_NAME=${DB_NAME}
ENV DB_NAME=${DB_NAME}
ARG DATABASE_URL=${DATABASE_URL}
ENV DATABASE_URL=${DATABASE_URL}
ARG JWT_SECRET=${JWT_SECRET}
ENV JWT_SECRET=${JWT_SECRET}

# log the value of the environment variable
RUN echo $DB_HOST
RUN echo $DB_USER
RUN echo $DB_PASSWORD
RUN echo $DB_NAME
RUN echo $DATABASE_URL
RUN echo $JWT_SECRET


# Copy the rest of your code
COPY ./backend .

# Generate Prisma client
RUN npx prisma generate


# Expose port 5000
EXPOSE 5000

CMD [ "npm", "start"]
