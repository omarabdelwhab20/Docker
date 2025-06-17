FROM node:20 as development

WORKDIR /app
COPY package*.json .
RUN npm install 
COPY . .
EXPOSE 8000
CMD [ "npm" ,"run", "start-dev" ]


FROM node:20 as production

WORKDIR /app
COPY package*.json .
RUN npm install --only=production
COPY . .
EXPOSE 8000
CMD [ "npm" ,"run", "start" ]

