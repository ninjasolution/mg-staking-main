import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const NewsroomDetail = () => {
  const { newsroomId } = useParams();
  return (
    <div className='newroomDetailPage DBlock'>
      <Container>
        <div className='title newsroomDetailDiv DBlock'>
          <h2>
            <strong>Your</strong> Crypto Investment <br />{' '}
            <strong>Partner</strong>
          </h2>
          <div className='newsroomImgDiv DBlock'>
            <img
              src={`/assets/images/newsRoom/newsRoomImg${newsroomId}.png`}
              alt='newsRoomImg'
            />
          </div>
          <div className='newsroomDetailContent DBlock'>
            <p>
              Crypto, the future of economy, which doesn't differeciate anybody
              based on color, gender, caste and geography. Crypto innovation
              sees World as one." This new frontier needs tools, which empowers
              a retail investor to make the best of the opportunities presented
              and prosper. We a small team of professionals buckled up for this
              purpose. We are continously building and iterating to personalize
              the functionality and experience to you. Committed to security and
              personalization.
            </p>
            <p>
              Crypto, the future of economy, which doesn't differeciate anybody
              based on color, gender, caste and geography. Crypto innovation
              sees World as one." This new frontier needs tools, which empowers
              a retail investor to make the best of the opportunities presented
              and prosper. We a small team of professionals buckled up for this
              purpose. We are continously building and iterating to personalize
              the functionality and experience to you. Committed to security and
              personalization.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LayoutWithoutHeader(NewsroomDetail, '/newsroom');
