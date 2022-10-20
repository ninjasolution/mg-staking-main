import PricingCard from 'components/pricing/PricingCard';
import { pricingList } from 'helpers/helper';
import { useState, useEffect } from 'react';
import { Modal, Row, Col, Table } from 'react-bootstrap';
import { MdCancel } from 'react-icons/md';
import ConguragsNFTMsg from './ConguragsNFTMsg';
import PaymentCard from './PaymentCard';
import axios from 'axios';
import { instance } from 'index';
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';


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
  onCheckNetwork,
  pricing
}) => {  
  const [nftInfo, setNftInfo] = useState({});  
  const [isHistory, setIsHistory] = useState(false);
  const [totalWon, setTotalWon] = useState(0);
  const [totalWonDollar, setTotalWonDollar] = useState(0);
  const { auth } = useSelector((state) => state);

  const [historyData, setHistoryData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchHistoryData = async () => {
    try {
      let result = await instance.get(`api/NFT/ListNFTRewards?PageNumber=${pageNum}&PageSize=${rowsPerPage}&nftId=${id}`, {
        headers: { Authorization: `Bearer ${auth?.user?.token}` },
      });
      if (result?.status === 200){
        setHistoryData(result?.data?.data);
        setTotalPage(result?.data?.totalPages);
      }        
    } catch (error) {
      notifyError(error);
      throw error;
    }
  }

  const fetchTotalWon = async () => {
    try {      
      let result = await instance.get(`/api/NFT/ListTotalNFTRewards?nftId=${id}`, {
        headers: { Authorization: `Bearer ${auth?.user?.token}` },
      });
      if (result?.status === 200){
        setTotalWon(result?.data?.totalRewards);
        setTotalWonDollar(result?.data?.dollarValue);
      } 
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
      fetchTotalWon();
    }
  }, []);

  useEffect(()=>{fetchHistoryData();},[pageNum, rowsPerPage]);

  const onClickStake = async () => {
    onCheckNetwork();
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
                      src={`https://arcadeape.mypinata.cloud/ipfs/QmbJgMZXqPvvQJMrhQir9VDA8f8F8Hsm13MciJL5t3d4Lx/${id}.jpg`}
                      alt='NFT Staking Img'
                    />
                  </div>
                </Col>
                <Col sm={12} md={7}>
                  <div className='detailContent DBlock'>
                    <h3>Detail</h3>
                    <Row className="w-100">
                      <Col sm={12} md={4}>
                        <h6>Name:</h6>
                        <p>{nftInfo.name}</p>
                      </Col>
                      <Col sm={12} md={4}>
                        <h6>Category:</h6>
                        <p>{nftInfo.description}</p>
                      </Col>
                      <Col sm={12} md={4}>
                        <h6>Level:</h6>
                        <p>{nftInfo.level}</p>
                      </Col>
                      {
                        !isStack && (
                          <>
                            <Col sm={12} md={6}>
                              <h6>Tokens Won:</h6>
                              <p>{totalWon}</p>
                            </Col>
                            <Col sm={12} md={6}>
                              <h6>Won in Dollar:</h6>
                              <p>{totalWonDollar}</p>
                            </Col>
                          </>
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
              <>
                <Row className='mb-4'>
                  <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1">
                    <p>Rows Per Page</p> &nbsp;&nbsp;&nbsp;
                    <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic" className='d-flex justify-content-end align-items-center' style={{width: 100}}>
                        {rowsPerPage}
                      </Dropdown.Toggle>

                      <Dropdown.Menu >
                        <Dropdown.Item className='d-flex justify-content-end align-items-center' onClick={()=>{setRowsPerPage(15); setPageNum(1);}}>15</Dropdown.Item>
                        <Dropdown.Item className='d-flex justify-content-end align-items-center' onClick={()=>{setRowsPerPage(20); setPageNum(1);}}>20</Dropdown.Item>
                        <Dropdown.Item className='d-flex justify-content-end align-items-center' onClick={()=>{setRowsPerPage(30); setPageNum(1);}}>30</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col sm={12} md={6} className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" onClick={()=>{setPageNum(1)}}>&lt;&lt;</Button>  &nbsp;
                    <Button variant="primary" onClick={()=>{setPageNum(pageNum == 1?1:pageNum - 1)}}>&lt;</Button>&nbsp;
                    <Button variant="primary" >{pageNum}</Button>&nbsp;
                    <Button variant="primary" onClick={()=>{setPageNum(pageNum == totalPage?totalPage:pageNum + 1)}}>&gt;</Button>&nbsp;
                    <Button variant="primary" onClick={()=>{setPageNum(totalPage)}}>&gt;&gt;</Button>&nbsp;
                  </Col>                
                </Row>
                <Row>
                  <Table bordered variant="light" style={{color: 'black'}}>
                    <thead>
                      <tr>                        
                        <th>Game Name</th>
                        <th>Tournament</th>
                        <th>Date</th>
                        <th>Percent</th>
                        <th>Tokens</th>
                      </tr>
                    </thead>
                    <tbody>
                    {historyData.map((data) => (
                      <tr>                      
                        <td>{data.gameName}</td>
                        <td>{data.tournament}</td>
                        <td>{new Date(`${data.date}Z`).toLocaleString('en-US', { hour12: false }).substring(0, new Date(`${data.date}Z`).toLocaleString('en-US', { hour12: false }).lastIndexOf(':'))}</td>
                        <td>{parseFloat(data.percent.substring(0, data.percent.length - 1)).toFixed(2) + '%'}</td>                      
                        <td>{data.tokens}</td>
                      </tr>
                    ))}                    
                    </tbody>
                  </Table>
                </Row>
              </>              
            )}            
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default NFTDeatilModal;
