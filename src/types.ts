
/** MAIN */
export interface Azsa {
	listen: (callback: IMsgCallbackEvent) => void,
}

/** MESSAGE & EVENTS */
type IMessageType = 'text' | 'attachment' | 'image' | 'sticker' | 'typing' | 'event'

interface IMessage {
	type: IMessageType,
	senderID: number,
	threadID: number,
	isGroup: boolean 
}

interface ITextMessage extends IMessage {
	text: string
}

/** API */
interface IApiResponse {
	isError: boolean,
}
interface ISendTextApiResponse extends IApiResponse {
	messageID: string
}
interface ISendStickerApiResponse extends IApiResponse {
	messageID: string
}
interface ISendImageApiResponse extends IApiResponse {
	messageID: string
}

interface IApi {
	sendText: (text: string, threadID: number) => Promise<ISendTextApiResponse>
	sendSticker: (stickerID: number, threadID: number) => Promise<ISendStickerApiResponse>
	sendImage: (image: string | string[], threadID: number) => Promise<ISendImageApiResponse>
}

export type IMsgCallbackEvent = (message: ITextMessage, Api: IApi) => void

/** MQTT */
export interface IMqttConnectOptions {
	userAgent: string,
	cookie: string,
	selfFacebookID: number
} 

/** LOG */
export type ILogType = 'warn' | 'info' | 'error' | 'receive'

/** HTTP */
export interface ICreateHeaderOptions {
	cookie: string,
	userAgent: string,
}

/** GET FROM FACEBOOK PAGE */
export interface IFacebookState {
	cookie: string,
	fbDtsg: string,
	irisSeqID: string,
}