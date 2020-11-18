import { IMsgCallbackEvent, IMqtt } from '../@types'

import onNewMessage from './events/NewMessage'
import onClientPayload from './events/ClientPayload'
import createMessageServices from '../api/messenger'
import onTyping from './events/Typing'
import handleThreadEvents from './events/ThreadEvents'

import { MqttClient } from 'mqtt'

export default function handleEventTopicMessage(event: string, eventData: any, client: MqttClient, options: IMqtt.ConnectOptions, callbackFunc: IMsgCallbackEvent) {

  // @ts-ignore
  const callback = (data: any) => callbackFunc(data, createMessageServices(client, options))

  /**
   * Event này sẽ bao gồm các tin nhắn mới (text, hình ảnh, âm thanh, ...)
   * @callback data {threadID, isGroup, senderId, text, messageId}
   */
  if (event === '/t_ms') {
    if (!eventData.deltas) return

    eventData.deltas.forEach((message: any) => {
      switch(message.class) {
        case 'NewMessage': onNewMessage(message, callback) 
          break
        case 'ClientPayload': onClientPayload(message, callback)
          break

        default: handleThreadEvents(message, callback)
      }
    })
  }

  /**
   * Sự kiện typing (đang gõ) từ người dùng.
   */
  if (event === '/thread_typing') {
    onTyping(eventData, callback)
  }

  if (event === '/orca_presence') {
    //
  }

}