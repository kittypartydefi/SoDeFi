import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Theme } from 'react-daisyui'
import { Chain, chain, configureChains, createClient, createStorage, WagmiConfig } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import ErrorPage from './error-page'
import DAOApp from './DAOApp'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dao",
    element: <DAOApp />,
    errorElement: <ErrorPage />,
  },
]);

export const hyperspace = {
  id: 3141,
  name: 'Hyperspace',
  network: 'hyperspace',
  nativeCurrency: {
    decimals: 18,
    name: 'Filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    public: 'https://api.hyperspace.node.glif.io/rpc/v1',
    default: 'https://api.hyperspace.node.glif.io/rpc/v1',
  },
  blockExplorers: {
    etherscan: { name: 'filfox', url: 'https://hyperspace.filfox.info/en' },
    default: { name: 'filfox', url: 'https://hyperspace.filfox.info/en' },
  }
} as const satisfies Chain

const { chains, provider, webSocketProvider } = configureChains(
  [chain.optimismKovan, hyperspace],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `https://api.hyperspace.node.glif.io/rpc/v0`,
      }),
    }),
  ]
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: 'Injected',
    //     shimDisconnect: true,
    //   },
    // }),
  ],
  storage: createStorage({ storage: window.localStorage }),
  provider,
  webSocketProvider,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
    <Theme dataTheme="forest">
    <RouterProvider router={router} />
    </Theme>
    </WagmiConfig>
  </React.StrictMode>
)
