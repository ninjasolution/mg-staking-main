import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/9be9c5756a484ddb9f6474cade87483a',
  4: 'https://rinkeby.infura.io/v3/9be9c5756a484ddb9f6474cade87483a',
};

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URLS[1],
    4: RPC_URLS[4],
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 10000,
});

const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/9be9c5756a484ddb9f6474cade87483a`,
  appName: 'web3-react-demo',
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink,
};
