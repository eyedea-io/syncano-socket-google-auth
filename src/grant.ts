import * as S from '@eyedea/syncano'
import axios from 'axios'
import * as querystring from 'querystring'

interface Args {
  state: string,
  code: any,
}

class Endpoint extends S.Endpoint {
  async run(
    {response}: S.Core,
    {args, config}: S.Context<Args>
  ) {

  const state = JSON.parse(args.state)
  const {code} = args
  const serialize = obj => {
    const str = []

    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
      }
    }

    return str.join('&')
  }

  try {
    const clientSecret = config.GRANT_SECRET
    const result = await axios(state.oauth.grant, {
      method: 'POST',
      data: serialize({
        code,
        client_id: state.client_id,
        redirect_uri: state.redirect_uri,
        grant_type: 'authorization_code',
        client_secret: clientSecret,
      }),
    })

    const responseData = result.data
    responseData.state = JSON.stringify(state)

    return response('', 302, '', {
      Location: `${state.redirect_uri}/?${querystring.stringify(responseData)}`,
    })
  } catch (err) {
    throw new Error(err)
    }

  }
}

export default ctx => new Endpoint(ctx)
