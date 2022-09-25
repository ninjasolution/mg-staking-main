import { Link } from 'react-router-dom';
import CPRYT from 'partials/cpryt/CPRYT';
import Footer from 'partials/footer/Footer';
import { Container } from 'react-bootstrap';
import { GrFormPrevious } from 'react-icons/gr';

const LayoutWithoutHeader = (Component, link) => ({ props }) => {
  return (
    <div className='pageLayout DBlock'>
      <div className='backHeaderDiv DBlock'>
        <Container>
          <div className='backHeader DFlex justify-content-center'>
            <Link to={link} className='posLink'>
              <GrFormPrevious />
              <span>Back To Began</span>
            </Link>
            <Link to='/' className='headerLogo'>
              <img src='/assets/svgs/logo.svg' alt='Logo' />
            </Link>
          </div>
        </Container>
      </div>
      <div className='childComponent'>
        <Component {...props} />
        <Footer />
        <CPRYT />
      </div>
    </div>
  );
};

export default LayoutWithoutHeader;
