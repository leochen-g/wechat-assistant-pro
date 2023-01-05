FROM wechaty/wechaty:next
LABEL maintainer="Huan <zixia@zixia.net>"

RUN cd /tmp \
  && wget https://github.com/yudai/gotty/releases/download/v2.0.0-alpha.3/gotty_2.0.0-alpha.3_linux_amd64.tar.gz \
  && tar zxvf ./gotty*.tar.gz \
  && rm -f gotty*.tar.gz \
  && mv gotty* /usr/local/bin