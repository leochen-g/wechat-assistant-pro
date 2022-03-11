FROM wechaty/wechaty:0.68

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /bot

COPY package.json .
RUN jq 'del(.dependencies.wechaty)' package.json | sponge package.json \
    && npm install \
    && sudo rm -fr /tmp/* ~/.npm \
COPY . .

CMD [ "npm", "start" ]

