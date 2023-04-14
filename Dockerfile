FROM node:16-alpine

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

WORKDIR /bot

COPY package.json .
RUN npm install
COPY . .

CMD [ "npm", "start" ]
