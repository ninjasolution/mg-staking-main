import Loader from 'components/common/Loader';
import { notifyErrors } from 'helpers/helper';
import { instance } from 'index';
import Layout from 'layouts/Layout';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineRight } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from 'redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {
  loginUserFail,
  loginUserPending,
  loginUserSuccess,
} from 'redux/auth/authSlice';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [formValues, setFormValues] = useState({
    username: auth?.userProfile?.username,
    email: auth?.userProfile?.email,
    countryId: auth?.userProfile?.countryId,
    imageUri: auth?.userProfile?.image,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [userCountry, setUserCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const formatOptionLabel = ({ value, label, flag }) => (
    <div className='cusSelectOption'>
      <img src={flag} alt='Flag' />
      <p>{label}</p>
    </div>
  );

  const getCountries = async () => {
    try {
      const result = await instance.get('api/Countries');
      if (result?.status === 200) {
        setCountries(result?.data);
        result?.data?.filter((country) => {
          if (
            country?.countryCode?.toLowerCase() ===
            auth?.userProfile?.countryCode?.toLowerCase()
          ) {
            setUserCountry({
              value: country?.id,
              label: country?.name,
              flag: country?.flag,
            });
          }
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const updateProfilePic = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      const result = await instance.post(
        'api/Image/ImageUpload?typeId=2',
        formData,
        {
          headers: { Authorization: `Bearer ${auth?.user?.token}` },
        }
      );
      if (result?.status === 200 && result?.data?.success) {    
        let originalValue = auth?.user;
        const newValue = {
          ...originalValue,
          image: result?.data?.imageURI
        };
        dispatch(loginUserSuccess(newValue));
        navigate('/profile');
        toast.success(result?.data?.message);
      } else toast.error(result?.data?.message);
    } catch (error) {
      notifyErrors(error);
    }
  };

  const updateProfile = async () => {
    try {
      const result = await instance.post('api/Users/edit_profile', formValues, {
        headers: { Authorization: `Bearer ${auth?.user?.token}` },
      });
      if (result?.status === 200 && result?.data?.success) {
        let originalValue = auth?.user;
        const newValue = {
          ...originalValue,
          image: formValues.imageUri,
          username: formValues.username,
          email: formValues.email         
        };
        dispatch(loginUserSuccess(newValue));
        setIsLoading(false);
        navigate('/profile');
        toast.success(result?.data?.message);
      } else toast.error(result?.data?.message);
    } catch (error) {
      notifyErrors(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className='editProfile DBlock'>
      <div className='profileBanner DBlock'>
        <Container>
          <div className='profileBannerDiv DBlock'>
            <img
              src='/assets/images/newsRoom/newsRoomImg1.png'
              alt='Banner Image'
              className='profileBannerImg'
            />
            <div className='overlay DFlex justify-content-start align-items-end h-100'>
              <label
                htmlFor='profileImage'
                className='fileUpload DFlex justify-content-center'>
                <input
                  type='file'
                  name='profileImage'
                  id='profileImage'
                  accept='image/*'
                  onChange={(e) => updateProfilePic(e)}
                />
                <svg
                  width='52'
                  height='52'
                  viewBox='0 0 52 52'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M11.6807 0C8.58397 0.00393357 5.61523 1.23584 3.42554 3.42554C1.23584 5.61523 0.00393357 8.58397 0 11.6807V32.9088C0.00294815 36.0065 1.2343 38.9766 3.424 41.1677C5.6137 43.3588 8.58299 44.592 11.6807 44.5969H27.3082C28.3588 46.8077 30.0135 48.676 32.0811 49.986C34.1488 51.2961 36.5449 51.9943 38.9926 52C46.1652 52 52 46.1652 52 38.9926C52 33.8342 48.9637 29.4042 44.5969 27.3082V11.6807C44.592 8.58299 43.3588 5.6137 41.1677 3.424C38.9766 1.2343 36.0065 0.00294815 32.9088 0H11.6807ZM22.239 11.2421C23.3357 11.2421 24.4077 11.5673 25.3196 12.1766C26.2314 12.7859 26.9421 13.6519 27.3618 14.6651C27.7815 15.6783 27.8913 16.7932 27.6773 17.8688C27.4634 18.9444 26.9353 19.9324 26.1598 20.7078C25.3844 21.4833 24.3963 22.0114 23.3207 22.2254C22.2451 22.4393 21.1303 22.3295 20.1171 21.9098C19.1039 21.4901 18.2379 20.7794 17.6286 19.8676C17.0193 18.9557 16.6941 17.8837 16.6941 16.787C16.6941 13.7359 19.1841 11.2421 22.239 11.2421ZM22.1275 29.7015C24.4057 29.7015 26.6206 30.2293 28.6424 31.2104C26.9292 33.4439 25.9957 36.1777 25.9851 38.9926C25.9851 39.6355 26.0929 40.2599 26.1821 40.8805H11.6807C10.3502 40.8805 9.10892 40.5163 8.00515 39.9365C8.9743 36.9563 10.8634 34.3601 13.4009 32.5211C15.9384 30.682 18.9937 29.6949 22.1275 29.7015ZM38.9926 29.7015C44.1212 29.7015 48.2836 33.8676 48.2836 38.9926C48.2836 44.1212 44.1138 48.2836 38.9926 48.2836C36.529 48.2816 34.167 47.3021 32.425 45.5601C30.683 43.8182 29.7035 41.4561 29.7015 38.9926C29.7015 33.8676 33.8676 29.7015 38.9926 29.7015ZM39.0297 32.8456L32.4666 37.5543L34.6369 40.5758L37.1864 38.7473V44.5597H40.9028V38.6878L43.6083 40.5906L45.7453 37.5432L39.0297 32.8456Z'
                    fill='currentColor'
                    fill-opacity='0.4'
                  />
                </svg>
              </label>
            </div>
          </div>
        </Container>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='editProfileBody DBlock'>
          <Container>
            <Row>
              <Col sm={12} md={6}>
                <div className='formGroup'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={formValues?.email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </Col>
              <Col sm={12} md={6}>
                <div className='formGroup'>
                  <label htmlFor='username'>Username</label>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    value={formValues?.username}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
              </Col>
              <Col sm={12} md={6}>
                <div className='formGroup'>
                  <label htmlFor='countryId'>Country</label>
                  <Select
                    formatOptionLabel={formatOptionLabel}
                    defaultValue={userCountry}
                    onChange={(country) =>
                      setFormValues({
                        ...formValues,
                        countryId: country?.value,
                      })
                    }
                    options={countries?.map((country) => {
                      return {
                        value: country?.id,
                        label: country?.name,
                        flag: country?.flag,
                      };
                    })}
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className='submitBtn DFlex justify-content-center'>
                  <button type='button' onClick={updateProfile}>
                    Update Profile{' '}
                    <span>
                      <AiOutlineRight />
                    </span>
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Layout(EditProfile);
