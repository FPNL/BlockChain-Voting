import ComplexStorage from './contracts/ComplexStorage.json'
import SimpleStorage from './contracts/SimpleStorage.json'
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
  contracts: [ComplexStorage, SimpleStorage, VoteCollection, VoteProvider],
  events: {
    SimpleStorage: ['StorageSet']
  },
  polls: {
    accounts: 15000
  }
}

export default options
