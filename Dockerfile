FROM node:20

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

WORKDIR /bot

COPY package.json .
RUN npm install --force
COPY . .

CMD [ "npm", "start" ]
