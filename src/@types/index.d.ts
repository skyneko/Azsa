import listen from "azsa/src/listen"

import * as IMessage from './messenger/message'
export { IMessage }

import * as IMessengerApi from './messenger/api'
import * as IMqtt from './messenger/mqtt'
export { IMqtt }
export type IUserConnectOptions = IMqtt.IUserConnectOptions



import * as IMessengerUtils from './messenger/utils'
export { IMessengerUtils }

import * as IMessengerThread from './messenger/thread'
export { IMessengerThread }

import * as IChangeTheme from './messenger/theme'
export { IChangeTheme }

import * as IMessengerHelper from './messenger/helper'
export { IMessengerHelper }

export type IfbDtsg = string
export type IMsgCallbackEvent = (message: IMessage.TextMessage|IMessage.StickerMessage|IMessage.AttachmentMessage|IMessage.ThreadTyping|IMessage.MessageEvent, Api: IMessengerApi.ILibApi) => void
/** MQTT */

// api/messenger/chatThread/getThreadMessage

// api/messenger/chatThread/listTheme

// api/messenger/utils/uploadFile

/** LOG */
export type ILogType = 'warn' | 'info' | 'error' | 'receive'

/** HTTP */

/** GET FROM FACEBOOK PAGE */
export interface IFacebookState {
	cookie: string,
	fbDtsg: string,
	irisSeqID: string,
}

/** MAIN */
export declare function listen(UserOptions: IUserConnectOptions, Callback: IMsgCallbackEvent): Promise<void>