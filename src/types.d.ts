import listen from "azsa/src/listen"

export type IfbDtsg = string

/** MESSAGE & EVENTS */
type IMessageType = 'text' | 'attachment' | 'image' | 'sticker' | 'typing' | 'event'

interface IMessage {
	senderID: number,
	threadID: number,
	isGroup: boolean, 
	messageID: string,
	offline_messageID: string,
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
	sendSticker: (stickerID: string, threadID: number) => void
	sendImage: (filePath: string, threadID: number) => Promise<any>
	getThreadMessage: (threadID: number, limit?: number, timestamp?: number, fbDtsg?: string) => Promise<IGetThreadMessageResponse>
	changeColor: (threadID: number, themeID: string) => Promise<boolean>
	listTheme: () => Promise<IListTheme>
	changeNickname: (targetUserID: number, nickname: string, threadID: number) => Promise<boolean>
	changeName: (threadID: number, name: string) => Promise<boolean>
	changeThreadImage: (threadID: number, imagePath: string) => Promise<boolean> 
	changeThreadIcon: (threadID: number, icon: string) => Promise<boolean>
}

export type IMsgCallbackEvent = (message: ITextMessage|IStickerMessage|IAttachmentMessage, Api: IApi) => void

/** MQTT */
export interface IUserConnectOptions {
	userAgent: string,
	cookie: string,
	selfFacebookID: number,
} 
export interface IMqttConnectOptions extends IUserConnectOptions {
	fbDtsg: string,
}

export interface IGraphqlBatchRequestRequirement {
	userAgent: string,
	selfFacebookID: number,
	fbDtsg: string,
	cookie: string,
	queries: any
}

export interface IGraphqlRequestRequirement {
	userAgent: string,
	selfFacebookID: number,
	fbDtsg: string,
	cookie: string,
	fbApiCallerClass: string,
	fbApiReqFriendlyName: string,
	variables: any, 
	docID: string,
}

// api/messenger/chatThread/getThreadMessage
export interface IGetThreadMessageResponse {
	threadID: number,
	data: Array<ITextMessage|IStickerMessage|IAttachmentMessage|null>
}

// api/messenger/chatThread/listTheme
export interface IThemeColor {
	name: string,
	themeID: string,
}
export type IListTheme = Array<IThemeColor>

// api/messenger/utils/uploadFile
export interface IUploadFileRequirement {
	cookie: string,
	userAgent: string,
	fbDtsg: string,
	selfFacebookID: number,
}
export interface IUploadImageResponse {
	imageID: number,
	filename: string,
	filetype: string,
	src: string,
	facebookID: number,
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
export declare function listen(UserOptions: UserConnectOptions, Callback: IMsgCallbackEvent): Promise<void>