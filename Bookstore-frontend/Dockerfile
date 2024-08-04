FROM node:18
WORKDIR /app
COPY ./ /app
RUN npm install&&npm run build

FROM nginx:1.23.3
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf