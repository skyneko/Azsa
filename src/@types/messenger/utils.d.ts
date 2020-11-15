export interface GraphqlBatchRequestRequirement {
	userAgent: string,
	selfFacebookID: number,
	fbDtsg: string,
	cookie: string,
	queries: any
}

export interface GraphqlRequestRequirement {
	userAgent: string,
	selfFacebookID: number,
	fbDtsg: string,
	cookie: string,
	fbApiCallerClass: string,
	fbApiReqFriendlyName: string,
	variables: any, 
	docID: string,
}

// Upload File
export interface UploadFileRequirement {
	cookie: string,
	userAgent: string,
	fbDtsg: string,
	selfFacebookID: number,
}
export interface UploadImageResponse {
	imageID: number,
	filename: string,
	filetype: string,
	src: string,
	facebookID: number,
}