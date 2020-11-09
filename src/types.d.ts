import listen from "azsa/src/listen"

export type IfbDtsg = string

/** MESSAGE & EVENTS */
type IMessageType = 'text' | 'attachment' | 'image' | 'sticker' | 'typing' | 'event'

interface IMessage {
	senderID: number,
	threadID: number,
	isGroup: boolean, 
	messageID: string,
	offline_messageID: number,
}

interface ITextMessage extends IMessage {
	type: 'text',
	text: string,
}

interface IStickerMessage extends IMessage {
	type: 'sticker',
	pack: string,
	label: string,
	frameCount: number,
	image: {
		spriteImage: {
			uri: string,
		},
		url: string,
		width: number,
		height: number,
	}
	stickerID: number,
}

interface IAttachmentMessage extends IMessage {
	type: 'attachments',
	attachments: Array<IAttachmentImage>
}
interface IAttachmentImage {
	type: 'image',
	id: string,
	filename: string,
	filesize: string,
	width: number,
	height: number,
	preview: any,
	extension: 'jpg' | 'png',
	renderAsSticker: boolean
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
	sendText: (text: string, threadID: number) => Promise<ITextMessage|null>
	sendSticker: (stickerID: number, threadID: number) => void
	sendImage: (image: string | string[], threadID: number) => void
	getThreadMessage: (threadID: number, limit?: number, timestamp?: number, fbDtsg?: string) => Promise<IGetThreadMessageResponse>
}

export type IMsgCallbackEvent = (message: ITextMessage|IStickerMessage|IAttachmentMessage, Api: IApi) => void

/** MQTT */
export interface IMqttConnectOptions {
	userAgent: string,
	cookie: string,
	selfFacebookID: number,
} 
type UserConnectOptions = IMqttConnectOptions 

export interface IGraphqlThreadFetcher {
	name: 'ThreadFetcher',
	id: number, // threadID
	message_limit: number,
	load_messages?: boolean,
	load_read_receipts?: boolean,
	load_delivery_receipts?: boolean, 
	time_before: number, // timestamp
	is_work_teamwork_not_putting_muted_in_unreads?: boolean
}

export interface IGraphqlRequestRequirement {
	userAgent: string,
	selfFacebookID: number,
	fbDtsg: string,
	cookie: string,
	queries: IGraphqlThreadFetcher
}

// api/messenger/chatThread/getThreadMessage
export interface IGetThreadMessageResponse {
	threadID: number,
	data: Array<ITextMessage|IStickerMessage|IAttachmentMessage|null>
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


/** MAIN */
export declare function listen(UserOptions: UserConnectOptions, Callback: IMsgCallbackEvent): void