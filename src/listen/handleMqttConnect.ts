import { MqttClient as IMqttClient } from 'mqtt'
import handleEventTopicMessage from './handleEventTopicMessage'
import { IMsgCallbackEvent, IMqttConnectOptions } from '../types'
import log from '../commons/log'

export function clientOnConnect(client: IMqttClient, selfFacebookID: number, irisSeqID: string) {
  return function () {
    client.subscribe(['/legacy_web', '/webrtc', '/br_sr', '/sr_res', '/t_ms', '/thread_typing', '/orca_typing_notifications', '/notify_disconnect', '/orca_presence'],
    (err, granted) => {
      client.unsubscribe('/orca_message_notifications', (subError: Error) => {
        let queue = {
          sync_api_version: 10,
          max_deltas_able_to_process: 1000,
          delta_batch_size: 500,
          encoding: 'JSON',
          entity_fbid: selfFacebookID,
          initial_titan_sequence_id: irisSeqID,
          device_params: null,
        }

        client.publish('/messenger_sync_create_queue', JSON.stringify(queue), { qos: 0, retain: false })
      })
    })
  }
}
export function clientOnMessage(client: IMqttClient, options: IMqttConnectOptions, callbackFunc: IMsgCallbackEvent) {
  return function (event: string, message: any) {
    const eventData = JSON.parse(message.toString())
    if (eventData.errorCode === 'ERROR_QUEUE_OVERFLOW') return log('error', 'ERROR_QUEUE_OVERFLOW')

    handleEventTopicMessage(event, eventData, client, options, callbackFunc)    
  }
}
export function clientOnError(error: Error) {
  if (error.toString().indexOf('Connection refused') === -1) {
    log('error', 'WebSocket connection failed.', error.toString())
  }
}
