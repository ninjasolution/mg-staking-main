import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const SupportWallet = () => {
  return (
    <section className='supportWalletSec DBlock'>
      <Container>
        <div className='title DFlex justify-content-center flex-column'>
          <h2>
            <strong>Supported</strong> Wallets
          </h2>
          <p>Select your own easyness</p>
        </div>
        <Row className='supportWalletWrapper'>
          <Col sm={12} lg={4} className='leftSec'>
            <img
              src='/assets/images/services/supportWalletImg1.png'
              alt='supportWalletImg1'
              className='leftImg'
            />
          </Col>
          <Col sm={12} lg={5} className='middleSec'>
            <div className='contentWrapper DFlex '>
              <img src='/assets/images/services/etherum.png' alt='etherum' />
              <div className='detailContent'>
                <h2>Ethereum</h2>
                <span>Validator Nodes</span>
                <div className='marketAprSec DFlex mt-3'>
                  <div className='marketApr'>
                    <div className='title'>Market Cap</div>
                    <span>$ 169B</span>
                  </div>
                  <div className='apr'>
                    <div className='title'>APR</div>
                    <span>4.28%</span>
                  </div>
                </div>
              </div>
              <Link to='/services/supportWallet/details'>
                <button className=''>
                  Detail{' '}
                  <span>
                    <AiOutlineRight />
                  </span>
                </button>
              </Link>
            </div>
          </Col>
          <Col sm={12} lg={3} className='rightSec'>
            <img
              src='/assets/images/services/supportWalletImg2.png'
              alt='supportWalletImg2'
              className='rightImg'
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SupportWallet;
