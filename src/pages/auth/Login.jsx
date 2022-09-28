import { Link, useNavigate } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';
import { Col, Container, Row } from 'react-bootstrap';
import ImageCard from 'components/common/cards/ImageCard';
import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { notifyErrors, validateEmail } from 'helpers/helper';
import { toast } from 'react-toastify';
import {
  loginUserFail,
  loginUserPending,
  loginUserSuccess,
} from 'redux/auth/authSlice';
import WalletModal from 'modals/WalletModal';
import { instance } from 'index';

const Login = () => {
  const { auth } = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues?.email || !formValues?.password)
      return toast.error('All feilds are required!');
    if (!validateEmail(formValues?.email))
      return toast.error('Email must be valid email!');
    let encodedData = `Basic ${window?.btoa(
      `${formValues?.email}:${formValues?.password}`
    )}`;
    try {
      dispatch(loginUserPending());
      const result = await instance.post(
        'Authorization/login?appGameUid=56E700B7-7390-4800-B368-9ED4CD0E7E13',
        {},
        { headers: { Authorization: encodedData } }
      );
      if (result?.data?.message?.toLowerCase()?.includes('invalid')) {
        toast.error(result?.data?.message);
        throw new Error(result?.data?.message);
      } else if (!result?.data?.data) {
        toast.error(result?.data?.message);
        throw new Error(result?.data?.message);
      } else {
        setLoginUser(result?.data?.data);
        if (auth?.walletInfo?.account && auth?.walletInfo?.isConnected)
          return handleWallet(result?.data?.data?.token, result?.data?.data);
          dispatch(loginUserSuccess(loginUser));
        handleShow();
      }
    } catch (error) {
      notifyErrors(error);
      dispatch(loginUserFail());
    }
  };

  const handleWallet = async (token, loginUser) => {
    try {
      await instance.post(
        'api/NFT/wallet',
        { walletAddress: auth?.walletInfo?.account },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(loginUserSuccess(loginUser));
      navigate('/profile');
    } catch (error) {
      notifyErrors(error);
    }
  };

  return (
    <>
      <section className='loginPage DBlock'>
        <Container>
          <Row>
            <Col sm={12} md={{ span: 5, offset: 1 }}>
              <ImageCard cardImg='cryptoPartner' />
            </Col>
            <Col sm={12} md={6}>
              <div className='loginDiv'>
                <div className='titleSec'>
                  <div className='lightCoin'>
                    <img src='/assets/images/liteCoin.png' alt='lightCoin' />
                  </div>
                  <h1>
                    when do we start ? <br />{' '}
                    <span>Connect with us today.</span>
                  </h1>
                </div>
                <p>
                  We proactively consult, design, develop & scale robust web,
                  mobile & custom software solutions, that fuel innovation &
                  deliver digital success!
                </p>
                <form className='loginForm' onSubmit={handleSubmit}>
                  <input
                    type='email'
                    value={formValues?.email}
                    onChange={(e) =>
                      setFormValues({ ...formValues, email: e?.target?.value })
                    }
                    placeholder='Email'
                  />
                  <input
                    type='password'
                    value={formValues?.password}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        password: e?.target?.value,
                      })
                    }
                    placeholder='Enter Password'
                  />
                  <div className='alreadyAccount'>
                    You have no account?
                    <Link to='/sign-up'>
                      <span className='signUp'>Sign up</span>
                    </Link>
                  </div>
                  <div className='loginBtn'>
                    <button type='submit'>
                      Login
                      <span>
                        <BsArrowRightShort size={25} />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {show && !auth?.walletInfo?.account && (
        <WalletModal
          pageFrom='login'
          loginUser={loginUser}
          show={show}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default LayoutWithoutHeader(Login, '/');
