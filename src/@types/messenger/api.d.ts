import { IMessengerThread } from '../index'

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

export interface ILibApi {
	sendText: (text: string, threadID: number) => Promise<IMessage.TextMessage|null>
	sendSticker: (stickerID: string, threadID: number) => void
	sendImage: (filePath: string, threadID: number) => Promise<any>
	getThreadMessage: (threadID: number, limit?: number, timestamp?: number, fbDtsg?: string) => Promise<IGetThreadMessageResponse>
	changeColor: (threadID: number, themeID: string) => Promise<boolean>
	listTheme: () => Promise<IListTheme>
	changeNickname: (targetUserID: number, nickname: string, threadID: number) => Promise<boolean>
	changeName: (threadID: number, name: string) => Promise<boolean>
	changeThreadImage: (threadID: number, imagePath: string) => Promise<boolean> 
	changeThreadIcon: (threadID: number, icon: string) => Promise<boolean>
	getThreadInfo: (threadID: number) => Promise<IMessengerThread.ThreadInfo>
	getUserInfo: (threadID: number, userFacebookID: number) => Promise<IMessengerThread.UserInfo|null>
}
