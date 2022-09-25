import Home from 'components/common/Home';
import Layout from 'layouts/Layout';
import OurPricing from 'components/pricing/OurPricing';
import StakeMatic from 'components/common/StakeMatic';

const Pricing = () => {
  return (
    <div className='companyPage'>
      <Home
        title='Your Crypto Investment Partner'
        description='Chorus One helps you securely increase your crypto holdings by
                  participating in decentralized networks.'
        imageUrl='/assets/images/priceImg.png'
      />
      <OurPricing />
      <StakeMatic />
    </div>
  );
};

export default Layout(Pricing);
