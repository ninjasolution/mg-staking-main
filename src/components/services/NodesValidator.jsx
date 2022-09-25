import { Col, Container, Row } from 'react-bootstrap';

const NodesValidator = () => {
  return (
    <section className='nodeValidatorSec DBlock'>
      <Container>
        <div className='title DFlex justify-content-center flex-column'>
          <h2>
            <strong>All nodes</strong> Validator
          </h2>
          <p>With our super powers we have reached this</p>
        </div>
        <Row>
          <Col className='my-3' sm={12} lg={5}>
            <div className='validatorContent'>
              <div className='totalStake DFlex justify-content-start'>
                <img src='/assets/svgs/services/signal.svg' alt='rateImg' />
                <span>Total Stake</span>
              </div>
              <h2>308,647,486 MATIC </h2>
              <h3> $274,724,132 </h3>
            </div>
          </Col>
          <Col className='my-3' sm={12} lg={5}>
            <div className='validatorContent DFlex'>
              <div className='checkpointSign align-self-start'>
                <div className='totalStake DFlex justify-content-start'>
                  <img
                    src='/assets/svgs/services/checkpoint.svg'
                    alt='checkpointImg'
                  />
                  <span>Checkpoint Signed</span>
                </div>
                <h2>100%</h2>
              </div>
              <div className='latestSign'>
                <p>Latest Signed</p>
                <span>15 mintes ago</span>
              </div>
            </div>
          </Col>
          <Col className='my-3' sm={12} lg={2}>
            <div className='validatorContent'>
              <div className='totalStake DFlex justify-content-start'>
                <img src='/assets/svgs/services/rank.svg' alt='rankImg' />
                <span>Made Rank</span>
              </div>
              <h2>2/100 </h2>
            </div>
          </Col>
          <Col className='my-3' sm={12} lg={3}>
            <div className='validatorContent'>
              <div className='totalStake DFlex justify-content-start'>
                <img
                  src='/assets/svgs/services/frequency.svg'
                  alt='frequencyIcon'
                />
                <span>Payout Frequency </span>
              </div>
              <h2>36 min</h2>
            </div>
          </Col>
          <Col className='my-3' sm={12} lg={3}>
            <div className='validatorContent'>
              <div className='totalStake DFlex justify-content-start'>
                <img
                  src='/assets/svgs/services/delegator.svg'
                  alt='delegatorIcon'
                />
                <span>Payout Frequency </span>
              </div>
              <h2>1938</h2>
            </div>
          </Col>
          <Col className='my-3' sm={12} lg={3}>
            <div className='validatorContent'>
              <div className='totalStake DFlex justify-content-start'>
                <img
                  src='/assets/svgs/services/comission.svg'
                  alt='comissionIcon'
                />
                <span>Comission </span>
              </div>
              <h2>0%</h2>
            </div>
          </Col>
          <Col className='my-3' sm={12} lg={3}>
            <div className='validatorContent'>
              <div className='totalStake DFlex justify-content-start'>
                <img
                  src='/assets/svgs/services/rewardRate.svg'
                  alt='rewardRateIcon'
                />
                <span>Expected Reward Rate </span>
              </div>
              <h2>7.09%</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NodesValidator;
