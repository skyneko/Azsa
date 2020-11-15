import { IMqttConnectOptions, IMsgCallbackEvent, IUserConnectOptions } from '../@types'
import mqttConnect from './mqtt'
import refreshPage from '../getFromFacebookPage'

export default async function listen (options: IUserConnectOptions,callback: IMsgCallbackEvent): Promise<void> {
  
  const facebookState = await refreshPage(options)

  const mqttConnectOptions: IMqttConnectOptions = {
    ...options, 
    ...{ 
      fbDtsg: facebookState.fbDtsg,
    },
  }
  
  mqttConnect(mqttConnectOptions, callback)
}
