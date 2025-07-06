import './index.css'
import { Link, useNavigate } from 'react-router'
import { FiSearch } from 'react-icons/fi'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react';
import { FaGoogle, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { TailSpin } from 'react-loader-spinner';
import { useWishlist } from '../WishlistContext';

const Account = () => {
    const { clearWishlist } = useWishlist();

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const onClickLogout = () => {
        console.log("Logging out...");
        Cookies.remove('jwt_token');
        clearWishlist();
        sessionStorage.clear();
        localStorage.clear();
        console.log("Navigating to login...");
        navigate('/login');
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="account-container">
                <div className="account-card1">
                    <Link to="/">
                        <h1 className="account-h1">MOVIES</h1>
                    </Link>

                    <Link to="/">
                        <p className="account-p1">Home</p>
                    </Link>
                    <Link to="/popular">
                        <p className="account-p1">Popular</p>
                    </Link>
                </div>
                <div className="account-card1">
                    <Link to="/search"><FiSearch size={24} style={{ marginRight: '16px' }} color="white" /></Link>
                    <Link to="/wishlist">
                        <p className="account-p1">Wishlist</p>
                    </Link>
                    <Link to="/account"><img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751225515/Avatar_vowef8.png" alt='header-logo' style={{ height: '40px', width: '40px', marginLeft: '25px' }} /></Link>
                </div>
            </div>
            {isLoading ? (
                <div className="account-loader-container" testid="loader">
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
                    <div className="account-container2">
                        <div className="account-card">
                            <h1 style={{ color: '#131313', fontWeight: 600, fontSize: '26px', paddingTop: '50px' }}>Account</h1>
                            <div style={{ marginTop: '15px', marginBottom: '15px', backgroundColor: '#CBD5E1', height: '2px', width: '62vw' }}></div>
                            <div style={{ display: 'flex', paddingRight: '15px' }}>
                                <h1 style={{ marginRight: '15px', color: '#94A3B8', fontWeight: '500', fontSize: '18px' }}>Membership:</h1>
                                <h1 style={{ marginRight: '15px', color: '#1E293B', fontSize: '18px' }}>rahul@gmail.com</h1>
                            </div>
                            <div style={{ display: 'flex', marginTop: '15px' }}>
                                <h1 style={{ marginRight: '40px', color: '#94A3B8', fontWeight: '500', fontSize: '18px' }}>Password:</h1>
                                <h1 style={{ marginRight: '15px', color: '#1E293B', fontSize: '18px' }}>***********</h1>
                            </div>
                            <div style={{ marginTop: '15px', marginBottom: '15px', backgroundColor: '#CBD5E1', height: '2px', width: '62vw' }}></div>
                            <div style={{ display: 'flex', marginTop: '15px' }}>
                                <h1 style={{ marginRight: '25px', color: '#94A3B8', fontWeight: '500', fontSize: '18px' }}>Plan Details:</h1>
                                <h1 style={{ marginRight: '15px', color: '#1E293B', fontSize: '18px' }}>Premium</h1>
                                <button style={{ height: 'auto', paddingLeft: '5px', paddingRight: '5px', width: 'auto', borderColor: 'black', borderWidth: '1px', backgroundColor: 'white' }}>Ultra HD</button>
                            </div>
                            <button onClick={onClickLogout} style={{ borderRadius: '3px', paddingTop: '5px', fontSize: '14px', paddingBottom: '30px', marginLeft: '420px', marginTop: '30px', textAlign: 'center', width: '70px', height: '35px', backgroundColor: '#E50914', color: 'white' }}>Logout</button>
                        </div>

                    </div>
                </>
            )
            }
            <div className="account-container3">
                <div className="account-icons-card">
                    <FaGoogle size={20} color="white" style={{ marginRight: '18px' }} />
                    <FaTwitter size={20} color="white" style={{ marginRight: '18px' }} />
                    <FaInstagram size={20} color="white" style={{ marginRight: '18px' }} />
                    <FaYoutube size={20} color="white" style={{ marginRight: '10px' }} />
                </div>
                <p className="account-p2">Contact Us</p>
            </div>
        </>
    )
}
export default Account; 