import { MqttClient } from 'mqtt'
import { getMessageID } from './helper'
import { IMqttConnectOptions, ITextMessage } from '../../../types'
import createGetThreadMessage from './getThreadMessage'


export = (client: MqttClient, options: IMqttConnectOptions) => function sendText(text: string, threadID: number): Promise<ITextMessage|null> {
  const getThreadMessage = createGetThreadMessage(client, options)

  const messageID: string = getMessageID()
  const message = {
    'body': text,
    'sender_fbid': options.selfFacebookID,
    'to': threadID,
    'msgid': messageID,
    'client_tags': {
      'web_source': 'source:chat:web',
      'web:trigger': 'cookie',
      'tracePolicy': 'comet.home'
    }
  }
  
  return new Promise((resolve, reject) => {
    client.publish('/send_message2', JSON.stringify(message), { qos: 0, retain: false }, () => {
      // response
      setTimeout(async () => {
        const resp = await getThreadMessage(threadID)
        resp.data.forEach(message => {
          if (message !== null && message.type === 'text' && message.offline_messageID === messageID) {
            resolve(message)
          }
        })

        resolve(null)
      }, 1000)
    })
  })
}  
