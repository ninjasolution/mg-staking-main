import { pricingList } from 'helpers/helper';
import NFTDeatilModal from 'modals/NFTDeatilModal';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PricingCard from './PricingCard';

const OurPricing = () => {
  const [currentTab, setCurrentTab] = useState('monthly');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className='ourPricingSec'>
      <Container>
        <div className='ourPricingDiv DBlock'>
          <div className='title DFlex justify-content-center flex-column'>
            <h2>
              <strong>OUR</strong> Pricing
            </h2>
            <p>We have pricing solutions for you.</p>
          </div>
          <div className='pricingTab DBlock'>
            <ul className='tabUl DFlex justify-content-center'>
              <li>
                <button
                  onClick={() => setCurrentTab('monthly')}
                  className={`${currentTab === 'monthly' ? 'active' : ''}`}>
                  Monthly
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('yearly')}
                  className={`${currentTab === 'yearly' ? 'active' : ''}`}>
                  Yearly
                </button>
              </li>
            </ul>
            <div className='tabListing DBlock'>
              <Row>
                <div className='DFlex justify-content-center'>
                  {pricingList?.map((list, ind) => (
                    <Col
                      sm={12}
                      md={6}
                      lg={4}
                      xl={3}
                      key={`PricingListCardKey${ind}`}>
                      <div className='mx-3 my-4'>
                        <PricingCard
                          list={list}
                          handleShow={handleShow}
                          level={list?.id}
                        />
                      </div>
                    </Col>
                  ))}
                </div>
              </Row>
            </div>
          </div>
        </div>
      </Container>

      {show && (
        <NFTDeatilModal show={show} handleClose={handleClose} page='pricing' />
      )}
    </section>
  );
};

export default OurPricing;
