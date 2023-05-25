FROM node:16.14.0

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

COPY ./frontend .

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80