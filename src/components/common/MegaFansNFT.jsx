import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const MegaFansNFT = ({
  nftTotalTitle,
  nftTotal,
  nftStakeTitle,
  nftStake,
  title,
  strokeTitle,
  description,
  imageUrl,
  rowClass,
}) => {
  return (
    <section className='aboutSec DBlock'>
      <Container>
        <Row className={rowClass}>
          <Col sm={12} lg={6} className='leftAboutSec'>
            <Row>
              <Col sm={12} lg={6} className='descWrap'>
                <div className='title'>{nftTotalTitle}</div>
                <div className='nodes'>{nftTotal}</div>
                <div className='title'>{nftStakeTitle}</div>
                <div className='nodes'>{nftStake}</div>
                <img
                  src='/assets/images/services/liteCoin.png'
                  alt='liteCoin'
                />
              </Col>
              <Col sm={12} lg={6} className='imgSec'>
                <img src={imageUrl} alt='aboutImg' />
              </Col>
            </Row>
          </Col>
          <Col sm={12} lg={6} className='rightAboutSec'>
            <div className='title'>
              <h2>
                <strong>{title}</strong> {strokeTitle}
              </h2>
              <p>{description}</p>
              <Link to='/profile/nft-staking'>
                Staking
                <span>
                  <AiOutlineRight />
                </span>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MegaFansNFT;
