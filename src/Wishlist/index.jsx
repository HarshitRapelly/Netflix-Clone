import './index.css';
import { useContext, useState, useEffect } from 'react';
import { WishlistContext } from '../WishlistContext';
import { Link } from 'react-router'
import { FiSearch } from 'react-icons/fi'
import { TailSpin } from 'react-loader-spinner';

const Wishlist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { wishlistMovies, removeMovie } = useContext(WishlistContext);
  console.log("Rendering Wishlist. Movies count:", wishlistMovies.length);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (wishlistMovies.length === 0) {
    return (
      <>
        <div className="wishlist-container1">
          <div className="wishlist-card1">
            <Link to="/">
              <h1 className="wishlist-h1">MOVIES</h1>
            </Link>

            <Link to="/">
              <p className="wishlist-p1">Home</p>
            </Link>
            <Link to="/popular">
              <p className="wishlist-p1">Popular</p>
            </Link>
          </div>
          <div className="wishlist-card1">
            <Link to="/search"><FiSearch size={24} color="white" style={{ marginRight: '20px' }} /></Link>
            <Link to="/wishlist">
              <p className="wishlist-p1" style={{ marginLeft: '3px', fontWeight: '500' }}>Wishlist</p>
            </Link>
            <Link to="/account"><img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751225515/Avatar_vowef8.png" alt='header-logo' style={{ height: '40px', width: '40px', marginLeft: '15px' }} /></Link>
          </div>
        </div>
        {isLoading ? (
          <div className="wishlist-loader-container" testid="loader">
            <TailSpin
              height="50"
              width="50"
              color="#D81F26"
              ariaLabel="loading"
              radius="1"
              visible={true}
            />
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '88vh', color: 'white', backgroundColor: '#131313' }}>
              <h1 style={{ fontSize: '30px', fontWeight: '500' }}>Your Wishlist is Empty</h1>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="wishlist-container1">
        <div className="wishlist-card1">
          <Link to="/">
            <h1 className="wishlist-h1">MOVIES</h1>
          </Link>

          <Link to="/">
            <p className="wishlist-p1">Home</p>
          </Link>
          <Link to="/popular">
            <p className="wishlist-p1">Popular</p>
          </Link>
        </div>
        <div className="wishlist-card1">
          <Link to="/search"><FiSearch size={24} color="white" style={{ marginRight: '20px' }} /></Link>
          <Link to="/wishlist">
            <p className="wishlist-p1" style={{ marginLeft: '3px', fontWeight: '500' }}>Wishlist</p>
          </Link>
          <Link to="/account"><img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751225515/Avatar_vowef8.png" alt='header-logo' style={{ height: '40px', width: '40px', marginLeft: '15px' }} /></Link>
        </div>
      </div>
      {isLoading ? (
        <div className="wishlist-loader-container" testid="loader">
          <TailSpin
            height="50"
            width="50"
            color="#D81F26"
            ariaLabel="loading"
            radius="1"
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="wishlist-container">
            <div style={{display:'flex'}}>
              <h1 style={{ color: 'white', paddingBottom: '20px', paddingLeft:'210px',paddingTop:'23px',fontWeight:'500',fontSize:'20px'}}>My Wishlist</h1>
              <div style={{borderWidth:'1px',marginLeft:'10px',marginBottom:'20px',marginTop:'25px',borderColor:'white',height:'23px',width:'24px'}}>
              <p style={{color:'white',fontSize:'15px',paddingBottom:'3px',paddingLeft:'5px'}}>{wishlistMovies.length}</p>
              </div>
            </div>
            
            <ul className="wishlist-items">
              {wishlistMovies.map((movie) => (
                <li key={movie.id} className="wishlist-item">
                  <Link to ={`/movieitemdetails/${movie.id}`}><img style={{ borderRadius:'0px',borderRadius:'4px',height:'200px',width:'250px',marginRight:'510px'}}src={movie.posterPath} alt={movie.title} /></Link>
                  <div className="wishlist-item-details">
                    <div>
                      <h1 style={{ fontSize:'18px',color: 'white', width: '70%', paddingBottom: '15px' }}>{movie.title}</h1>
                    <p style={{ fontSize:'14px',color: 'white', width: '100%' }}>{movie.overview}</p>
                    </div>
                    <div>
                    <button onClick={() => removeMovie(movie.id)} style={{borderWidth:'1px', borderColor:'grey',width:'23px', height:'25px',marginTop:'15px'}} >
                      <img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751746665/icons8-delete-button-128_dhco7o.png" alt="remove" style={{height: '20px', width: '20px'}} />
                    </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

    </>
  );
};

export default Wishlist;