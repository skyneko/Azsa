import { MqttClient } from 'mqtt'
import { getMessageID } from './helper'
import { IAttachmentMessage, IMqttConnectOptions } from '../../../types'
import createGetThreadMessage from './getThreadMessage'
import uploadFile from '../utils/uploadFile'
import refreshPage from '../../../getFromFacebookPage'

export = (client: MqttClient, options: IMqttConnectOptions) => async function sendImage(filePath: string, threadID: number): Promise<IAttachmentMessage|null> {
  const getThreadMessage = createGetThreadMessage(client, options)

  const facebookState = await refreshPage(options)

  const image = await uploadFile(filePath, {
    cookie: options.cookie,
    userAgent: options.userAgent,
    fbDtsg: facebookState.fbDtsg,
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
