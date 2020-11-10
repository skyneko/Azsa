import { IGraphqlRequestRequirement, IListTheme, IMqttConnectOptions, IThemeColor } from '../../../types'
import { MqttClient } from 'mqtt'
import requestGraphQL from '../utils/requestGraphql'

export = (client: MqttClient, options: IMqttConnectOptions) => async function listTheme(): Promise<IListTheme> {
  
  const requestData: IGraphqlRequestRequirement = {
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

  const result: IListTheme = resp.data.messenger_thread_themes.map((theme: any) => {
    return {
      name: theme.accessibility_label,
      themeID: theme.id, 
    }
  }) 

  return result
}
