import { AiOutlineRight } from 'react-icons/ai';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StakeMatic = () => {
  return (
    <section className='stakeMaticSec DBlock'>
      <Container className='position-relative'>
        <img
          src='/assets/images/positionItems/star.png'
          alt='stakeBoxImg'
          className='starImg'
        />
        <div className='stakeMaticBox DFlex'>
          <img
            src='/assets/images/stakeBoxImg.png'
            alt='stakeBoxImg'
            className='stakeBoxImg'
          />
          <img
            src='/assets/images/stakeRingImg.png'
            alt='stakeRingImg'
            className='stakeRingImg'
          />
          <div className='stakeMaticContent DBlock'>
            <h4>Stake now. For free.</h4>
            <p>And enjoy completely free service for the next 115 days.</p>
          </div>
          <Link to='/stake-card'>
            <button className=''>
              STAKE MATIC{' '}
              <span>
                <AiOutlineRight />
              </span>
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default StakeMatic;
