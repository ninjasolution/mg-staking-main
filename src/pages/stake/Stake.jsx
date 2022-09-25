import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import { Container, Row, Col, Form } from 'react-bootstrap';
import StakeCard from 'components/stake/StakeCard';
import { useState } from 'react';
import WalletModal from 'modals/WalletModal';

const Stake = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='stakePage DBlock'>
        <Container>
          <div className='stakeContent DBlock'>
            <div className='heading DFlex'>
              <ul className='DFlex justify-content-start'>
                <li>
                  <button className='active'>Live</button>
                </li>
                <li>
                  <button>Finished</button>
                </li>
              </ul>
              <div className='switchText d-flex'>
                <p className='me-2'>Staked only : </p>
                <Form.Check type='switch' id='custom-switch' size='large' />
              </div>
            </div>
            <div className='stakeCardDiv DBlock'>
              <Row>
                {[1, 2, 3]?.map((card) => (
                  <Col sm={12} md={6} lg={4} key={`StakeCardKey${card}`}>
                    <StakeCard handleShow={handleShow} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Container>
      </div>
      <WalletModal
        show={show}
        setShow={setShow}
        handleShow={handleShow}
        handleClose={handleClose}
      />
    </>
  );
};

export default LayoutWithoutHeader(Stake, '/');
