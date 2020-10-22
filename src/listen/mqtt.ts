import mqtt from 'mqtt'
import websocket from 'websocket-stream'
import log from '../commons/log'
import refreshPage from '../getFromFacebookPage'
import { getGUID } from '../commons/random'
import { IMqttConnectOptions, IMsgCallbackEvent } from '../types'
import { MqttSettings } from '../const'
import color from '../commons/console-color'
import { clientOnConnect, clientOnError, clientOnMessage } from './handleMqttConnect'

const createSessionID = () => Math.floor(Math.random() * 9007199254740991) + 1

export default function connect(options: IMqttConnectOptions, callback: IMsgCallbackEvent) {
  const sessionID: number = createSessionID()
  const webSocketClientURL: string = `wss://edge-chat.facebook.com:443/chat?region=prn&sid=${sessionID}`
  const mQttOptions: any = {
    protocol: 'wss',
    slashes: true,
    auth: null,
    host: 'edge-chat.facebook.com',
    port: null,
    hostname: 'edge-chat.facebook.com',
    hash: null,
    search: `?region=prn&sid=${sessionID}`,
    query: { region: 'prn', sid: sessionID },
    pathname: '/chat',
    path: `/chat?region=prn&sid=${sessionID}`,
    href: `wss://edge-chat.facebook.com/chat?region=prn&sid=${sessionID}`,
    clientId: 'mqttwsclient',
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    username: JSON.stringify({
      u: options.selfFacebookID,
      s: sessionID,
      cp: 3,
      ecp: 10,
      chat_on: true,
      fg: false,
      d: getGUID(),
      ct: 'websocket',
      mqtt_sid: '',
      aid: MqttSettings.messengerAppID,
      st: [],
      pm: [],
      dc: '',
      no_auto_fg: true,
      gas: null,
      pack: [],
    }),
    defaultProtocol: 'wss',
  }
  const websocketOptions = {
    headers: {
      Cookie: options.cookie,
      Origin: 'https://www.facebook.com',
      'User-Agent': options.userAgent,
      Referer: 'https://www.facebook.com',
    },
    origin: 'https://www.facebook.com',
    protocolVersion: 13,
  }

  const connectMqttServer = async () => {
    const fdata = await refreshPage({ cookie: options.cookie, userAgent: options.userAgent })
    const client = new mqtt.Client(() => websocket(webSocketClientURL, undefined, websocketOptions), mQttOptions)

    const { irisSeqID, fbDtsg } = fdata
    client.on('error', clientOnError)
    client.on('connect', clientOnConnect(client, options.selfFacebookID, irisSeqID))
    client.on('message', clientOnMessage(client, options, callback))
  }
  setTimeout(() => {
    log('info', '[INFO] ', color.Reset, 'Listen ...')
  }, MqttSettings.loopTime)
  // loop
  setInterval(connectMqttServer, MqttSettings.loopTime)
}
