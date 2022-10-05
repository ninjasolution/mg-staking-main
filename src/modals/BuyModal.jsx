import PricingCard from 'components/pricing/PricingCard';
import { pricingList } from 'helpers/helper';
import { useState, useEffect } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { MdCancel } from 'react-icons/md';
import ConguragsNFTMsg from './ConguragsNFTMsg';
import PaymentCard from './PaymentCard';
import axios from 'axios';

const BuyModal = ({
  walletAddress,
  nftContract,
  stakingContract,
  show,
  handleClose,
  page = '',
  notifySucess,
  notifyError,
  updateData  
}) => {
  const [isCC, setIsCC] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPricing, setIsPricing] = useState(page === 'pricing' ? true : false);
 
  useEffect(()=>{    
  }, []);

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
                            updateData={updateData}
                            mintAddress={walletAddress}
                            nftContract={nftContract}
                            stakingContract={stakingContract}
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
export default BuyModal;
