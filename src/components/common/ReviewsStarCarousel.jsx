import { useRef } from 'react';
import Slider from 'react-slick';
import { Container } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import { GoVerified } from 'react-icons/go';

const ReviewsStarCarousel = () => {
  const customeSlider = useRef();
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
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
  const gotoNext = () => {
    customeSlider.current.slickNext();
  };

  const gotoPrev = () => {
    customeSlider.current.slickPrev();
  };
  return (
    <section className='reviewsStarSec DBlock relative'>
      <img
        src='/assets/images/positionItems/circle.png'
        alt='circleImg'
        className='circleImg'
      />
      <Container>
        <div className='title DFlex justify-content-center flex-column'>
          <h2>
            <strong>Showing our</strong> reviews star
          </h2>
          <p>We are constantly adding new stakings</p>
        </div>
        <div className='reviewStarCarousel'>
          <span
            className='prevIcon DFlex justify-content-center'
            onClick={gotoPrev}>
            <RiArrowDropLeftLine size={35} />
          </span>
          <span
            className='nextIcon DFlex justify-content-center'
            onClick={gotoNext}>
            <RiArrowDropRightLine size={35} />
          </span>
          <img
            src='/assets/images/positionItems/star.png'
            alt='starImg'
            className='starImg'
          />
          <Slider {...settings} ref={customeSlider}>
            {[1, 2, 3, 1, 2, 3]?.map((card, ind) => (
              <div className='reviewCardWrapper' key={`reviewCard${ind}`}>
                <div className='reviewCard DFlex  flex-column align-items-center'>
                  <div className='avatarImg'>
                    <div className='avatar'>
                      <img
                        src={`/assets/images/services/reviewImg${card}.png`}
                        alt='reviewImg'
                      />
                      <GoVerified
                        className='verifiedIcon'
                        size='20'
                        color='#5AA753'
                      />
                    </div>
                  </div>
                  <h1>Steven Creacy</h1>
                  <h4>UNITED STATE</h4>
                  <ul className='DFlex justify-content-center my-4'>
                    {[1, 2, 3, 4, 5].map((list, ind) => (
                      <li
                        className={`starIcon${ind + 1} mx-1`}
                        key={`starList${ind}`}>
                        <FaStar
                          color={`${ind + 1 === 5 ? 'white' : 'yellow'}`}
                          size='20'
                        />
                      </li>
                    ))}
                  </ul>
                  <h2>Much better than my previous service </h2>
                  <p>
                    My previous service petered out over timeand I lost rewards
                    for my nodes.
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default ReviewsStarCarousel;
