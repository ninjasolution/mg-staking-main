import { Container, Row, Col } from 'react-bootstrap';
import { GrFormNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';

const FAQQuestions = () => {
  let faqId = 423223231231;
  return (
    <div className='faqQuestionPage DBlock'>
      <Container>
        <div className='faqQuestionDiv DBlock'>
          <div className='title'>
            <h2>
              <strong>Your</strong> Crypto Investment <br />{' '}
              <strong>Partner</strong>
            </h2>
          </div>
          <Row>
            <Col className='faqQuestionCol' sm={12} md={6} lg={3}>
              <div className='faqQuestionCard DBlock'>
                <div className='cardImg DFlex justify-content-center'>
                  <img
                    src='/assets/svgs/mega.svg'
                    alt='megaImg'
                    className='megaImg'
                  />
                </div>
                <h4>How can I pay for service</h4>
                <div className='detailLink DFlex justify-content-end'>
                  <Link to={`/faq/questions/detail/${faqId}`}>
                    <GrFormNext />
                  </Link>
                </div>
              </div>
            </Col>
            <Col className='faqQuestionCol' sm={12} md={6} lg={3}>
              <div className='faqQuestionCard DBlock'>
                <div className='cardImg DFlex justify-content-center'>
                  <img
                    src='/assets/svgs/mega.svg'
                    alt='megaImg'
                    className='megaImg'
                  />
                </div>
                <h4>The difference between hosting plans</h4>
                <div className='detailLink DFlex justify-content-end'>
                  <Link to={`/faq/questions/detail/${faqId}`}>
                    <GrFormNext />
                  </Link>
                </div>
              </div>
            </Col>
            <Col className='faqQuestionCol' sm={12} md={6} lg={3}>
              <div className='faqQuestionCard DBlock'>
                <div className='cardImg DFlex justify-content-center'>
                  <img
                    src='/assets/svgs/mega.svg'
                    alt='megaImg'
                    className='megaImg'
                  />
                </div>
                <h4>How to change your hosting plan</h4>
                <div className='detailLink DFlex justify-content-end'>
                  <Link to={`/faq/questions/detail/${faqId}`}>
                    <GrFormNext />
                  </Link>
                </div>
              </div>
            </Col>
            <Col className='faqQuestionCol' sm={12} md={6} lg={3}>
              <div className='faqQuestionCard DBlock'>
                <div className='cardImg DFlex justify-content-center'>
                  <img
                    src='/assets/svgs/mega.svg'
                    alt='megaImg'
                    className='megaImg'
                  />
                </div>
                <h4>Masternode Payments</h4>
                <div className='detailLink DFlex justify-content-end'>
                  <Link to={`/faq/questions/detail/${faqId}`}>
                    <GrFormNext />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default LayoutWithoutHeader(FAQQuestions, '/faq');
