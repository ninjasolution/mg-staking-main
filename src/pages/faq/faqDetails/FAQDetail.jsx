import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

const FAQDetail = () => {
  const [isExpand, setIsExpand] = useState(false);
  const divRef = useRef();

  const handleExpand = (value) => {
    setIsExpand(value);
    if (value) {
      divRef.current.style.height = 'auto';
    } else {
      divRef.current.style.height = '148px';
    }
  };

  return (
    <div className='faqDetailPage DBlock'>
      <Container className='faqDetailContainer'>
        <div className='faqDetailCard DBlock'>
          <div className='title'>
            <h2>
              <strong>How can I</strong> pay for service ?
            </h2>
          </div>
          <div className='detailContent DBlock' ref={divRef}>
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
          {isExpand ? (
            <button
              onClick={() => handleExpand(false)}
              className='readMore DFlex justify-content-center flex-column'>
              <AiOutlineArrowUp />
              Hide detail
            </button>
          ) : (
            <button
              onClick={() => handleExpand(true)}
              className='readMore DFlex justify-content-center flex-column'>
              Read more <AiOutlineArrowDown />
            </button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default LayoutWithoutHeader(FAQDetail, '/faq/questions');
