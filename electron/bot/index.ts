import { Wechaty } from 'wechaty'
import {startOffice} from "./office";
import {startPadLocal} from "./padlocal";
import {startWechat4u} from "./wechat4u";
import {startWindows} from "./windows";
import {startWorker} from "./worker";

let bot: Wechaty | null = null;

export type Params = {
    apiKey: any,
    apiSecret: any,
    puppetType: string,
    padToken?: string,
    workerToken?: string,
    hookPort?: number,
    serverPort?: number,
    appId: string,
    appSecret: string,
    appToken: string,
    personalMode: boolean,
    appPort: number
}

export const startBot = (params: Params) => {
    const {apiKey, apiSecret, puppetType, padToken, workerToken, hookPort, serverPort, appId, appToken, appSecret, personalMode, appPort} = params;
    if (puppetType === 'wechaty-puppet-padlocal') {
        bot = startPadLocal({apiKey, apiSecret, token: padToken})
    } else if (puppetType === 'wechaty-puppet-service') {
        bot = startWorker({apiKey, apiSecret, token: workerToken})
    } else if (puppetType === 'wechaty-puppet-wechat4u') {
        bot = startWechat4u({apiKey, apiSecret})
    } else if (puppetType === 'wechaty-puppet-engine') {
        bot = startWindows({apiKey, apiSecret, port: hookPort, httpServer: serverPort})
    } else if (puppetType === 'wechaty-puppet-official-account') {
        bot = startOffice({apiKey, apiSecret, appId, appSecret, appToken, personalMode, port: appPort})
    } else if(puppetType === 'wechaty-puppet-whatsapp') {
        bot = startWechat4u({apiKey, apiSecret})
    }
}


export const stopBot = async () => {
    if (bot) {
        await bot.stop()
        bot = null;
    }
}
