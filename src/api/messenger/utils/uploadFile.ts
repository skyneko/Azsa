import request from 'request'
import qs from 'qs'
import { existsSync, createReadStream } from 'fs'
import { getFileType } from './helper'
import { IMessengerUtils } from '../../../@types';

export default async function uploadFile(filePath: string, data: IMessengerUtils.UploadFileRequirement): Promise<IMessengerUtils.UploadImageResponse|null> {
  const filename: string = filePath.slice(filePath.lastIndexOf('/') + 1, filePath.length)
  const headers: request.Headers = {
    Accept: '*/*',
    Referer: 'https://www.facebook.com/',
    Origin: 'https://www.facebook.com',
    Connection: 'keep-alive',
    TE: 'Trailers',
    Cookie: data.cookie,
    'Content-Type': 'multipart/form-data; boundary=---------------------------40920157888141554622334570164',
    'User-Agent': data.userAgent,
    'Accept-Language': 'en-US,en;q=0.5',
    'X-MSGR-Region': 'ATN',
  }

  if (!existsSync(filePath)) {
    throw new Error('Lỗi, không tìm thấy file upload.')
  }

  const queryString = {
    av: data.selfFacebookID,
    __user: data.selfFacebookID,
    __a: '1',
    __dyn: '7AzHJ16U9k9wxxt0BwRyaG5UjBWo2nDwAxu13w8CewSwAyU8EW3K1uwJyEiwp8O2S1DwUx60xU8E1J9EtwMw65xOfwwwto88hwKx-8wgolzUO0-E4a3aUS2G2Caw9m8wnolwBgK7qwpE31wiEjwPyoox22K263ifK6E7e58jwGzE7W7oqBwJK2W5olwUwHwF-4VUfE2Fzqxq2K',
    __csr: 'jlcZat9Brykl4haUIkl5RAyGszVAFaBy25GD_bjGrmFoy_8m8Qr854yWExJ3F6mbe9hVpnUJe4Fvh95tWlAx17QcletyQqm5VECVdGVGCO8DQpDKkiqiawDDxp2UyJ7hKq9SbQ2gyGqFdnuVAAEpIC49C6oV7Bg42Bp98jzpoCmu4FE5idAUjx2rwj958vxCeG2iayqi8cxd9yUkGGqy9k3G5XxMUG5mUmxGcDzk-qinx4iawFrhmbz8LG1gwYwjV8S6E6a7Ejy8BkEa26gSy2ay8ObaaG-m4Aeo8gjF2p9oax8Z0p8nG2jmA2Gu78Ki4Q2mGwEDwhEaopCxWGypkEO1firm2CiUozYExyUuwmXCyU40Uue3G4Hz8523i2MyA98pmEkzQ9hodo7q0gunAwkoc81m82gxC2vwuo1T8qw991WUnxe7E9E-EvwdC0wEc87i0dhwqUKcAJAwaoi1ezmS1tw3EEeQq2IgC08RwjBwFwgU19o0sDg09Dyh4u',
    __req: '15',
    __beoa: '0',
    __pc: 'EXP2:comet_pkg',
    dpr: '1',
    __ccg: 'EXCELLENT',
    __rev: '1002940157',
    __s: '3t3p6b:cd4tb4:2ilxi5',
    __hsi: '6893198769963244855-0',
    __comet_req: '1',
    fb_dtsg: data.fbDtsg,
    jazoest: '21927',
    __spin_r: '1002940157',
    __spin_b: 'trunk',
    __spin_t: '1604947906',
    __jssesw: '1'
  }

  const formData: any = {
    'Content-Disposition': 'form-data',
    name: 'farr',
    filename,
    my_file: createReadStream(filePath),
  }
  if (getFileType(filename) === 'audio') formData.voice_clip = 'true'

  return new Promise((resolve, reject) => {
    request({
      url: 'https://upload.facebook.com/ajax/mercury/upload.php',
      formData,
      qs: queryString,
      method: 'POST',
      headers,
    }, (err, resp, body: string) => {
      if (err) {
        throw new Error('File upload failed.')
      }
      // parse response
      const res = JSON.parse(body.replace('for (;;);', ''))

      if (res.payload.metadata[0].image_id !== undefined) {
        
        const imageResponse: IMessengerUtils.UploadImageResponse = {
          imageID: res.payload.metadata[0].image_id,
          filename: res.payload.metadata[0].filename,
          filetype: res.payload.metadata[0].filetype,
          src: res.payload.metadata[0].src,
          facebookID: res.payload.metadata[0].fbid,
        }
        resolve(imageResponse)
      }
  
      resolve(null)
    })
  })
}
