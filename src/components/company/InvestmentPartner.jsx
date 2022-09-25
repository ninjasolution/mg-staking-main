import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineRight } from 'react-icons/ai';
import ImageCard from 'components/common/cards/ImageCard';
import { Link } from 'react-router-dom';

const InvestmentPartner = () => {
  return (
    <section className='investmentPartnerSec DBlock'>
      <Container>
        <Row>
          <Col sm={12} md={7}>
            <div className='leftCryptDiv'>
              <div className='title DFlex flex-column align-items-start justify-content-center'>
                <h2>
                  <strong>Your</strong> Crypto <br /> Investment{' '}
                  <strong>Partner</strong>
                </h2>
              </div>
              <p>
                Crypto, the future of economy, which doesn't differeciate
                anybody based on color, gender, caste and geography. Crypto
                innovation sees World as one."
                <br /> This new frontier needs tools, which empowers a retail
                investor to make the best of the opportunities presented and
                prosper. We a small team of professionals buckled up for this
                purpose.
                <br /> We are continously building and iterating to personalize
                the functionality and experience to you. Committed to security
                and personalization.
              </p>
              <div className='mt-5'>
                <Link to='/stake-card'>
                  <button>
                    Stake Matic
                    <span>
                      <AiOutlineRight />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </Col>
          <Col sm={12} md={{ span: 4, offset: 1 }}>
            <ImageCard cardImg='cryptoPartner' />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default InvestmentPartner;
