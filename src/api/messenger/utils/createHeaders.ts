import { IMqttConnectOptions } from '../../../types'
import { Headers as IHeaders } from 'request'

export default function createHeaders(data: IMqttConnectOptions) {
  const headers: IHeaders = {
    Accept: '*/*',
    Referer: 'https://www.facebook.com/',
    Origin: 'https://www.facebook.com',
    Connection: 'keep-alive',
    TE: 'Trailers',
    Cookie: data.cookie,
    'User-Agent': data.userAgent,
    'Accept-Language': 'en-US,en;q=0.5',
    'Content-Type': 'application/x-www-form-urlencoded, application/x-www-form-urlencoded',
    'X-MSGR-Region': 'ATN',
  }

  return headers
}
