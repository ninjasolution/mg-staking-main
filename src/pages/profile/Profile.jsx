import { getProvider } from 'helpers/helper';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom/dist';

const Profile = () => {
  const {web3, walletAddress, nftContract, stakingContract, onConnect, onDisconnect, walletStringHelper} = useOutletContext();

  
  const { auth } = useSelector((state) => state);
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [totalStakNFTs, setTotalStakNFTs] = useState(0);

  const getUserNFTInfo = async (walletAddress) => {
    const nftNotStaked = await nftContract.methods.listMyNFTs(walletAddress).call();
    const nftStaked = await stakingContract.methods.listNFTStaked(walletAddress).call();
    setTotalNFTs(nftNotStaked.length);
    setTotalStakNFTs(nftStaked.length);
  };
  useEffect(() => {
    if (walletAddress) {
      getUserNFTInfo(walletAddress);
    }
  }, [walletAddress]);

  return (
    <div className='profilePageBody DBlock'>
      <Row>
        <Col sm={12} md={6}>
          <div className='profileCard DBlock'>
            <Row>
              <Col sm={12} md={8}>
                <div className='profileCardContent DBlock'>
                  <div className='title'>Total Nfts</div>
                  <div className='nodes'>{totalNFTs}</div>
                  <div className='title'>Staked nft's</div>
                  <div className='nodes'>{totalStakNFTs}</div>
                </div>
              </Col>
              <Col sm={12} md={4}>
                <div className='imgDiv DBlock'>
                  <img
                    src='/assets/images/services/aboutImg2.png'
                    alt='aboutImg'
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col sm={12} md={6}>
          <div className='profileCard DBlock'>
            <Row>
              <Col sm={12} md={8}>
                <div className='profileCardContent DBlock'>
                  <div className='title'>Total Nfts</div>
                  <div className='nodes'>{totalNFTs}</div>
                  <div className='title'>Staked nft's</div>
                  <div className='nodes'>{totalStakNFTs}</div>
                </div>
              </Col>
              <Col sm={12} md={4}>
                <div className='imgDiv DBlock'>
                  <img
                    src='/assets/images/services/aboutImg.png'
                    alt='aboutImg'
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div className='profileWalletCard DBlock'>
        <img
          src='/assets/images/wallet.png'
          alt='Wallet Image'
          className='walletImg'
        />
        <img
          src='/assets/images/stakeRingImg.png'
          alt='Wallet Image'
          className='stakeRingImg'
        />
        <div className='walletContent'>
          <h4>Wallet Address</h4>
          <p>{walletAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
