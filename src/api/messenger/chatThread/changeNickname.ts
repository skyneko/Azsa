import { IGraphqlRequestRequirement, IMqttConnectOptions } from '../../../@types'
import { MqttClient } from 'mqtt'
import requestGraphQL from '../utils/requestGraphql'

export = (client: MqttClient, options: IMqttConnectOptions) => async function changeNickname(targetUserID: number, nickname: string, threadID: number): Promise<boolean> {
  
  const requestData: IGraphqlRequestRequirement = {
    variables: {
      input: {
        new_nickname: nickname,
        participant_id: targetUserID,
        source: "SETTINGS",
        thread_id: threadID,
        actor_id: options.selfFacebookID,
        client_mutation_id: "1"
      }
    },
    userAgent: options.userAgent,
    selfFacebookID: options.selfFacebookID,
    cookie: options.cookie,
    fbDtsg: options.fbDtsg,
    fbApiCallerClass: 'RelayModern',
    fbApiReqFriendlyName: 'useMessengerParticipantNicknameMutation',
    docID: '2851503861529803',
  }

  const rawResp = await requestGraphQL(requestData)
  
  return true
}
