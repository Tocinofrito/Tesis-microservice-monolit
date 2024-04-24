# Usa una imagen de Node.js como base
FROM node:20.12.2-bookworm

# Establece el directorio de trabajo en la aplicación
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY package* ./

# Copia el resto de los archivos al contenedor
COPY . .

# Instala las dependencias
RUN npm install



# Instala nodemon globalmente
RUN npm install -g nodemon

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación con nodemon
CMD ["nodemon", "app.js"]
