import { MqttClient } from 'mqtt'
import { IGetThreadMessageResponse, IMqttConnectOptions, IStickerMessage, ITextMessage } from '../../../types'
import requestGraphQLBatch from '../utils/requestGraphqlBatch'
import refreshPage from '../../../getFromFacebookPage'

export = (client: MqttClient, options: IMqttConnectOptions) =>  async function(threadID: number, limit?: number, timestamp?: number, fbDtsg?: string): Promise<IGetThreadMessageResponse> {
  const _timestamp = timestamp || Date.now()
  const _limit = limit || 11

  let _fbDtsg

  if (fbDtsg === undefined) {
    const facebookState = await refreshPage(options)
    _fbDtsg = facebookState.fbDtsg
    
  } else {
    _fbDtsg = fbDtsg
  }
 
  const rawResp = await requestGraphQLBatch({
    userAgent: options.userAgent,
    cookie: options.cookie,
    selfFacebookID: options.selfFacebookID,
    fbDtsg: _fbDtsg,
    queries: {
      name: 'ThreadFetcher',
      id: threadID,
      message_limit: _limit,
      time_before: _timestamp,
      load_messages: true,
      load_read_receipts: true,
      load_delivery_receipts: true,
    }
  })

  const status = JSON.parse(rawResp.split('\n')[1]) 
  const resp = JSON.parse(rawResp.split('\n')[0])

  const isGroup = resp.o0.data.message_thread.thread_key.thread_fbid !== undefined
  const message = resp.o0.data.message_thread.messages.nodes.map((node: any) => {
    if (node === undefined) return null
    // get type of message
    if (node.message.text !== '' && node.message.text !== undefined) {
      const textMessage: ITextMessage = {
        type: 'text',
        threadID,
        isGroup,
        senderID: node.message_sender.id,
        text: node.message.text,
        offline_messageID: node.offline_threading_id,
        messageID: node.message_id,
      }
      return textMessage
    }
    if (node.sticker !== null) {
      const stickerMessage: IStickerMessage = {
        type: 'sticker',
        threadID,
        isGroup,
        senderID: node.message_sender.id,
        pack: node.sticker.pack.id,
        label: node.sticker.label,
        frameCount: node.sticker.frame_count,
        image: {
          spriteImage: {
            uri: ''
          },
          url: node.sticker.url,
          width: node.sticker.width,
          height: node.sticker.height,
        },
        stickerID: node.sticker.id,
        offline_messageID: node.offline_threading_id,
        messageID: node.message_id,
      }
      return stickerMessage
    }
    
    return null
  })

  return {
    threadID,
    data: message,
  }

}
