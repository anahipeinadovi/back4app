
FROM node
ENV HOME/app
COPY . .
RUN npm install 
CMD ["npm", "start"]
