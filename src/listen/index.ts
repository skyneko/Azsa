import { IMqtt, IMsgCallbackEvent } from '../@types'
import mqttConnect from './mqtt'
import refreshPage from '../getFromFacebookPage'

export default async function listen (options: IMqtt.IUserConnectOptions, callback: IMsgCallbackEvent): Promise<void> {
  
  const facebookState = await refreshPage(options)

  const mqttConnectOptions: IMqtt.ConnectOptions = {
    ...options, 
    ...{ 
      fbDtsg: facebookState.fbDtsg,
    },
  }
  
  mqttConnect(mqttConnectOptions, callback)
}
