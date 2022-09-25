import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import Avatar from 'react-avatar';

const ProfileBanner = ({ user, walletInfo, userProfile, web3Instance }) => {
  const {web3, walletAddress, nftContract, stakingContract, onConnect, onDisconnect, walletStringHelper} = web3Instance;
  return (
    <div className='profileBanner DBlock'>
      <Container>
        <div className='profileBannerDiv DBlock'>
          <img
            src='/assets/images/newsRoom/newsRoomImg1.png'
            alt='Banner Image'
            className='profileBannerImg'
          />
          <div className='overlay DFlex flex-column h-100'>
            <div className='actionBtnsDiv DFlex'>
              <span
                className={`walletSpan ${walletAddress && 'green'}`}
                onClick={()=>{walletAddress? onDisconnect() : onConnect()}}
                >
                {walletAddress
                  ? walletStringHelper(walletAddress)
                  : 'Wallet Not Connected'}
                <span className='dot'></span>
              </span>
              <Link to='/profile/edit-profile'>
                Edit Profile
                <span>
                  <FaPencilAlt />
                </span>
              </Link>
            </div>
            <div className='infoDiv DFlex'>
              <div className='infoContent DFlex justify-content-start'>
                <div className='infoImg DFlex justify-content-center'>
                  {user?.image ? (
                    <img src={user?.image} alt='User Profile' />
                  ) : (
                    <Avatar name={user?.username} />
                  )}
                </div>
                <div className='contentDiv'>
                  <h2>{user?.username}</h2>
                  <p>{user?.email}</p>
                  <span className='mobileBalace'>
                    MFAN Tokens: {userProfile?.clientBalance}
                  </span>
                </div>
              </div>
              <div className='balance'>
                <p>MFAN Tokens:</p>
                <span>{userProfile?.clientBalance}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfileBanner;
