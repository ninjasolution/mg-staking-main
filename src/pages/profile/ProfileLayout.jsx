import ProfileBanner from 'components/profile/ProfileBanner';
import Layout from 'layouts/Layout';
import { NavLink, Outlet } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { AiOutlineRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from 'redux/auth/authSlice';
import { useEffect, useState } from 'react';
import Loader from 'components/common/Loader';


import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import nftABI from 'config/nft.json';
import stakingABI from 'config/staking.json';

const nftAddr = '0x9fEa1aA65fD27844Bb95ae4B02a555bf14CFdE4E';
const stakingAddr = '0x42461C5513cd634FE1A4634e0F5d5f15078f4C38';

let nftContract, stakingContract;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
        rpc: {
            1: "https://rpc.ankr.com/eth",
            4: "https://rinkeby.infura.io/v3/bd2501a22a1c427f8af23d3fb5a264bf"
        },
        bridge: 'https://bridge.walletconnect.org/',
        qrcode: true
    }
  }
};

const initWeb3 = (provider) => {
  const web3 = new Web3(provider);
  web3.eth.extend({
    methods: [
      {
        name: 'chainId',
        call: 'eth_chainId',
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });
  web3.eth.handleRevert = true;
  return web3;
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions
});


const ProfileLayout = () => {

  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');  
  const [web3, setWeb3] = useState(null);  

  const walletStringHelper = (address) => {return address.substring(0, 4) + "..." + address.substring(address.length - 6, address.length);};

  const subscribeProvider = async (provider) => {
    provider.on('close', () => onDisconnect());

    provider.on('accountsChanged', async (accounts) => {
      setWalletAddress(accounts[0]);
    });

    provider.on('chainChanged', async (chainId) => {      
      console.log("Network:" + chainId);      
      if (chainId != '0x4') {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
        });
        // location.reload();
      }
    });    
  };

  const onConnect = async () => {    
    const provider = await web3Modal.connect();
    await web3Modal.toggleModal();
    await subscribeProvider(provider);
    const web3 = initWeb3(provider);

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const networkId = await web3.eth.net.getId();
    
    nftContract = new web3.eth.Contract(nftABI, nftAddr);
    stakingContract = new web3.eth.Contract(stakingABI, stakingAddr);
    // console.log("wallet" + account);
    setWeb3(web3);
    setConnected(true);
    setWalletAddress(account);    
  };

  const onDisconnect = async () => {    
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close()
    }
    await web3Modal.clearCachedProvider();
    nftContract = null;
    stakingContract = null;    
    setWeb3(null);
    setConnected(false);
    setWalletAddress('');
  };

  const connectAsync = async () => {
    if (web3Modal.cachedProvider) {
      try{
        await onConnect();
      } catch (err){     
      };
    };    
  }

  useEffect( () => {
    connectAsync();
  }, []);


  
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.user?.token) dispatch(getUserProfile(auth?.user?.token));
  }, []);

  return (
    <div className='profileLayout DBlock'>
      {auth?.isLoading ? (
        <Loader />
      ) : (
        <>
          <ProfileBanner
            user={auth?.user}
            userProfile={auth?.userProfile}
            walletInfo={auth?.walletInfo}
            web3Instance = {{web3, walletAddress, nftContract, stakingContract, onConnect, onDisconnect, walletStringHelper}}
          />
          <div className='profileLayoutBody DBlock'>
            <Container>
              <Row>
                <Col sm={12} md={4}>
                  <div className='profileSideBar DBlock'>
                    <ul className='sideBarLinkList DBlock'>
                      <li>
                        <NavLink to='/profile/nft-staking'>
                          NFT staking <AiOutlineRight />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to='/profile/token-staking'>
                          Token staking <AiOutlineRight />
                        </NavLink>
                      </li>
                      {/* <li>
                    <NavLink to='/profile/history'>
                      History <AiOutlineRight />
                    </NavLink>
                  </li> */}
                    </ul>
                    <div className='coingImg DFlex justify-content-center'>
                      <img
                        src='/assets/images/manWithLaptop.png'
                        alt='Support Wallet'
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={8}>
                  <div className='profileLayoutContent DBlock'>
                    <Outlet context = {{web3, walletAddress, nftContract, stakingContract, onConnect, onDisconnect, walletStringHelper}}/>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout(ProfileLayout);
