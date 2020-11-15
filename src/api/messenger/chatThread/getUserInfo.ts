import { IMqttConnectOptions, IUserInfo } from "../../../types";
import { MqttClient } from "mqtt";
import createGetThreadInfo from './getThreadInfo'

export = (client: MqttClient, options: IMqttConnectOptions) => async function getUserInfo(threadID: number, userFacebookID: number): Promise<IUserInfo|null> {
  const getThreadInfo = createGetThreadInfo(client, options)

  const threadInfo = await getThreadInfo(threadID)
  const userInfo = threadInfo.users.find(u => u.id === userFacebookID) || null

  return userInfo
}
