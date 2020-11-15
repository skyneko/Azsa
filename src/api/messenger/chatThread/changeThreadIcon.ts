import { IGraphqlRequestRequirement, IMqttConnectOptions } from '../../../@types'
import { MqttClient } from 'mqtt'
import requestGraphQL from '../utils/requestGraphql'

export = (client: MqttClient, options: IMqttConnectOptions) => async function changeThreadIcon(threadID: number, icon: string): Promise<boolean> {
  
  const requestData: IGraphqlRequestRequirement = {
    variables: {
      input: {
        new_emoji: icon,
        source: "SETTINGS",
        thread_id: threadID,
        actor_id: options.selfFacebookID,
        client_mutation_id: "3"
      }
    },
    userAgent: options.userAgent,
    selfFacebookID: options.selfFacebookID,
    cookie: options.cookie,
    fbDtsg: options.fbDtsg,
    fbApiCallerClass: 'RelayModern',
    fbApiReqFriendlyName: 'useMessengerThreadEmojiMutation',
    docID: '3189755904427701',
  }

  const rawResp = await requestGraphQL(requestData)
  
  return true
}
