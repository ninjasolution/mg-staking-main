import Home from 'components/common/Home';
import Layout from 'layouts/Layout';
import WhyTrust from 'components/common/WhyTrust';
import ReviewsStarCarousel from 'components/common/ReviewsStarCarousel';
import StakeMatic from 'components/common/StakeMatic';
import MegaFansNFT from 'components/common/MegaFansNFT';
import SupportWallet from 'components/services/SupportWallet';
import NodesValidator from 'components/services/NodesValidator';

const Company = () => {
  let trustData = {
    boldTitle: 'Why People',
    lightTitle: 'Trust Us ?',
    description: 'YOUR TRUSTE GATEWAY TO CRYPTO INVESTMENTS',
  };
  return (
    <div className='companyPage'>
      <Home
        title='Polygon Staking on MEGAFANS'
        description='MATIC is a token on the Ethereum blockchain. Polygon is a protocol and a framework for building and connecting Ethereum-compatible blockchain networks.'
        imageUrl='/assets/images/companyImg.png'
      />
      {/* <InvestmentPartner /> */}
      <MegaFansNFT
        nftTotalTitle='Total NFTS'
        nftTotal='12,751'
        nftStakeTitle='Staked Nft’s'
        nftStake='1275 130 59 130 59'
        title='MEGAFANS'
        strokeTitle='NFT'
        description='Praised for consistent reliability and stellar customer support, Allnodes offers an added advantage of practical and low-cost solutions to its users. Be it high-quality Hosting or Staking services, the users are the ones who benefit.Praised for consistent reliability and stellar customer support, Allnodes offers an added advantage of practical and low-cost solutions to its users.'
        imageUrl='/assets/images/services/aboutImg2.png'
      />
      <MegaFansNFT
        nftTotalTitle='Total NFTS'
        nftTotal='12,751'
        nftStakeTitle='Staked token'
        nftStake='$1275 130 59 130 59'
        title='MEGAFANS'
        strokeTitle='NFT'
        description='Praised for consistent reliability and stellar customer support, Allnodes offers an added advantage of practical and low-cost solutions to its users. Be it high-quality Hosting or Staking services, the users are the ones who benefit.Praised for consistent reliability and stellar customer support, Allnodes offers an added advantage of practical and low-cost solutions to its users.'
        rowClass='flex-row-reverse'
        imageUrl='/assets/images/services/aboutImg.png'
      />
      <SupportWallet />
      <NodesValidator />
      <WhyTrust trustData={trustData} />
      <ReviewsStarCarousel />
      <StakeMatic />
    </div>
  );
};

export default Layout(Company);
