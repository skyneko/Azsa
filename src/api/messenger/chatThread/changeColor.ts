import { IGraphqlRequestRequirement, IMqttConnectOptions } from '../../../types'
import { MqttClient } from 'mqtt'
import requestGraphQL from '../utils/requestGraphql'
import refreshPage from '../../../getFromFacebookPage'

export = (client: MqttClient, options: IMqttConnectOptions) => async function changeColor(threadID: number, themeID: string): Promise<boolean> {
  
  // get fbdtsg
  const facebookState = await refreshPage(options)
  
  const requestData: IGraphqlRequestRequirement = {
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
    fbDtsg: facebookState.fbDtsg,
    fbApiCallerClass: 'RelayModern',
    fbApiReqFriendlyName: 'MWMSUpdateThreadThemeMutation',
    docID: '3253091031381136',
  }

  const rawResp = await requestGraphQL(requestData)
  
  return true
}