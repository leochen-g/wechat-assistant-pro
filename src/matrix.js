import {WechatyBuilder}  from '@juzi/wechaty'
import {PuppetMatrix} from 'wechaty-puppet-matrix'


export function startMatrix(matrixToken, matrixBridgeId) {
    const name = 'wechat-assistant-matrix-pad';
    let bot = '';
    console.log('读取到环境变量中的matrix ipad token 使用ipad协议启动')
    bot = WechatyBuilder.build({
        name,
        puppet: new PuppetMatrix({
            token: matrixToken,
            proxyId: matrixBridgeId || ''
        }),
    });
    return bot
}
