import { Container, Row, Col } from 'react-bootstrap';

const AboutMegaFan = () => {
  return (
    <section className='aboutSec DBlock'>
      <Container>
        <Row>
          <Col sm={12} lg={6} className='leftAboutSec'>
            <Row>
              <Col sm={12} lg={7} className='descWrap'>
                <div className='title'>hosted nodes</div>
                <div className='nodes'>12,751</div>
                <div className='title'>Value of hosted nodes</div>
                <div className='nodes'>$1275 130 59 130 59</div>
                <img
                  src='/assets/images/services/liteCoin.png'
                  alt='liteCoin'
                />
              </Col>
              <Col sm={12} lg={5} className='imgSec'>
                <img
                  src='/assets/images/services/aboutImg.png'
                  alt='aboutImg'
                />
              </Col>
            </Row>
          </Col>
          <Col sm={12} lg={6} className='rightAboutSec'>
            <div className='title'>
              <h2>
                <strong>About</strong> MEGAFANS
              </h2>
              <p>
                Praised for consistent reliability and stellar customer support,
                Allnodes offers an added advantage of practical and low-cost
                solutions to its users. Be it high-quality Hosting or Staking
                services, the users are the ones who benefit.Praised for
                consistent reliability and stellar customer support, Allnodes
                offers an added advantage of practical and low-cost solutions to
                its users.Praised for consistent reliability and stellar
                customer support, Allnodes offers an added advantage of
                practical and low-cost solutions to its users.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutMegaFan;
