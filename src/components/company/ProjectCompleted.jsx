import { Container, Row, Col } from 'react-bootstrap';

const ProjectCompleted = () => {
  return (
    <section className='projectCompletedSec DBlock'>
      <img
        src='/assets/images/positionItems/star.png'
        alt='starImg'
        className='starImg'
      />
      <Container>
        <Row>
          <Col sm={12} lg={8}>
            <div className='leftContentDiv'>
              <div className='title DFlex justify-content-start'>
                <h2>
                  <strong>Why People </strong> Trust <br /> Us ?
                </h2>
              </div>
              <Row>
                {[1, 2, 3].map((list, ind) => (
                  <Col sm={12} md={4} key={`projectComplete${ind}`}>
                    <div className='mt-3'>
                      <div className='projectComplete'>
                        <h1>540+</h1>
                        <p>Projects Completed</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <Col sm={12} lg={4}>
            <div className='rightContentDiv'>
              <img
                src='/assets/images/projectComplete.png'
                alt='projectComplete'
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectCompleted;
