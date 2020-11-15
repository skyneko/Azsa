export interface IUserConnectOptions {
	userAgent: string,
	cookie: string,
	selfFacebookID: number,
} 
export interface ConnectOptions extends IUserConnectOptions {
	fbDtsg: string,
}