import { IGraphqlRequestRequirement, IMqttConnectOptions } from '../../../@types'
import { MqttClient } from 'mqtt'
import requestGraphQL from '../utils/requestGraphql'

export = (client: MqttClient, options: IMqttConnectOptions) => async function changeName(threadID: number, name: string): Promise<boolean> {
  
  const requestData: IGraphqlRequestRequirement = {
    variables: {
      "input": {
        "new_thread_name": name,
        "source": "SETTINGS",
        "thread_id": threadID,
        "actor_id": options.selfFacebookID,
        "client_mutation_id": "2"
      }
    },
    userAgent: options.userAgent,
    selfFacebookID: options.selfFacebookID,
    cookie: options.cookie,
    fbDtsg: options.fbDtsg,
    fbApiCallerClass: 'RelayModern',
    fbApiReqFriendlyName: 'useMessengerThreadNameMutation',
    docID: '2532865893436941',
  }

  const rawResp = await requestGraphQL(requestData)
  
  return true
}
