import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';

const Home = ({ title, description, imageUrl }) => {
  return (
    <div className='homeSec DBlock'>
      <Container>
        <div className='homeDiv DBlock'>
          <Row className='align-items-center flex-wrap-reverse'>
            <Col sm={12} md={7}>
              <div className='homeContent'>
                <p className='commissionContent'>
                  <Link to='/stake-card'>
                    STAKE MATIC{' '}
                    <span>
                      <AiOutlineRight />
                    </span>
                  </Link>
                  with 0% commission
                </p>
                <h1>{title}</h1>
                <p>{description}</p>
                <div className='homeBtnsDiv'>
                  <Link to='/sign-up'>
                    Create Account{' '}
                    <span>
                      <AiOutlineRight />
                    </span>
                  </Link>
                  {/* <Link to='/sign-in' className='outline'>
                    Login{' '}
                    <span>
                      <AiOutlineRight />
                    </span>
                  </Link> */}
                </div>
              </div>
            </Col>
            <Col sm={12} md={5}>
              <div className='homeImage DFlex justify-content-center'>
                <img src={imageUrl} alt='homeImg' />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Home;
