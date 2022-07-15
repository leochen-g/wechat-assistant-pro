FROM wechaty/wechaty:latest

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /bot

COPY package.json .
RUN npm install
COPY . .

CMD [ "npm", "start" ]

