/* global describe it */
import {run} from '@syncano/test'
import sinon from 'sinon'
import axios from 'axios'

describe('grant', () => {
  it('Grant', async () => {
    const ctx = {
      args: {
        state: `{
          "oauth": {
            "grant": "abc"
          },
          "client_id": "abc",
          "redirect_uri": "abc"
        }`,
        code: []
      },
      config: {
        GRANT_SECRET: 'abc'
      }
    }

    axios.post = sinon.stub().onFirstCall().resolves({data: {}})

    const res = await run('grant', ctx)
    expect(res).toHaveProperty('code', 302)
  })
})
