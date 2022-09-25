import { instance } from 'index';
import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';
import ImageCard from 'components/common/cards/ImageCard';
import LayoutWithoutHeader from 'layouts/LayoutWithoutHeader';
import Loader from 'components/common/Loader';
import { toast } from 'react-toastify';
import { notifyErrors, validateEmail } from 'helpers/helper';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues?.email || !formValues?.password)
      return toast.error('All feilds are required!');
    if (!validateEmail(formValues?.email))
      return toast.error('Email must be valid email!');
    try {
      const result = await instance.post('api/Users', formValues);
      if (result?.status === 201) navigate('/sign-in');
    } catch (error) {
      notifyErrors(error);
    }
  };

  const getUserName = async () => {
    try {
      const result = await instance.get('api/Users/GenerateUserName?id=0');
      if (result?.status === 200) {
        setFormValues({ ...formValues, username: result?.data });
        setIsLoading(false);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <>
      <section className='signUpPage DBlock'>
        <Container>
          <Row>
            <Col sm={12} md={{ span: 5, offset: 1 }}>
              <ImageCard cardImg='signUp' />
            </Col>
            <Col sm={12} md={6}>
              <div className='signUpDiv'>
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
                {isLoading ? (
                  <Loader />
                ) : (
                  <form className='signUpForm' onSubmit={handleSubmit}>
                    <input
                      type='text'
                      value={formValues?.username}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          username: e?.target?.value,
                        })
                      }
                      placeholder='Username'
                    />
                    <input
                      type='email'
                      value={formValues?.email}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          email: e?.target?.value,
                        })
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

                    <div className='alreadyAccount mt-2'>
                      Already have an account?
                      <Link to='/sign-in'>
                        <span>Sign In</span>
                      </Link>
                    </div>
                    <div className='signUpBtn'>
                      <button type='submit'>
                        Sign Up Free{' '}
                        <span>
                          <BsArrowRightShort size={25} />
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LayoutWithoutHeader(SignUp, '/');
