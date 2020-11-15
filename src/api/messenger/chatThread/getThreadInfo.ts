import { IMqttConnectOptions, IThreadInfo } from "../../../@types";
import { MqttClient } from "mqtt";
import requestGraphQLBatch from '../utils/requestGraphqlBatch'

export = (client: MqttClient, options: IMqttConnectOptions) => async function getThreadInfo(threadID: number): Promise<IThreadInfo> {
  const rawResp = await requestGraphQLBatch({
    userAgent: options.userAgent,
    selfFacebookID: options.selfFacebookID,
    fbDtsg: options.fbDtsg,
    cookie: options.cookie,
    queries: {
      id: threadID,
      message_limit: 10,
      load_messages: true,
      load_read_receipts: true,
      load_delivery_receipts: true,
      is_work_teamwork_not_putting_muted_in_unreads: false
    }
  })

  const status = JSON.parse(rawResp.split('\n')[1]) 
  const resp = JSON.parse(rawResp.split('\n')[0])

  const thread = resp.o0.data.message_thread

  const name: string = thread.name
  const id: number = (thread.thread_key.thread_fbid) ? parseInt(thread.thread_key.thread_fbid) : parseInt(thread.thread_key.other_user_id)
  const theme = {
    id: thread.thread_theme.id,
    label: thread.thread_theme.accessibility_label,
    fallbackColor: thread.thread_theme.fallback_color
  }
  const adminList: number[] = thread.thread_admins.map((u: any) => parseInt(u.id, 10))
  const nickNameList: _INicknameList = thread.customization_info.participant_customizations.map((participant: any) => ({ 
    id: parseInt(participant.participant_id, 10), 
    nickname: participant.nickname 
  }))
  
  const users = thread.all_participants.edges.map((participant: _IThreadParticipant) => {
    const actor = participant.node.messaging_actor
    const isAdmin = adminList.includes(parseInt(actor.id, 10))
    const nickname = nickNameList.find(u => u.id === parseInt(actor.id, 10))?.nickname || null

    return {
      id: parseInt(actor.id),
      type: actor.__typename,
      isAdmin,
      name: actor.name,
      shortName: actor.short_name,
      nickname,
      username: actor.username,
      gender: actor.gender,
      profile_url: actor.url,
      isViewerFriend: actor.is_viewer_friend,
      isMessageBlockedByViewer: actor.is_message_blocked_by_viewer,
      isMessengerUser: actor.is_messenger_user,
    }
  })

  return {
    id,
    name,
    adminList,
    theme,
    users,
  }
}


// defined local types
interface _IThreadParticipant {
  admin_type: any,
  node: {
    messaging_actor: {
      id: string,
      __typename: 'User',
      name: string,
      gender: 'MALE' | 'FEMALE',
      url: string,
      big_image_src: {
        uri: string
      },
      short_name: string,
      username: string,
      is_viewer_friend: boolean,
      is_messenger_user: boolean,
      is_message_blocked_by_viewer: boolean,
      is_viewer_coworker: boolean,
      is_employee: any,
      is_aloha_proxy_confirmed: boolean,
      scim_company_user: any,
      work_info: any,
      work_foreign_entity_info: any
    }
  }
}

type _INicknameList = Array<{
  id: number, 
  nickname: string
}>
