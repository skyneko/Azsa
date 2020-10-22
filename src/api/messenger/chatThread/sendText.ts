import { MqttClient } from 'mqtt'
import { getMessageID } from './helper'
import { IMqttConnectOptions } from '@/types'

export = (client: MqttClient, options: IMqttConnectOptions) => function sendText(text: string, threadID: number) {
  const message = {
    'body': text,
    'sender_fbid': options.selfFacebookID,
    'to': threadID,
    'msgid': getMessageID(),
    'client_tags': {
      'web_source': 'source:chat:web',
      'web:trigger': 'cookie',
      'tracePolicy': 'comet.home'
    }
  }
  
  client.publish('/send_message2', JSON.stringify(message), { qos: 0, retain: false }, () => {

  })
}  
