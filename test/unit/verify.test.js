/* global describe it */
import {run} from '@syncano/test'
import sinon from 'sinon'
import axios from 'axios'

describe('verify', () => {
  it('Create user', async () => {
    const ctx = {
      args: {
        authResponse: {
          access_token: "abc"
        }
      }
    }

    axios.get = sinon.stub().onFirstCall().resolves({
      data: {
        email: 'abc',
        name: 'abc'
      }
    })

    require('@syncano/core').Core.__setMocks({
      users: {
        fields: () => ({
          firstOrCreate: sinon.stub().onFirstCall().resolves({abc: 'cab'})
        })
      }
    })


    const res = await run('verify', ctx)
    expect(res).toHaveProperty('code', 200)
  })

  it('Verify error', async () => {
    const ctx = {
      args: {
        authResponse: {
          access_token: "abc"
        }
      }
    }

    axios.get = sinon.stub().onFirstCall().resolves({
      data: {
        email: 'abc',
        name: 'abc'
      }
    })

    require('@syncano/core').Core.__setMocks({
      users: {
        fields: () => ({
          firstOrCreate: sinon.stub().onFirstCall().rejects(null)
        })
      }
    })


    const res = await run('verify', ctx)
    expect(res).toHaveProperty('code', 400)
    expect(res.data).toHaveProperty('message', 'An error occured!')
  })
})
