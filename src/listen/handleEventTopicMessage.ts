import { IMsgCallbackEvent } from '../types'
// const createChatServices = require('../sendMessage')
// const createSettingServies = require('../MessengerSetting')
// const createThreadSettingServies = require('../ChatThreadSetting')

import onNewMessage from './events/NewMessage'
import onClientPayload from './events/ClientPayload'

export default function handleEventTopicMessage(event: string, eventData: any, fbDtsg: string, callbackFunc: IMsgCallbackEvent) {
  // const chatServies = createChatServices(fbDtsg)
  // const settingServices = createSettingServies(fbDtsg)
  // const threadSettingServices = createThreadSettingServies(fbDtsg)
  
  // const callback = (data) => callbackFunc(data, chatServies, settingServices, threadSettingServices)

  // @ts-ignore
  const callback = (data: any) => callbackFunc(data)

  /**
   * Event này sẽ bao gồm các tin nhắn mới (text, hình ảnh, âm thanh, ...)
   * @callback data {threadID, isGroup, senderId, text, messageId}
   */
  if (event === '/t_ms') {
    if (!eventData.deltas) return

    eventData.deltas.forEach((message: any) => {
      if (message.class === 'NewMessage') onNewMessage(message, callback)
      if (message.class === 'ClientPayload') onClientPayload(message, callback)
    })
  }

  /**
   * Sự kiện typing (đang gõ) từ người dùng.
   */
  if (event === '/thread_typing') {
    //
  }

  if (event === '/orca_presence') {
    //
  }

}