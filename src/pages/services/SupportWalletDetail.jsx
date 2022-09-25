import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineRight } from 'react-icons/ai';

const SupportWalletDetail = () => {
  return (
    <section className='supportWalletDetailSec DBlock'>
      <Container>
        <div className='title DFlex flex-column align-items-center mb-4'>
          <h2>
            <strong>Your </strong> Crypto Investment <br />{' '}
            <strong>Partner</strong>
          </h2>
        </div>
        <div className='supportWalletDetailDiv'>
          <img
            src='/assets/images/services/star.png'
            alt='starImg'
            className='starImg'
          />
          <img
            src='/assets/images/liteCoin.png'
            alt='liteCoin'
            className='liteCoin'
          />
          <img
            src='/assets/images/services/toprightRing.png'
            alt='topRightRing'
            className='topRightRing'
          />
          <img
            src='/assets/images/services/bottomRing.png'
            alt='bottomRing'
            className='bottomRing'
          />
          <img
            src='/assets/images/services/mobile.png'
            alt='mobileImg'
            className='mobileImg'
          />
          <Row>
            <Col sm={12} lg={3}></Col>
            <Col sm={12} lg={9}>
              <Row>
                <div className='topContentWrap DFlex align-items-end'>
                  <Col sm={12} lg={6} xl={4}>
                    <div className='topDes'>
                      <img
                        src='/assets/images/services/etherum.png'
                        alt='etherum'
                      />
                      <h2>Ethereum 2.0</h2>
                      <p>Validator Nodes</p>
                    </div>
                  </Col>
                  <Col sm={12} lg={6} xl={3}>
                    <div className='topDes'>
                      <h4>Capitalization</h4>
                      <p>$ 169B</p>
                    </div>
                  </Col>
                  <Col sm={12} lg={6} xl={5}>
                    <div className='topDes'>
                      <h4 className='supportWallet'>
                        Supported hardware wallets
                      </h4>
                      <div className='megaFan'>
                        <div className='cardImg DFlex justify-content-center'>
                          <img
                            src='/assets/svgs/mega.svg'
                            alt='megaImg'
                            className='megaImg'
                          />
                        </div>
                        <p>Megafans</p>
                      </div>
                    </div>
                  </Col>
                </div>
              </Row>
              <div className='middleContentWrap'>
                <Row>
                  <Col sm={12} xl={4}>
                    <img src='/assets/images/hosting.png' alt='hosting' />
                    <h1>Hosting</h1>
                    <button>
                      Host now{' '}
                      <span>
                        <AiOutlineRight />
                      </span>
                    </button>
                  </Col>
                  <Col sm={12} xl={8}>
                    <div className='middleRightDes'>
                      <h1>Validator Nodes</h1>
                      <div className='nodesDes'>
                        <div className='nodesValidator'>
                          <h4>Hosting</h4>
                          <p>$5/month</p>
                          <h4>Price</h4>
                          <p>$50,348.64</p>
                        </div>
                        <div className='nodesValidator'>
                          <h4>Required</h4>
                          <p>32 ETH</p>
                          <h4>Nodes Online</h4>
                          <p>416,750</p>
                        </div>
                        <div className='nodesValidator'>
                          <h4>APR</h4>
                          <p>4.28%</p>
                          <h4>Monthly income</h4>
                          <p>$179.57</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className='lastContentWrap DFlex'>
                <div className='beaconNode'>
                  <h1>Beacon Nodes</h1>
                  <p>Soon in Q3-Q4 2022</p>
                </div>
                <div className='notifyBtn'>
                  <button>
                    NOTIFY{' '}
                    <span>
                      <AiOutlineRight />
                    </span>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default LayoutWithoutHeader(SupportWalletDetail, '/services');
