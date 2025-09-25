FROM node:20-alpine

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

WORKDIR /bot

COPY package.json .
RUN npm install --no-optional
COPY . .

CMD [ "npm", "start" ]
