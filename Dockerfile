FROM node:14-alpine3.10

ENV APP_NAME=ToDoApp\
  NODE_ENV=production\
  SESSION_SECRET=MyScretCodeIsHiddenUnderstand\
  SESSION_NAME=SSI_D_SESS\
  SECRET=MyScretCodeIsHiddenUnderstand

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5000

# our default dev command
CMD ["npm","run","dev"]