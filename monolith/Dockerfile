# Usa la imagen de Node.js como base
FROM node:20.12.2-bookworm

# Instala BIND
RUN apt-get update && apt-get install -y bind9
#Instalar vim para configujjjjjjración
RUN apt-get install vim -y
# Establece el directorio de trabajo en la aplicación Node.js
WORKDIR /usr/src/app

# Copia los archivos del proyecto de la aplicación Node.js al contenedor
COPY package* ./

# Copia el resto de los archivos de la aplicación Node.js al contenedor
COPY . .

# Instala las dependencias de la aplicación Node.js
RUN npm install

# Instala nodemon globalmente
RUN npm install -g nodemon

# Expone los puertos necesarios
EXPOSE 3000
EXPOSE 53/tcp
EXPOSE 53/udp

# Comando para iniciar BIND y la aplicación Node.js
CMD service named start && nodemon app.js
