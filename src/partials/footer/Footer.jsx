import { Col, Container, Row } from 'react-bootstrap';
import { RiVisaLine, RiMastercardFill } from 'react-icons/ri';
import { FaBitcoin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CPRYT from 'partials/cpryt/CPRYT';

const Footer = () => {
  return (
    <footer
      className='DBlock'
      style={{
        background:
          'url("/assets/images/footerBg.jpeg") no-repeat center/cover',
      }}>
      <img
        src='/assets/images/rocket.png'
        alt='Rocket'
        className='footerPosImg'
      />
      <Container>
        <Row>
          <Col sm={12} md={2} xl={3}>
            <div className='footerLogo DBlock'>
              <img src='/assets/svgs/logo.svg' alt='Footer Logo' />
            </div>
          </Col>
          <Col sm={12} md={2} xl={3}>
            <div className='footerLinks DBlock'>
              <h6>Quick Link</h6>
              <Link to='/'>Company</Link>
              <Link to='/services'>Services</Link>
              <Link to='/contatc'>Contact</Link>
            </div>
          </Col>
          <Col sm={12} md={3} xl={3}>
            <div className='footerLinks DBlock'>
              <h6>Resources</h6>
              <Link to='/pricing'>Pricing</Link>
              <Link to='/newsroom'>Newsroom</Link>
              <Link to='/faq'>FAQ</Link>
            </div>
          </Col>
          <Col sm={12} md={5} xl={3}>
            <div className='footerPayment DBlock'>
              <p>We accept following payment systems</p>
              <div className='paymentImgs DFlex'>
                <button>
                  <RiVisaLine />
                </button>
                <button>
                  <RiMastercardFill />
                </button>
                <button>
                  <FaBitcoin />
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <CPRYT />
    </footer>
  );
};

export default Footer;
