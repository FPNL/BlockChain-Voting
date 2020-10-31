import VoteCollection from './contracts/VoteCollection.json'
import VoteProvider from './contracts/VoteProvider.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [VoteCollection, VoteProvider],
  events: {
    VoteCollection: [
      'SetTime',
      'SetCandidate',
      'SetProvider',
      'SetPrivateKey',
      'SetPublicKey',
    ]
  },
  polls: {
    accounts: 15000
  }
}

export default options
