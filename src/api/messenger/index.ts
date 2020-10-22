/** LOADER */

import fs from 'fs'
import { MqttClient } from 'mqtt'
import { IMqttConnectOptions } from '../../types'

const createMessageServices = (mqttClient: MqttClient, options: IMqttConnectOptions) => {
  let Api = {}

  const loadDir = ['chatThread', 'settings']
  

  /** ignore folder or file */
  const filter = ['helper.js']

  loadDir.forEach((dirname: string) => {
    const dir = fs.readdirSync(__dirname + `/${dirname}`)
    dir.filter(d => filter.includes(d) === false && d.indexOf('d.ts') === -1)
      .forEach(module => {
        let moduleName = module.replace('.js', '')
        //@ts-ignore
        Api[moduleName] = require(__dirname + `/${dirname}/${module}`)(mqttClient, options)
      })
    })
  return Api
}

export default createMessageServices
