import PricingCard from 'components/pricing/PricingCard';
import { pricingList } from 'helpers/helper';
import { useState, useEffect } from 'react';
import { Modal, Row, Col, Table } from 'react-bootstrap';
import { MdCancel } from 'react-icons/md';
import ConguragsNFTMsg from './ConguragsNFTMsg';
import PaymentCard from './PaymentCard';
import axios from 'axios';
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader
} from 'react-bs-datatable';
import { instance } from 'index';
import { useSelector } from 'react-redux';

const headers = [  
  { title: 'GameName', prop: 'gameName' },
  { title: 'Tournament', prop: 'tournament' },
  { title: 'Date', prop: 'date' },
  { title: 'Percent', prop: 'percent' },
  { title: 'Tokens', prop: 'tokens' },
];

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
  const [nftInfo, setNftInfo] = useState({});  
  const [isHistory, setIsHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [totalWon, setTotalWon] = useState(0);
  const { auth } = useSelector((state) => state);

  const fetchHistoryData = async () => {
    try {
      let result = await instance.get(`api/NFT/ListNFTRewards?PageNumber=1&PageSize=100&nftId=${id}`, {
        headers: { Authorization: `Bearer ${auth?.user?.token}` },
      });
      if (result?.status === 200) setHistoryData(result?.data?.data);
      result = await instance.get(`/api/NFT/ListTotalNFTRewards?nftId=${id}`, {
        headers: { Authorization: `Bearer ${auth?.user?.token}` },
      });
      if (result?.status === 200) setTotalWon(result?.data?.totalRewards);
    } catch (error) {
      notifyError(error);
      throw error;
    }
  }
 
  useEffect(()=>{
    if (id){
      axios.get(`https://megafans.mypinata.cloud/ipfs/QmXG4j7CkuCCTsGzAzeyFhXm2TP1TpFhhf6PPiMgLMUFCo/${id}.json`).then((res)=>{
        let info = res.data;
        nftContract.methods.levelOfId(id).call().then((lvl)=>{
          info.level = lvl;
          setNftInfo(info);
        });
      });
      fetchHistoryData();
    }
  }, []);

  const onClickStake = async () => {
    if (isStack){
      nftContract.methods.safeTransferFrom(walletAddress, stakingContract._address, id).estimateGas({
        from: walletAddress
      }).then(result => {
        nftContract.methods.safeTransferFrom(walletAddress, stakingContract._address, id).send({
          from: walletAddress
        }).then(result => {
          console.log(result);
          notifySucess('Success!');
          handleClose();
          updateData();
          try {
            instance.post(
              'api/NFT/Stake_nft',
              { transactionId: result.transactionHash },
              {
                headers: {
                  Authorization: `Bearer ${auth?.user?.token}`,
                },
              }
            );
          } catch (error) {
            console.log(error);
          }
        })
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
      className={`nftDeatilModal`}
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
              setIsHistory(false);
            }}>
            <MdCancel />
          </button>
          <div className='nftDeatilModalDiv DBlock'>
            {page !== 'pricing' && !isHistory && (
              <Row>
                <Col sm={12} md={5}>
                  <div className='detailImg DBlock'>
                    <img
                      src={`https://megafans.mypinata.cloud/ipfs/QmebhFnQA35j4yGhGyNrGumBkuTmPFYr3NLvdxk3irvcBj/${id}.jpg`}
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
                      {
                        !isStack && (
                          <Col sm={12} md={6}>
                            <h6>Tokens won from staking:</h6>
                            <p>{totalWon}</p>
                          </Col>
                        )
                      }
                      {/* <Col sm={12} md={6}>
                        <h6>Date:</h6>
                        <p>12-12-2022</p>
                      </Col> */}
                    </Row>
                    <div className='btnDivs DFlex justify-content-start'>
                      {
                        <>
                          <button
                            onClick={() => {
                              handleClose();                           
                              setIsHistory(false);
                            }}
                            className='outline DFlex justify-content-center'>
                            Cancel
                          </button>
                          {
                          !isStack && <button
                            onClick={()=>{setIsHistory(true)}}
                            className='history DFlex justify-content-center'>      
                            History                      
                          </button>
                          }
                          <button
                            onClick={onClickStake}
                            className='historyDFlex justify-content-center'>
                            {isStack ? 'Stake NFT' : 'Unstake NFT'}
                          </button>
                        </>
                      }
                    </div>
                  </div>
                </Col>
              </Row>
            )}
            {isHistory && (
              <Row>
                <DatatableWrapper body={historyData} headers={headers} paginationOptionsProps={{
                  initialState: {
                    rowsPerPage: 10,
                    options: [5, 10, 15, 20]
                  }
                }}>
                  <Row className="mb-4">
                    <Col
                      xs={12}
                      lg={4}
                      className="d-flex flex-col justify-content-end align-items-end"
                    >
                      <Filter />
                    </Col>
                    <Col
                      xs={12}
                      sm={6}
                      lg={4}
                      className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                    >
                      <PaginationOptions />
                    </Col>
                    <Col
                      xs={12}
                      sm={6}
                      lg={4}
                      className="d-flex flex-col justify-content-end align-items-end"
                    >
                      <Pagination />
                    </Col>
                  </Row>
                  <Table>
                    <TableHeader />
                    <TableBody />
                  </Table>
                </DatatableWrapper>
              </Row>
            )}            
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default NFTDeatilModal;
