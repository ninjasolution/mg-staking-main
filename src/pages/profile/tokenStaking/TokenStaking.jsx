import { Container, Form } from 'react-bootstrap';
import StakeCard from 'components/stake/StakeCard';
import { useRef, useState } from 'react';
import WalletModal from 'modals/WalletModal';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const TokenStaking = () => {
  const [comingSoon] = useState(true);
  const [show, setShow] = useState(false);
  const stakingSliderRef = useRef();

  const settings = {
    dots: false,
    infinite: true,
    // autoplay: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const stakingNext = () => {
    stakingSliderRef.current.slickNext();
  };

  const stakingPrev = () => {
    stakingSliderRef.current.slickPrev();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='pt-0 pb-5 stakePage DBlock'>
        <Container>
          {comingSoon ? (
            <div className='comingSoonCard DFlex justify-content-center'>
              <h2>Coming Soon!</h2>
            </div>
          ) : (
            <div className='stakeContent DBlock'>
              <div className='title DFlex'>
                <h3>Staked NFT'S</h3>
                <div className='actionBtns DFlex'>
                  <button
                    className='prevIcon DFlex justify-content-center'
                    onClick={stakingPrev}>
                    <RiArrowDropLeftLine />
                  </button>
                  <Link to='/'>See All</Link>
                  <button
                    className='nextIcon DFlex justify-content-center'
                    onClick={stakingNext}>
                    <RiArrowDropRightLine />
                  </button>
                </div>
              </div>
              <div className='heading DFlex'>
                <ul className='DFlex justify-content-start'>
                  <li>
                    <button className='active'>Live</button>
                  </li>
                  <li>
                    <button>Finished</button>
                  </li>
                </ul>
                <div className='switchText d-flex align-items-center'>
                  <p className='me-2'>Staked only : </p>
                  <Form.Check type='switch' id='custom-switch' size='large' />
                </div>
              </div>
              <div className='stakeCardDiv DBlock'>
                <Slider
                  {...settings}
                  ref={stakingSliderRef}
                  className='nftStakingSlider'>
                  {[1, 2, 3, 4]?.map((card) => (
                    <div className='px-2' key={`StakeCardKey${card}`}>
                      <StakeCard handleShow={handleShow} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}
        </Container>
      </div>
      {!comingSoon && (
        <WalletModal
          show={show}
          setShow={setShow}
          handleShow={handleShow}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default TokenStaking;
