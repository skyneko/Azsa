import { MqttClient } from 'mqtt'
import { getMessageID } from './helper'
import { IMqtt, IMessage } from '../../../@types'
import createGetThreadMessage from './getThreadMessage'
import uploadFile from '../utils/uploadFile'

export = (client: MqttClient, options: IMqtt.ConnectOptions) => async function sendImage(filePath: string, threadID: number): Promise<IMessage.AttachmentMessage|null> {
  const getThreadMessage = createGetThreadMessage(client, options)

  const image = await uploadFile(filePath, {
    cookie: options.cookie,
    userAgent: options.userAgent,
    fbDtsg: options.fbDtsg,
    selfFacebookID: options.selfFacebookID
  })

  const messageID: string = getMessageID()
  const message = {
    "sender_fbid": options.selfFacebookID,
    "to": threadID,
    "msgid": messageID,
    "generic_metadata": {},
    "media": [
      image?.imageID
    ],
    "client_tags": {
      "web_source": "source:chat:web",
      "web:trigger": "cookie",
      "tracePolicy": "comet.home"
    }
  }
  
  return new Promise((resolve, reject) => {
    client.publish('/send_message2', JSON.stringify(message), { qos: 0, retain: false }, () => {
      // response
      setTimeout(async () => {
        const resp = await getThreadMessage(threadID)
        resp.data.forEach(message => {
          if (message !== null && message.type === 'attachments' && message.offline_messageID === messageID) {
            resolve(message)
          }
        })

        resolve(null)
      }, 1000)
    })
  })
}  
