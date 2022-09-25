import PricingCard from 'components/pricing/PricingCard';
import { pricingList } from 'helpers/helper';
import { useState, useEffect } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { MdCancel } from 'react-icons/md';
import ConguragsNFTMsg from './ConguragsNFTMsg';
import PaymentCard from './PaymentCard';
import axios from 'axios';

const NFTDeatilModal = ({
  id,
  walletAddress,
  nftContract,
  stakingContract,
  show,
  handleClose,
  page = '',
  isStack = false,
  notifySucess,
  notifyError,
  updateData,
  pricing
}) => {
  const [isCC, setIsCC] = useState(page === 'pricing' ? true : false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPricing, setIsPricing] = useState(false);
  const [nftInfo, setNftInfo] = useState({});  
 
  useEffect(()=>{
    if (id){
      axios.get(`https://arcadeape.mypinata.cloud/ipfs/QmbJgMZXqPvvQJMrhQir9VDA8f8F8Hsm13MciJL5t3d4Lx/${id}.json`).then((res)=>{
        let info = res.data;
        nftContract.methods.levelOfId(id).call().then((lvl)=>{
          info.level = lvl;
          setNftInfo(info);
        });
      });
    }    
    if (pricing){
      setIsPricing(pricing);
    }
  }, []);

  const onClickStake = async () => {
    if (isStack){
      nftContract.methods.safeTransferFrom(walletAddress, stakingContract._address, id).estimateGas({
        from: walletAddress
      }).then(result => {
        nftContract.methods.safeTransferFrom(walletAddress, stakingContract._address, id).send({
          from: walletAddress
        }).then(result => {notifySucess('Success!');handleClose();updateData();})
      })
      .catch(err => {        
        notifyError(err.message);
        handleClose();
        updateData();
      });
    } else {
      stakingContract.methods.unstakeNft(id, walletAddress).estimateGas({
        from: walletAddress
      }).then(result => {
        stakingContract.methods.unstakeNft(id, walletAddress).send({
          from: walletAddress
        }).then(result => {notifySucess('Success!');handleClose();updateData();})
      })
      .catch(err => {
        notifyError(err.message);
        handleClose();
        updateData();
      });
    }
  }

  return (
    <Modal
      className={`nftDeatilModal ${isPricing && 'pricingLarge'}`}
      show={show}
      size='lg'
      onHide={handleClose}
      backdrop='static'
      keyboard={false}>
      <Modal.Body>
        <div className='nftDeatilModalBody DFlex'>
          <button
            className='closeBtn'
            onClick={() => {
              handleClose();
              setIsSuccess(false);
              setIsCC(false);
              setIsPricing(false);
            }}>
            <MdCancel />
          </button>
          <div className='nftDeatilModalDiv DBlock'>
            {page !== 'pricing' && !isPricing && !isCC && !isSuccess && (
              <Row>
                <Col sm={12} md={5}>
                  <div className='detailImg DBlock'>
                    <img
                      src={`https://arcadeape.mypinata.cloud/ipfs/QmWSWEzMFmR5YS6y9CpTR3dCcsqwLaVA5vAPLYFQ5NCrCP/${id}.png`}
                      alt='NFT Staking Img'
                    />
                  </div>
                </Col>
                <Col sm={12} md={7}>
                  <div className='detailContent DBlock'>
                    <h3>Detail</h3>
                    <Row>
                      <Col sm={12} md={6}>
                        <h6>Name:</h6>
                        <p>{nftInfo.name}</p>
                      </Col>
                      <Col sm={12} md={6}>
                        <h6>Category:</h6>
                        <p>{nftInfo.description}</p>
                      </Col>
                      <Col sm={12} md={6}>
                        <h6>Assigend Level:</h6>
                        <p>{nftInfo.level}</p>
                      </Col>
                      {/* <Col sm={12} md={6}>
                        <h6>Date:</h6>
                        <p>12-12-2022</p>
                      </Col> */}
                    </Row>
                    <div className='btnDivs DFlex justify-content-start'>
                      {page === 'staking' ? (
                        <>
                          <button
                            onClick={() => {
                              handleClose();
                              setIsSuccess(false);
                              setIsCC(false);
                              setIsPricing(false);
                            }}
                            className='outline DFlex justify-content-center'>
                            Cancel
                          </button>
                          <button
                            onClick={onClickStake}
                            className='DFlex justify-content-center'>
                            {isStack ? 'Stake NFT' : 'Unstake NFT'}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setIsPricing(true)}
                          className='DFlex justify-content-center'>
                          Buy
                        </button>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            )}
            {isPricing && !isSuccess && !isCC && (
              <div className='tabListing DBlock'>
                <Row>
                  <div className='DFlex justify-content-center'>
                    {pricingList?.map((list, ind) => (
                      <Col
                        sm={12}
                        md={6}
                        lg={4}
                        xl={3}
                        key={`PricingModalListCardKey${ind}`}>
                        <div className='mx-3 my-4'>
                          <PricingCard
                            list={list}
                            level={list?.id}
                            handleShow={() => {
                              setIsPricing(false);
                              setIsSuccess(true);
                            }}
                          />
                        </div>
                      </Col>
                    ))}
                  </div>
                </Row>
              </div>
            )}
            {isCC && !isSuccess && !isPricing && (
              <PaymentCard
                setIsCC={setIsCC}
                setIsSuccess={setIsSuccess}
                handleClose={handleClose}
                page={page}
              />
            )}
            {isSuccess && !isPricing && !isCC && <ConguragsNFTMsg />}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default NFTDeatilModal;
