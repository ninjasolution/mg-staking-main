import Home from 'components/common/Home';
import Layout from 'layouts/Layout';
import NFTDeatilModal from 'modals/NFTDeatilModal';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { FcNext, FcPrevious } from 'react-icons/fc';

const MarketPlace = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='marketPlacePagae'>
        <Home
          title='Shop our latest collection'
          description='MATIC is a token on the Ethereum blockchain. Polygon is a protocol and a framework for building and connecting Ethereum-compatible blockchain networks.'
          imageUrl='/assets/images/marketPlace.png'
        />
        <section className='marketNfts DBlock'>
          <Container>
            <h3>mEGAfAN nft’S</h3>
            <Row className='justify-content-between mb-5'>
              <Col sm={12} md={4}>
                <select name='name' id='name'>
                  <option value='1'>Market</option>
                  <option value='2'>Home</option>
                  <option value='3'>Appratment</option>
                </select>
              </Col>
              <Col sm={12} md={4}>
                <div className='searchForm DFlex'>
                  <FaSearch />
                  <input
                    type='text'
                    placeholder='Tap to search from the list'
                  />
                  <button>Search</button>
                </div>
              </Col>
            </Row>
            <div className='marketNftCards DBlock'>
              <Row>
                {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2]?.map((nft, ind) => (
                  <Col key={`MarketNftCardKey${ind}`} sm={12} md={6} lg={4} xl={3}>
                    <div className='marketNftCard DBlock'>
                      <img
                        src={`/assets/images/nftStaking/nftStakingImg${nft}.png`}
                        alt='Market Nft Card'
                        className='mainImg'
                      />
                      <div className='overlay DFlex'>
                        <div className='content'>
                          <p>
                            Name: <span>username{ind + 1}</span>
                          </p>
                        </div>
                        <button onClick={handleShow}>See More</button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <div className='nftPagination DFlex justify-content-center'>
                <button className='arrow prev'>
                  <FcPrevious />
                </button>
                <ul className='numberUl DFlex justify-content-cente'>
                  <li>
                    <button>1</button>
                  </li>
                  <li>
                    <button>2</button>
                  </li>
                  <li>
                    <button>3</button>
                  </li>
                  <li>
                    <button>...</button>
                  </li>
                  <li>
                    <button>32</button>
                  </li>
                </ul>
                <button className='arrow prev'>
                  <FcNext />
                </button>
              </div>
            </div>
          </Container>
        </section>
      </div>
      <NFTDeatilModal show={show} handleClose={handleClose} />
    </>
  );
};

export default Layout(MarketPlace);
