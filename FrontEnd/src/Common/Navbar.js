import React, { useState } from 'react';
import { BsCartFill } from 'react-icons/bs';
import { GoHeartFill } from 'react-icons/go';
import { TiUser } from 'react-icons/ti';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwt");
  const id = localStorage.getItem("userId");
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const carticon = () => {
    navigate('/cart');
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  const wishIcon = () => {
    navigate('/wishlist');
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");

    navigate('/');
    toast.error('You have logged out');
  };
  return (
    <div className="bg-black text-white">
      <div className="d-flex align-items-center justify-content-between px-2 py-1">
        <div className="ml-2 w-25 d-flex">
          <img
            style={{ height: '5rem', width: '5rem' }}
            src="https://res.cloudinary.com/dmubfrefi/image/private/s--X0LLoOBX--/c_crop,h_2728,w_4090,x_334,y_0/f_auto/q_auto/v1/dee-about-cms-prod-medias/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg?_a=BAAAROBs"
            alt="Nike Logo"
          />
        </div>
        <div className="d-none d-md-flex justify-content-between w-25">
          <div>
            <p className="flex-fill"   onClick={() => navigate('/')}>Home</p>
          </div>
          <div>
            <p className="flex-fill" onClick={() => navigate('/main')} >All Category</p>
          </div>
          <div>
            <p className="flex-fill"   onClick={() => navigate('/men')}>Mens</p>
          </div>
          <div>
            <p className="flex-fill"  onClick={() => navigate('/women')}>Women</p>
          </div>
        </div>
        <div className="d-flex justify-content-around w-25">
          <div className="d-none d-md-block">
            <BsCartFill
              style={{ width: '2rem', height: '2rem', marginLeft: '1rem', cursor: 'pointer' }}
              onClick={carticon}
            />
          </div>
          <div className="d-none d-md-block">
            <GoHeartFill
              style={{ width: '2rem', height: '2rem', marginLeft: '1rem', cursor: 'pointer' }}
              onClick={wishIcon}
            />
          </div>
          <div className="d-none d-md-block">
            
            {jwtToken ? (
              
                  <p onClick={logout}>Logout</p>
                
              ) : (
 
                <p onClick={() => navigate('/login')}>Login</p>
               
              )}


          </div>
          <div className="d-md-none" onClick={toggleMenu}>
            <GiHamburgerMenu style={{ width: '2rem', height: '2rem', cursor: 'pointer' }} />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="d-md-none">
          <div className="d-flex flex-column">
            <div>
              <p className="flex-fill" onClick={() =>navigate("/")}>Home</p>
            </div>
            <div>
              <p className="flex-fill"  onClick={() => navigate('/main')}>All Category</p>
            </div>
            <div>
              <p className="flex-fill"  onClick={() => navigate('/men')}>Mens</p>
            </div>
            <div>
              <p className="flex-fill"  onClick={() => navigate('/women')}>Women</p>
            </div>
            <div className="d-flex justify-content-around">
              <div>
                <BsCartFill
                  style={{ width: '2rem', height: '2rem', marginLeft: '1rem', cursor: 'pointer' }}
                />
              </div>
              <div>
                <GoHeartFill
                  style={{ width: '2rem', height: '2rem', marginLeft: '1rem', cursor: 'pointer' }}
                />
              </div>
              <div>
                <TiUser style={{ width: '2rem', height: '2rem', marginLeft: '1rem', cursor: 'pointer' }} />
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;