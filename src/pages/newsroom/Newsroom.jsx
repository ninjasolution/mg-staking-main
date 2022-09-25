import Layout from 'layouts/Layout';
import Home from 'components/common/Home';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Newsroom = () => {
  return (
    <div className='newsRoomPage DBlock'>
      <Home
        title='Newsroom puts you in touch with the right people'
        description='Chorus One helps you securely increase your crypto holdings by participating in decentralized networks.'
        imageUrl='/assets/images/newsRoomImg.png'
      />
      <section className='newsRoomSec DBlock'>
        <Container>
          <div className='newsRoomDiv DBlock'>
            <div className='title DFlex justify-content-center flex-column'>
              <h2>
                <strong>News</strong> Room
              </h2>
              <p>Our latest media coverage and press releases</p>
            </div>
            <div className='newsroomCardsDiv DBlock'>
              <Row>
                {[1, 2, 3, 4, 5, 6]?.map((news) => (
                  <Col sm={12} md={6} lg={4} key={`NewsRoomCardKey${news}`}>
                    <div className='newsRoomCard DBlock'>
                      <div className='newsRoomImg DBlock'>
                        <img
                          src={`/assets/images/newsRoom/newsRoomImg${news}.png`}
                          alt='newsRoomImg'
                          className='News Room Image'
                        />
                      </div>
                      <div className='newsRoomContent DBlock'>
                        <h4>100% UPTIME</h4>
                        <p>Simple Juice Recipes to boost your immune system</p>
                        <div className='infoDiv DFlex'>
                          <span>May 20th 2020</span>
                          <Link to={`/newsroom/detail/${news}`}>Read more</Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <Link to='/newsroom/see-all' className='seeAllBtn'>
                See All <FiArrowRight />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Layout(Newsroom);
