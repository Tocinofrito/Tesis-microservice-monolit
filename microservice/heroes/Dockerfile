# Usa una imagen de Node.js como base
FROM node:20.11.1-alpine3.18

# Establece el directorio de trabajo en la aplicación
WORKDIR /usr/src/heroes

# Copia los archivos del proyecto al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos al contenedor
COPY . .

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 8081

# Comando para iniciar la aplicación
CMD ["node", "heroes.js"]
