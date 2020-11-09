import { IGraphqlRequestRequirement } from '../../../types';
import qs from 'qs'
import request from 'request'

export default function requestGraphqlBatch(data: IGraphqlRequestRequirement): Promise<any> {
  return new Promise((resolve, reject) => {
    const headers: request.Headers = {
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
    };

    const dataString = qs.stringify({
      doc_id: data.docID,
      __user: data.selfFacebookID,
      __a: '1',
      __dyn: '7AzHJ16U9k9wxxt0BwRyaG5UjBWo2nDwAxu13w8CewSwAyU8EW3K1uwJyEiwp8O2S1DwUx60xU8E1J9EtwMw65xOfwwwto88hwKx-8wgolzUO0-E4a3aUS2G2Caw9m8wnolwBgK7qwpE31wiEjwPyoox22K263ifK6E7e58jwGzE7W7oqBwJK2W5olwUwHwF-4VUfE2Fzqxq2K',
      __csr: 'iuWhOd9AVajK4aHh4HyOVKiVWvGiFXFVeuuaKdjzriBylhTDFSt4Ahu9XKIxoDhBph2p8CdJaSrhl6bjjAypu8zAr8GIw_QKHyeip4F2qylnOzpp2t7HGhenDn8a8FCjULy5lqhSup1GfBm_hrgrojVRwxBhkh25Q4ohCxei2m7VES22YF7qhKGRG7VolwxmEqgS5uhwGxCt5BxTxa9CwwF7y8K5km26UrU8ekMC5mmUWKhxheKVEC111hh96m2uewVxaUHm2-Uhg_ceLwIx2V8jy8W8Vxgga4UdE5-CElgoKq68Namp2Ey7otBwKyYForwxxbwgomg9Ay4gW1iwgE9U4e0CE5iqhkF2mlia4ogAhuiU16o2Gxa1bxm4UnwKe18xybx4Cu5E8-18huq17wrzwsU27AwJw9e0czg-m14wJCxWEqy_y84W1LU4u09Xxu3Wi0F3EM2hCw4rwkEbEKO0nE0EO1owTw2_oW4h2ob5Bw9aagf819o0YLw15u02clnYQs',
      __req: '14',
      __beoa: '0',
      __pc: 'EXP2:comet_pkg',
      dpr: '1',
      __ccg: 'EXCELLENT',
      __rev: '1002918633',
      __s: '3ts0y3:9tzz26:etmhm5',
      __hsi: '6890712310449058708-0',
      __comet_req: '1',
      fb_dtsg: data.fbDtsg,
      jazoest: '22046',
      __spin_r: '1002918633',
      __spin_b: 'trunk',
      __spin_t: '1604368982',
      __jssesw: '1',
      variables: JSON.stringify(data.variables),
      fb_api_caller_class: data.fbApiCallerClass,
      fb_api_req_friendly_name: data.fbApiReqFriendlyName,
    })
    
    const requestOptions: request.OptionsWithUri = {
      uri: 'https://www.facebook.com/api/graphql/',
      headers,
      body: dataString,
      method: 'POST'
    }

    request(requestOptions, (err, response, body) => {
      if (response.statusCode !== 200) {
        reject('request with status code ' + response.statusCode)
      }

      resolve(body)
    })
  
  })
}
