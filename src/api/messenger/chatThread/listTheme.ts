import { IMessengerUtils, IChangeTheme, IMqtt } from '../../../@types'
import { MqttClient } from 'mqtt'
import requestGraphQL from '../utils/requestGraphql'

export = (client: MqttClient, options: IMqtt.ConnectOptions) => async function listTheme(): Promise<IChangeTheme.ListTheme> {
  
  const requestData: IMessengerUtils.GraphqlRequestRequirement = {
    variables: {
      version: 'M4_VERSION0_WITH_GKS',
    },
    userAgent: options.userAgent,
    selfFacebookID: options.selfFacebookID,
    cookie: options.cookie,
    fbDtsg: options.fbDtsg,
    fbApiCallerClass: 'RelayModern',
    fbApiReqFriendlyName: 'MWChatThreadThemesQuery',
    docID: '2784074908353379'
  }

  const rawResp = await requestGraphQL(requestData)
  const resp = JSON.parse(rawResp)

  const result: IChangeTheme.ListTheme = resp.data.messenger_thread_themes.map((theme: any) => {
    return {
      name: theme.accessibility_label,
      themeID: theme.id, 
    }
  }) 

  return result
}
