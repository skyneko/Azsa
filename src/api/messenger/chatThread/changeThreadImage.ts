import { IMqttConnectOptions } from "../../../types";
import { MqttClient } from "mqtt";
import request from 'request'
import qs from 'qs'
import createHeaders from '../utils/createHeaders'
import uploadFile from '../utils/uploadFile'

export = (client: MqttClient, options: IMqttConnectOptions) => async function changeThreadImage(threadID: number, imagePath: string): Promise<boolean> {
  const headers = createHeaders(options)
  const image = await uploadFile(imagePath, options)

  const dataString = qs.stringify({
    thread_id: threadID,
    thread_image_id: image?.imageID,
    __user: options.selfFacebookID,
    __a: '1',
    __dyn: '7AgNeQ4qmcG4Q9UrJxl0BwRyWwHheC3mbxGdwIhE98nwgUaqwSBxebAyodF89XxWUW3KawhoS2SUS4fwAwSzaxa1_xS6EhxG18wzwxgeGwbqq0KbG7ooxu15wm8vyU2WxOfwDwrE88hwKx-8wgolzUO9w4XwyDKi8wGwFyE6K2C8xK1nwBgK7qxS18wc61uG3G1lwGwHzUuw8y4Ueo2swkEbElxm0zEnwhE2WwgE',
    __csr: '',
    __req: '1e',
    __beoa: '0',
    __pc: 'PHASED:DEFAULT',
    dpr: '1',
    __ccg: 'GOOD',
    __rev: '1002939633',
    __s: 'mbed5p:wdw5wg:bh7l8h',
    __hsi: '6893356372086241258-0',
    __comet_req: '0',
    cquick: 'jsc_c_4g',
    cquick_token: 'AQ4qn2q4fj3PVvAJ11Q',
    ctarget: 'https%25253A%25252F%25252Fwww.facebook.com',
    fb_dtsg: options.fbDtsg,
    jazoest: '22083',
    __spin_r: '1002939633',
    __spin_b: 'trunk',
    __spin_t: '1604938891',
    __jssesw: '1'
  })

  const requestOptions: request.OptionsWithUri = {
    uri: 'https://www.facebook.com/messaging/set_thread_image/',
    method: 'POST',
    body: dataString,
    headers,
  }

  return new Promise((resolve, reject) => {
    request(requestOptions, (err, response, body) => {
      if (err) {
        throw new Error(err)
        resolve(false)
      }

      resolve(true)
    })
  })
}
