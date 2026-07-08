# Etapa 1: Construcción con Node
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install bootstrap react-router-dom
COPY . .
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copiamos nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]