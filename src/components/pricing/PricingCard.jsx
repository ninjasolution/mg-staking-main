import { AiOutlineRight } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { getProvider, walletAddress } from 'helpers/helper';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import marketPlaceABI from 'config/marketPlaceABI.json';
import { useSelector } from 'react-redux';
import WalletModal from 'modals/WalletModal';

const PricingCard = ({mintAddress, updateData, nftContract, stakingContract, list, handleShow, level }) => {
  const { auth } = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const [pricingData, setPricingData] = useState({
    price: null,
    avaiable: null,
    wonRate: null,
  });

  const handleWalletClose = () => setShow(false);
  const handleWalletShow = () => setShow(true);

  const getLevelPrice = async (level) => {
    const price = await nftContract.methods.mintPricePerLevel(level).call();
    const levelLimit = await nftContract.methods.mintLimitPerLevel(level).call();
    const levelMinted = await nftContract.methods.mintedPerLevel(level).call();
    const totalValue = await stakingContract.methods.getTotalValueStaked().call();
    setPricingData({
      price: price,
      avaiable: (levelLimit - levelMinted)?.toString(),
      wonRate: (level / totalValue * 100).toFixed(2)
    });
  };

  const buyNFT = async () => {
    nftContract.methods.levelMint(1, parseInt(level)).estimateGas({
      from: mintAddress,
      value: pricingData?.price
    }).then(result => {
      nftContract.methods.levelMint(1, parseInt(level)).send({
        from: mintAddress,
        value: pricingData?.price
      }).then(result => {toast.success('Success!');updateData();handleShow();})
    })
    .catch(err => {
      // let data = JSON.parse(err.message.substring(err.message.indexOf('{'), err.message.indexOf('}') + 1));
      // console.log(data);
      toast.error(err.message);      
    });
  };

  useEffect(() => {
    getLevelPrice(level);
  }, []);

  return (
    <>
      <div className='pricingDiv DBlock'>
        <div className='heading DFlex'>
          <h4>{list?.plan}</h4>{' '}
          <p>
            <img src='/assets/images/ethImg.png' />{' '}
            {pricingData?.price / 1000000000000000000}
          </p>
        </div>
        <div className='bodyContent DBlock'>
          <h6>
            Avaiable <span>{pricingData?.avaiable}</span>
          </h6>
          <p>People are winning {pricingData?.wonRate}% at the moment by staking</p>
          <br/>
          <h6>Perks:</h6>
          <ul>
            {list?.features?.map((feature) => (
              <li key={`FeaturedPricingKey${list?.id}More${feature?.id}`}>
                <span>
                  <AiFillStar />
                </span>
                <p>{feature?.text}</p>
              </li>
            ))}
          </ul>
          <div className='intersetDiv text-center'>
            <p>*interest-earning privileges with access to fan-level perks</p>
          </div>
          <div className='plansBtn'>
            {/* {auth?.walletInfo?.account ? (
              <>
                <button onClick={handleShow}>
                  Buy with cc
                  <span>
                    <AiOutlineRight />
                  </span>
                </button>
                <button className='outline' onClick={buyNFT}>
                  Matic/Eth{' '}
                  <span>
                    <AiOutlineRight />
                  </span>
                </button>
              </>
            ) : (
              <button className='outline' onClick={handleWalletShow}>
                Connect Wallet
                <span>
                  <AiOutlineRight />
                </span>
              </button>
            )} */}
            <button onClick={()=>{buyNFT();}}>
              Buy with Matic{' '}
              <span>
                <AiOutlineRight />
              </span>
              </button>
          </div>
        </div>
      </div>
      <WalletModal
        // pageFrom='login'
        // loginUser={loginUser}
        show={show}
        handleClose={handleWalletClose}
      />
    </>
  );
};

export default PricingCard;
