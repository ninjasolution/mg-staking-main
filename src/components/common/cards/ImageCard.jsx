const ImageCard = ({ cardImg }) => {
  return (
    <section className='imageCardSec DBlock'>
      <div className='imgCardDiv'>
        <img src={`/assets/images/${cardImg}.png`} alt='cryptoPartnerImg' />
      </div>
    </section>
  );
};

export default ImageCard;
