
FROM node
ENV HOME/app
COPY . .
RUN npm install 
#liberar el puerto en elq ue queremos que nuestro contenedor corra 
EXPOSE 3000
ENTRYPOINT  npm start 
