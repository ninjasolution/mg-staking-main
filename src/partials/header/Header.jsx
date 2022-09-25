import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, toggleWalletInfo } from 'redux/auth/authSlice';
import { useWeb3React } from '@web3-react/core';

const Header = () => {
  const { auth } = useSelector((state) => state);
  const { deactivate } = useWeb3React();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOutUser = (e) => {
    dispatch(logoutUser());
    dispatch(toggleWalletInfo(null));
    deactivate();
    navigate('/');
  };

  return (
    <Navbar expand='lg' className='header'>
      <Container>
        <Link to='/' className='navLogo'>
          <img src='/assets/svgs/logo.svg' alt='Logo' />
        </Link>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='mx-auto my-2 my-lg-0' navbarScroll>
            <NavLink className='headerLink' to='/'>
              Company
            </NavLink>
            <NavLink className='headerLink' to='/market-place'>
              Market place
            </NavLink>
            <NavLink className='headerLink' to='/services'>
              Services
            </NavLink>
            <NavLink className='headerLink' to='/pricing'>
              Pricing
            </NavLink>
            <NavLink className='headerLink' to='/newsroom'>
              Newsroom
            </NavLink>
            <NavLink className='headerLink' to='/faq'>
              FAQ
            </NavLink>
          </Nav>
          <select name='lang' id='lang' className='langSelect ms-auto'>
            <option value='eng'>Eng</option>
            <option value='ar'>Ar</option>
          </select>
          {!auth?.isLoggedIn ? (
            <Link to='/sign-in' className='signInBtn'>
              <FaUserCircle />
            </Link>
          ) : (
            <Dropdown>
              <Dropdown.Toggle
                className='bg-transparent profileDropDownBtn userDroDown'
                id='dropdown-basic'>
                {auth?.user?.image ? (
                  <img src={auth?.user?.image} alt='User Profile' />
                ) : (
                  <Avatar name={auth?.user?.username} size={30} />
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className='profileDropDownDiv DBlock'>
                  <Link to='/profile'>Profile</Link>
                  <hr />
                  <button
                    onClick={signOutUser}
                    type='button'
                    className='logoutBtn'>
                    Logout
                  </button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
