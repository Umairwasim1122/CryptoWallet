import { EtherscanProvider } from 'ethers';

class EtherscanProviderCustom extends EtherscanProvider {
  constructor(network, apiKey) {
    super(network, apiKey);
  }

  async getHistory(address, startBlock = 0, endBlock = 99999999) {
    const params = {
      action: 'txlist',
      address,
      startblock: startBlock,
      endblock: endBlock,
      sort: 'asc',
    };

    return this.fetch('account', params);
  }
}

export default EtherscanProviderCustom;
