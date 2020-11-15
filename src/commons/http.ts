import request from 'request'
import { createWriteStream } from 'fs'
import log from './log'
import { ICreateHeaderOptions } from '../@types'
import { func } from 'joi'

export function createHeaders (opts: ICreateHeaderOptions) {
  return {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    Connection: 'keep-alive',
    Referer: 'https://www.facebook.com/',
    Origin: 'https://www.facebook.com',
    DNT: 1,
    Cookie: opts.cookie,
    'User-Agent': opts.userAgent,
    'Accept-Language': 'en-US,en;q=0.5',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Upgrade-Insecure-Requests': 1,
  }
}

export function getFromHTML (str: string, startToken: string, endToken: string) {
  let start = str.indexOf(startToken) + startToken.length
  if (start < startToken.length) return ''

  let lastHalf = str.substring(start)
  let end = lastHalf.indexOf(endToken)
  if (end === -1) {
    throw Error(
      `Could not find endTime \`${endToken}\` in the given string.`,
    )
  }
  return lastHalf.substring(0, end)
}

export const post = (url: string, headerOptions: ICreateHeaderOptions, dataString: string ) => new Promise((resolve) => {
  request({
    headers: createHeaders(headerOptions),
    uri: url,
    method: 'POST',
    body: dataString,
  }, (err, res, body) => {
    if (res.statusCode !== 200) {
      log('error', `error with status code: ${res.statusCode}`, err.toString())
      
      return null
    }

    resolve(body)
  })
})

export const isHttpUrl = (url: string) => url.indexOf('http://') === 0 || url.indexOf('https://') === 0

export const downloadFile = (url: string, options: any = {}) => new Promise((resolve, reject) => {
  if (isHttpUrl(url)) {
    const filename = options.name || url.replace(/^.*[\\\/]/, '')
    const path = (options.path) ? `${options.path}/${filename}` : `./assets/images/${filename}`
    request(url)
      .pipe(createWriteStream(path))
      .on('close', () => {
        resolve(path)
      })
  } else {
    log('warn', 'this url is not valid', url)
    reject(Error('download failed.'))  
  }
})

export function parseResponse (response: string) {
  if (response.indexOf('for (;;);') === 0) {
    return JSON.parse(response.slice(9, response.length))
  }
  return { payload: {} }
}
