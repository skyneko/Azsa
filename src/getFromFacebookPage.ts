import { get, Response as IResponse } from 'request'
import { createHeaders, getFromHTML } from './commons/http'
import log from './commons/log'
import { ICreateHeaderOptions, IFacebookState } from './@types'

export default function getFromFacebookPage (options: ICreateHeaderOptions): Promise<IFacebookState> {
  return new Promise((resolve) => {
    get({
      uri: 'https://facebook.com/',
      headers: createHeaders(options),
    }, (err: Error, resp: IResponse, html: string) => {
      if (err) return log('error', 'Network Error')
      const fbDtsg = getFromHTML(html, '"name":"fb_dtsg","value":"', '"')
      const irisSeqID = getFromHTML(html, 'iris_seq_id":"', '"')
      
      resolve({
        cookie: options.cookie, 
        fbDtsg, 
        irisSeqID, 
      })
    })
  })
}
