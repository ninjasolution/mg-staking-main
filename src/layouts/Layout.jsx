import Header from 'partials/header/Header';
import Footer from 'partials/footer/Footer';

const Layout =
  (Component) =>
  ({ ...props }) => {
    return (
      <div className='pageLayout DBlock'>
        <Header />
        <Component {...props} />
        <Footer />
      </div>
    );
  };

export default Layout;
