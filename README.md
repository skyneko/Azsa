### Hướng dẫn cơ bản

Tạo file `.env`
```bash
USER_AGENT=Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:79.0) Gecko/20100101 Firefox/79.0
COOKIE=
SELF_FACEBOOK_ID=
```
index.js
```typescript
import { listen, UserConnectOptions } from 'azsa'
import config from './config'
import log from './utils/log'

const { userData } = config

if (!(userData.userAgent && userData.cookie && userData.selfFacebookID)) {
  log('error', 'Invalid user data.', JSON.stringify(userData))
  process.exit()
}

const User: UserConnectOptions = {
  userAgent: userData.userAgent,
  cookie: userData.cookie,
  selfFacebookID: parseInt(userData.selfFacebookID, 10),
}

listen(User, (message, Api) => {
  log('info', message.text)
})
```

## API
[azsa.listen](#Azsa.listen)


## API Documentation
### Azsa.listen (message, Api)
  1. `message` props
  - <table>
      <tr>
        <th>Event Type</th>
        <th>Field</th>
        <th>Description</th>
      </tr>
    </table>