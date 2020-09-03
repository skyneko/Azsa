import { IMsgCallbackEvent, IMqttConnectOptions } from '../types'
import mqttConnect from './mqtt'

export default function listen (options: IMqttConnectOptions,callback: IMsgCallbackEvent) {
  mqttConnect(options, callback)
}
