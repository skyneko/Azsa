type MessageType = 'text' | 'attachment' | 'image' | 'sticker' | 'typing' | 'event'

export interface Message {
	senderID: number,
	threadID: number,
	isGroup: boolean, 
	messageID: string,
	offline_messageID: string,
}

export interface TextMessage extends Message {
	type: 'text',
	text: string,
}

export interface StickerMessage extends Message {
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

export interface AttachmentMessage extends Message {
	type: 'attachments',
	attachments: Array<AttachmentImage>
}
export interface AttachmentImage {
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

export interface ThreadTyping {
	type: 'typing',
	threadID: number,
	isGroup: boolean,
	state: 0|1,
	senderID: number,
}

export interface GetThreadMessageResponse {
	threadID: number,
	data: Array<IMessage.TextMessage|IMessage.StickerMessage|IMessage.AttachmentMessage|null>
}
