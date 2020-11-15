export interface UserInfo {
	id: number,
	type: 'User',
	isAdmin: boolean,
	name: string,
	shortName: string,
	nickname: string,
	gender: 'MALE' | 'FEMALE',
	profile_url: string,
	isViewerFriend: boolean,
	isMessageBlockedByViewer: boolean,
	isMessengerUser: boolean,
}

export interface ThreadInfo {
	id: number,
	name: string,
	adminList: Array<number>
	theme: {
		id: number,
		label: string,
		fallbackColor: string
	},
	users: Array<IUserInfo>
}