import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import Slider from 'react-slick';
import NFTDeatilModal from 'modals/NFTDeatilModal';
import BuyModal from 'modals/BuyModal';
import { getSignProvider, walletAddress } from 'helpers/helper';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom/dist';

const source = axios.CancelToken.source();
const cancelToken = source.token;

const NFTStaking = () => {
  const {web3, walletAddress, nftContract, stakingContract, onConnect, onDisconnect, walletStringHelper, onCheckNetwork} = useOutletContext();
  
  let nftSliderRef = useRef();
  let stakingSliderRef = useRef();
  const { auth } = useSelector((state) => state);
  const [userOwnNFT, setUserOwnNFT] = useState([]);
  const [stakedNFT, setStakedNFT] = useState([]);
  const [isStack, setIsStack] = useState(false);
  const [isUnStack, setIsUnStack] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [selID, setSelID] = useState('');
  const [stackValues, setStackValues] = useState({
    level: 1,
    amount: 1,
  });
  const [unStackValues, setUnStackValues] = useState({
    level: 1,
    amount: 1,
  });

  const settings = {
    dots: false,
    infinite: false,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const nftNext = () => {
    nftSliderRef.current.slickNext();
  };

  const nftPrev = () => {
    nftSliderRef.current.slickPrev();
  };

  const stakingNext = () => {
    stakingSliderRef.current.slickNext();
  };

  const stakingPrev = () => {
    stakingSliderRef.current.slickPrev();
  };
  
  const notifySucess = (msg) =>{
    toast.success(msg);
  }

  const notifyError = (msg) =>{
    toast.error(msg);
  }

  const userStakeNFT = async () => {
    try {
      const { ercMarketPlace } = getSignProvider();
      await ercMarketPlace.StakeNFT(stackValues?.level, stackValues?.amount);
      toast.success('NFT staked successfully!');
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const getUserOwnNFT = async (userWalletAddress) => {    
    const nftNotStaked = await nftContract.methods.listMyNFTs(userWalletAddress).call();
    const nftStaked = await stakingContract.methods.listNFTStakedForAddress(userWalletAddress).call();
    setUserOwnNFT(nftNotStaked);
    setStakedNFT(nftStaked);
    // setUserOwnNFT(allApis?.data?.result);
    //     let data = [];
    //     for (let index = 0; index < balances?.length; index++) {
    //       allApis?.data?.result?.map((nft) => {
    //         if (+nft?.token_id === +balances[index]?.toNumber()) {
    //           data?.push(nft);
    //         }
    //       });
    //     }
    // setStakedNFT(data);    
  };

  const unUserStakeNFT = async () => {
    try {
      const { ercMarketPlace } = getSignProvider();
      await ercMarketPlace.unstake(unStackValues?.level, unStackValues?.amount);
      toast.success('NFT unstaked successfully!');
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const updateData = () =>{
    getUserOwnNFT(walletAddress);
  }

  useEffect(() => {
    if (walletAddress) {
      getUserOwnNFT(walletAddress);
    } else {
      setUserOwnNFT([]);
      setStakedNFT([]);
    }
  }, [walletAddress]);

  return (
    <>
      <div className='nftStakingDiv DBlock'>
        <div className='nftStakingBlock DBlock'>
          <div className='title DFlex'>
            <h3>All NFT'S</h3>
            {userOwnNFT?.length > 0 && (
              <div className='actionBtns DFlex'>
                <button
                  className='prevIcon DFlex justify-content-center'
                  onClick={nftPrev}>
                  <RiArrowDropLeftLine />
                </button>
                <Link to=''>See All</Link>
                <button
                  className='nextIcon DFlex justify-content-center'
                  onClick={nftNext}>
                  <RiArrowDropRightLine />
                </button>
              </div>
            )}
          </div>
          {userOwnNFT?.length > 0 ? (
            <Slider
              {...settings}
              ref={nftSliderRef}
              className='nftStakingSlider'>
              {userOwnNFT?.map((nft, ind) => (
                <div className='px-2' key={`nftStakingAllCardKey${nft}`}>
                  <div
                    className='nftStakingCard DBlock'
                    onClick={() => {setIsStack(true); setSelID(nft);}}>
                    <img
                      src={
                        nft?.token_uri
                          ? nft?.token_uri
                          : `https://megafans.mypinata.cloud/ipfs/QmebhFnQA35j4yGhGyNrGumBkuTmPFYr3NLvdxk3irvcBj/${nft}.jpg`
                      }
                      alt='NFT Staking Img'
                      className='nftStakingImg'
                    />
                    {/* <div className='overlay DFlex'>
                      <div className='content'>
                        <p>
                          {nft?.name?.slice(0, 15)}{' '}
                          {nft?.name?.length > 15 ? '...' : ''}
                        </p>
                      </div>
                      <button>Stack</button>
                    </div> */}
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
           ''
          )}
            <div className='buyNFTBtnDiv DFlex justify-content-center' onClick={()=>{
              {walletAddress?setIsBuying(true):onConnect()}}}>
              <span>Buy NFT</span>
            </div>
        </div>
        <div className='nftStakingBlock DBlock'>
          <div className='title DFlex'>
            <h3>Staked NFT'S</h3>
            {stakedNFT?.length > 0 && (
              <div className='actionBtns DFlex'>
                <button
                  className='prevIcon DFlex justify-content-center'
                  onClick={stakingPrev}>
                  <RiArrowDropLeftLine />
                </button>
                <Link to=''>See All</Link>
                <button
                  className='nextIcon DFlex justify-content-center'
                  onClick={stakingNext}>
                  <RiArrowDropRightLine />
                </button>
              </div>
            )}
          </div>
          {stakedNFT?.length > 0 ? (
            <Slider
              {...settings}
              ref={stakingSliderRef}
              className='nftStakingSlider'>
              {stakedNFT?.map((nft, ind) => (
                <div
                  className='px-2'
                  sm={12}
                  md={4}
                  key={`nftStakingCardKey${nft}`}>
                  <div
                    className='nftStakingCard DBlock'
                    onClick={() => {setIsUnStack(true); setSelID(nft);}}>
                    <img
                      src={
                        nft?.token_uri
                          ? nft?.token_uri
                          : `https://megafans.mypinata.cloud/ipfs/QmebhFnQA35j4yGhGyNrGumBkuTmPFYr3NLvdxk3irvcBj/${nft}.jpg`
                      }
                      alt='NFT Staking Img'
                      className='nftStakingImg'
                    />
                    {/* <div className='overlay DFlex'>
                      <div className='content'>
                        <p>
                          {nft?.name?.slice(0, 15)}{' '}
                          {nft?.name?.length > 15 ? '...' : ''}
                        </p>
                      </div>
                      <button>Unstacked</button>
                    </div> */}
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className='stakeNFTBtnDiv DFlex justify-content-center'>
              <p>No Staked NFT</p>
            </div>
          )}
        </div>
      </div>
      {isStack && (
        <NFTDeatilModal          
          id={selID}
          walletAddress={walletAddress}
          nftContract={nftContract}
          stakingContract={stakingContract}
          show={isStack}
          notifySucess={notifySucess}
          notifyError={notifyError}
          updateData={updateData}
          handleClose={() => {
            setIsStack(false);
            setStackValues({
              level: 1,
              amount: 1,
            });
          }}
          onCheckNetwork = {onCheckNetwork}
          page='staking'
          isStack={true}
          stackHandler={userStakeNFT}
          levelHandler={(e) =>
            setStackValues({ ...stackValues, level: e?.target?.value })
          }
        />
      )}
      {isUnStack && (
        <NFTDeatilModal
          id={selID}
          walletAddress={walletAddress}
          nftContract={nftContract}
          stakingContract={stakingContract}
          show={isUnStack}
          notifySucess={notifySucess}
          notifyError={notifyError}
          updateData={updateData}
          handleClose={() => {
            setIsUnStack(false);
            setUnStackValues({
              level: 1,
              amount: 1,
            });
          }}
          page='staking'
          onCheckNetwork = {onCheckNetwork}
          isStack={false}
          stackHandler={unUserStakeNFT}
          levelHandler={(e) =>
            setUnStackValues({ ...unStackValues, level: e?.target?.value })
          }
        />
      )}
      {isBuying && (
        <BuyModal          
          walletAddress={walletAddress}
          nftContract={nftContract}
          stakingContract={stakingContract}
          show={isBuying}
          notifySucess={notifySucess}
          notifyError={notifyError}
          updateData={updateData}
          onCheckNetwork = {onCheckNetwork}
          handleClose={() => {
            setIsBuying(false);            
          }}
          page='pricing'
        />
      )}          
    </>
  );
};

export default NFTStaking;
