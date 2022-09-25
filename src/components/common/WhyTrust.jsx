import { Col, Container, Row } from 'react-bootstrap';

const WhyTrust = ({ trustData }) => {
  return (
    <section className='whyTrustSec DBlock'>
      <Container>
        <div className='title DFlex flex-column align-items-center mb-4'>
          <h2>
            <strong>{trustData?.boldTitle}</strong> {trustData?.lightTitle}
          </h2>
          <p>{trustData?.description}</p>
        </div>
        <Row>
          <Col sm={12} md={4}>
            <div className='whyTrustContent DFlex flex-column align-items-center'>
              <div className='whyTrustRing DFlex justify-content-center'>
                <img src='/assets/svgs/services/uptime.svg' alt='uptimeIcon' />
              </div>
              <h1>100% UPTIME</h1>
              <p>of the node</p>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className='whyTrustContent DFlex flex-column align-items-center'>
              <div className='whyTrustRing income DFlex justify-content-center'>
                <img src='/assets/svgs/services/income.svg' alt='incomeIcon' />
              </div>
              <h1 className='income'>HIGHEST INCOME</h1>
              <p>0% fee for the next 115 days.</p>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className='whyTrustContent DFlex flex-column align-items-center'>
              <div className='whyTrustRing dashboard DFlex justify-content-center'>
                <img
                  src='/assets/svgs/services/dashboard.svg'
                  alt='dashboardIcon'
                />
              </div>
              <h1 className='dashboard'>DASHBOARD</h1>
              <p>Convenient</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyTrust;
