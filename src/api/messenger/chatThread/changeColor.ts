import { IMessengerUtils, IMqtt } from '../../../@types'
import { MqttClient } from 'mqtt'
import requestGraphQL from '../utils/requestGraphql'

export = (client: MqttClient, options: IMqtt.ConnectOptions) => async function changeColor(threadID: number, themeID: string): Promise<boolean> {
  
  const requestData: IMessengerUtils.GraphqlRequestRequirement = {
    variables: {
      "input": {
        "client_mutation_id": "1",
        "actor_id": options.selfFacebookID,
        "source": "SETTINGS",
        "theme_id": themeID,
        "thread_id": threadID
      }
    },
    userAgent: options.userAgent,
    selfFacebookID: options.selfFacebookID,
    cookie: options.cookie,
    fbDtsg: options.fbDtsg,
    fbApiCallerClass: 'RelayModern',
    fbApiReqFriendlyName: 'MWMSUpdateThreadThemeMutation',
    docID: '3253091031381136',
  }

  const rawResp = await requestGraphQL(requestData)
  
  return true
}
