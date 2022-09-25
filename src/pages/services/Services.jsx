import Home from 'components/common/Home';
import Layout from 'layouts/Layout';
import StakeMatic from 'components/common/StakeMatic';
import SupportWallet from 'components/services/SupportWallet';
import AboutMegaFan from 'components/services/AboutMegaFan';
import NodesValidator from 'components/services/NodesValidator';
import WhyTrust from 'components/common/WhyTrust';
import ReviewsStarCarousel from 'components/common/ReviewsStarCarousel';

const Services = () => {
  let trustData = {
    boldTitle: 'why we',
    lightTitle: 'Validator',
    description: '',
  };
  return (
    <div className='servicesPage DBlock'>
      <Home
        title='Polygon Staking on MEGAFANS'
        description='MATIC is a token on the Ethereum blockchain. Polygon is a protocol and a framework for building and connecting Ethereum-compatible blockchain networks.'
        imageUrl='/assets/images/services/servicesImg.png'
      />
      <AboutMegaFan />
      <SupportWallet />
      <NodesValidator />
      <WhyTrust trustData={trustData} />
      <ReviewsStarCarousel />
      <StakeMatic />
    </div>
  );
};

export default Layout(Services);
