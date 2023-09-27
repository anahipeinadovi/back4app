
FROM node
WORKDIR app
COPY . .
RUN npm install 
#liberar el puerto en elq ue queremos que nuestro contenedor corra 
EXPOSE 80
CMD PORT=80 npm start

