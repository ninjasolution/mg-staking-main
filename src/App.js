import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
//auth pages
import Login from 'pages/auth/Login';
import SignUp from 'pages/auth/SignUp';

import FAQ from 'pages/faq/FAQ';
import FAQQuestions from 'pages/faq/question/FAQQuestions';
import NewsroomDetail from 'pages/newsroom/detail/NewsroomDetail';
import Newsroom from 'pages/newsroom/Newsroom';
import Company from 'pages/company/Company';
import Services from 'pages/services/Services';
import SupportWalletDetail from 'pages/services/SupportWalletDetail';
import AllNewsroom from 'pages/newsroom/seeAll/AllNewsroom';
import Pricing from 'pages/pricing/Pricing';
import FAQDetail from 'pages/faq/faqDetails/FAQDetail';
import Stake from 'pages/stake/Stake';
import ProfileLayout from 'pages/profile/ProfileLayout';
import NFTStaking from 'pages/profile/nftStaking/NFTStaking';
import TokenStaking from 'pages/profile/tokenStaking/TokenStaking';
import Profile from 'pages/profile/Profile';
import MarketPlace from 'pages/marketPlace/MarketPlace';
import { useSelector } from 'react-redux';
import EditProfile from 'pages/profile/EditProfile';
import PubNubChatWidget from 'components/pubnub/PubNubChatWidget';

function App() {
  const { auth } = useSelector((state) => state);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className='mainLayout DBlock'
      style={{
        background:
          'url("/assets/images/background.png") top left/cover no-repeat',
      }}>
      <Routes>
        <Route path='/' element={<Company />} />
        <Route
          path='/sign-in'
          element={
            auth?.isLoggedIn ? (
              <Navigate to='/profile' replace={true} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path='/sign-up'
          element={
            auth?.isLoggedIn ? (
              <Navigate to='/profile' replace={true} />
            ) : (
              <SignUp />
            )
          }
        />
        <Route path='/newsroom' element={<Newsroom />} />
        <Route path='/newsroom/see-all' element={<AllNewsroom />} />
        <Route
          path='/newsroom/detail/:newsroomId'
          element={<NewsroomDetail />}
        />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/faq/questions' element={<FAQQuestions />} />
        <Route path='/faq/questions/detail/:faqId' element={<FAQDetail />} />
        <Route path='/services' element={<Services />} />
        <Route
          path='/services/supportWallet/details'
          element={<SupportWalletDetail />}
        />
        <Route path='/stake-card' element={<Stake />} />
        <Route path='/market-place' element={<MarketPlace />} />
        <Route path='/faq/questions' element={<FAQQuestions />} />
        <Route
          path='/profile/edit-profile'
          element={
            auth?.isLoggedIn ? (
              <EditProfile />
            ) : (
              <Navigate to='/sign-in' replace={true} />
            )
          }
        />
        <Route
          path='/profile'
          element={
            auth?.isLoggedIn ? (
              <ProfileLayout />
            ) : (
              <Navigate to='/sign-in' replace={true} />
            )
          }>
          <Route path='' index element={<Profile />} />
          <Route path='nft-staking' element={<NFTStaking />} />
          <Route path='token-staking' element={<TokenStaking />} />
        </Route>
      </Routes>
      <PubNubChatWidget />
    </div>
  );
}

export default App;
