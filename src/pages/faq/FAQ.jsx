import Layout from 'layouts/Layout';
import Home from 'components/common/Home';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { AiOutlineQuestionCircle, AiTwotoneSetting } from 'react-icons/ai';
import { FaBookMedical } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';

const FAQ = () => {
  return (
    <div className='faqPage DBlock'>
      <Home
        title='Advice and answers from the meGAfans Team'
        description='Chorus One helps you securely increase your crypto holdings by participating in decentralized networks.'
        imageUrl='/assets/images/bitCoinImg.png'
      />
      <div className='faqSec DBlock'>
        <Container>
          <div className='newsRoomDiv DBlock'>
            <div className='title DFlex justify-content-center flex-column'>
              <h2>
                <strong>Frequently Asked </strong> <br /> Questions
              </h2>
            </div>
            <div className='faqCardWrap'>
              <Row>
                <Col className='faqCardCol' sm={12} md={6} lg={3}>
                  <div className='faqCard DBlock'>
                    <span className='faqIcon'>
                      <AiOutlineQuestionCircle />
                    </span>
                    <h6>General Questions</h6>
                    <p>
                      5 articles in this collection Written by MEGAFANS Team
                    </p>
                    <Link to='/faq/questions'>
                      Read more <FiArrowRight />
                    </Link>
                  </div>
                </Col>
                <Col className='faqCardCol' sm={12} md={6} lg={3}>
                  <div className='faqCard DBlock'>
                    <span className='faqIcon'>
                      <FaBookMedical />
                    </span>
                    <h6>Validator Nodes</h6>
                    <p>
                      20 articles in this collection Written by MEGAFANS Team
                    </p>
                    <Link to='/faq/questions'>
                      Read more <FiArrowRight />
                    </Link>
                  </div>
                </Col>
                <Col className='faqCardCol' sm={12} md={6} lg={3}>
                  <div className='faqCard DBlock'>
                    <span className='faqIcon'>
                      <BsBoxSeam />
                    </span>
                    <h6>Full Nodes</h6>
                    <p>
                      2 articles in this collection Written by MEGAFANS Team
                    </p>
                    <Link to='/faq/questions'>
                      Read more <FiArrowRight />
                    </Link>
                  </div>
                </Col>
                <Col className='faqCardCol' sm={12} md={6} lg={3}>
                  <div className='faqCard DBlock'>
                    <span className='faqIcon'>
                      <AiTwotoneSetting />
                    </span>
                    <h6>Staking</h6>
                    <p>
                      35 articles in this collection Written by MEGAFANS Team
                    </p>
                    <Link to='/faq/questions'>
                      Read more <FiArrowRight />
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Layout(FAQ);
