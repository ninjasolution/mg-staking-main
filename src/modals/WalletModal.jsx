import Modal from 'react-bootstrap/Modal';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { connectors } from 'helpers/connectors';
import { loginUserSuccess, toggleWalletInfo } from 'redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { notifyErrors } from 'helpers/helper';
import { instance } from 'index';

const WalletModal = ({
  show,
  handleClose,
  pageFrom = '',
  loginUser = null,
}) => {
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();

  const [walletInfo, setWalletInfo] = useState({
    connectionWith: auth?.walletInfo?.connectionWith,
    isConnected: auth?.walletInfo?.isConnected,
  });

  const walletConnectHandler = (connectionType) => {
    if (connectionType === 'metamask') {
      activate(connectors.injected);
      setWalletInfo({ connectionWith: 'metamask', isConnected: true });
    } else if (connectionType === 'coinbase') {
      activate(connectors.coinbaseWallet);
      setWalletInfo({ connectionWith: 'coinbase', isConnected: true });
    } else if (connectionType === 'walletConnect') {
      activate(connectors.walletConnect);
      setWalletInfo({ connectionWith: 'walletConnect', isConnected: true });
    } else {
      deactivate();
    }
  };

  const handleWallet = async (account) => {
    try {
      if (pageFrom !== 'login' && !auth?.user && !auth?.userProfile)
        return dispatch(toggleWalletInfo({ ...walletInfo, account, chainId }));
      await instance.post(
        'api/NFT/wallet',
        { walletAddress: account },
        {
          headers: {
            Authorization: `Bearer ${
              pageFrom === 'login' ? loginUser?.token : auth?.user?.token
            }`,
          },
        }
      );
      dispatch(toggleWalletInfo({ ...walletInfo, account, chainId }));
      if (pageFrom === 'login') {
        dispatch(loginUserSuccess(loginUser));
        navigate('/profile');
      }
    } catch (error) {
      notifyErrors(error);
    }
  };

  useEffect(() => {
    if (account && walletInfo?.isConnected) handleWallet(account);
  }, [account]);

  return (
    <Modal
      className='walletModal'
      show={show}
      size='md'
      onHide={handleClose}
      backdrop='static'
      keyboard={false}>
      <Modal.Body>
        <div className='walletModalBody DFlex'>
          <button className='closeBtn' onClick={handleClose}>
            <MdCancel />
          </button>
          {active && auth?.walletInfo?.isConnected ? (
            <div className='walletNetwork sm:flex sm:items-start'>
              <div className='mt-3 text-center'>
                <h3 className='heading' id='modal-title'>
                  Account Info
                </h3>
                <div className='mt-2'>
                  <p className='accountTitle'>Account: {account}</p>
                  <p className='networkId'>Network Id: {chainId}</p>
                  <button
                    type='button'
                    onClick={() => {
                      setWalletInfo({
                        connectionWith: null,
                        isConnected: false,
                      });
                      deactivate();
                      dispatch(toggleWalletInfo(null));
                      localStorage.clear();
                    }}
                    className='mt-5'>
                    Disconnect
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className='walletConnectionInfo DFlex justify-content-center'>
              <button
                className='mb-3 flex'
                onClick={() => walletConnectHandler('metamask')}>
                <img
                  src='/assets/images/metamask.png'
                  alt='metamask'
                  className='block'
                />{' '}
                Metamask
              </button>
              <button
                className='mb-3 flex'
                onClick={() => walletConnectHandler('coinbase')}>
                <img
                  src='/assets/images/coinbase.png'
                  alt='metamask'
                  className='block'
                />{' '}
                Coinbase Wallet
              </button>
              <button
                className='mb-3 flex'
                onClick={() => walletConnectHandler('walletConnect')}>
                <img
                  src='/assets/images/walletconnect.png'
                  alt='metamask'
                  className='block'
                />{' '}
                Wallet Connect
              </button>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default WalletModal;
