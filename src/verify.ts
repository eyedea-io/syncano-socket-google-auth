import * as S from '@eyedea/syncano'
import * as crypto from 'crypto'
import axios from 'axios'

interface Args {
  authResponse: any
}

class Endpoint extends S.Endpoint {
  async run(
    {response, users}: S.Core,
    {args}: S.Context<Args>
  ) {
    const accessToken = args.authResponse.access_token
    const {data} = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    try {
      const user = await users
        .fields('id', 'user_key as token', 'fullName', 'groups', 'created_at as createdAt')
        .firstOrCreate({
          username: data.email,
        }, {
          username: data.email,
          email: data.email,
          password: crypto.randomBytes(16).toString('hex'),
          fullName: data.name,
        })

      return response.json(user, 200)
    } catch (err) {
      return response.json({message: 'An error occured!'}, 400)
    }
  }

}

export default ctx => new Endpoint(ctx)
