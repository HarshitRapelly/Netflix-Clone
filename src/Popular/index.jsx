import './index.css'
import { Link } from 'react-router'
import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { FaGoogle, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { TailSpin } from 'react-loader-spinner';
import Cookies from 'js-cookie';

const Popular = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getPopularMovies = async () => {


            const popularMoviesUrl = "https://apis.ccbp.in/movies-app/popular-movies";
            const jwtToken = Cookies.get('jwt_token');
            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                method: 'GET',
            }

            const response = await fetch(popularMoviesUrl, options);
            if (response.ok) {
                const data = await response.json();
                const formattedData = data.results.map(each => ({
                    backdropPath: each.backdrop_path,
                    id: each.id,
                    overview: each.overview,
                    posterPath: each.poster_path,
                    title: each.title,
                }))
                setPopularMovies(formattedData);
            }
            setIsLoading(false);
        }
        getPopularMovies();

    }, [])

    return (
        <>
            <div className="popular-container">
                <div className="popular-card1">
                    <Link to="/">
                        <h1 className="popular-h1">MOVIES</h1>
                    </Link>

                    <Link to="/">
                        <p className="popular-p1">Home</p>
                    </Link>
                    <Link to="/popular">
                        <p style={{ fontWeight: '500' }} className="popular-p1">Popular</p>
                    </Link>
                </div>
                <div className="popular-card1">
                    <Link to="/search"><FiSearch size={24} color="white" style={{marginRight:'20px'}}/></Link>
                    <Link to="/wishlist">
                        <p className="popular-p1"style={{marginLeft:'3px'}}>Wishlist</p>
                    </Link>
                    <Link to="/account"><img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751225515/Avatar_vowef8.png" alt='header-logo' style={{ height: '40px', width: '40px', marginLeft: '15px' }} /></Link>
                </div>
            </div>
            {isLoading ? (
                <div className="popular-loader-container" testid="loader">
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
    
                <div className="popular-movies-container2">
                    {popularMovies.map((each) => (
                        <Link to={`/movieitemdetails/${each.id}`} key={each.id} className="popular-movies-link">
                        <div className="popular-movies-card">
                            <img src={each.posterPath} style={{ width: '210px', height: '170px', borderRadius: '2px', marginRight: '20px' }} />
                        </div>
                        </Link>
                    ))}
                </div>
            )}
            <div className="popular-section-icon-card">
                <FaGoogle size={20} color="white" style={{ marginRight: '18px' }} />
                <FaTwitter size={20} color="white" style={{ marginRight: '18px' }} />
                <FaInstagram size={20} color="white" style={{ marginRight: '18px' }} />
                <FaYoutube size={20} color="white" style={{ marginRight: '10px' }} />
            </div>
            <div className="popular-last-card">
                <p1 className="popular-page-p1">Contact Us</p1>
            </div>
            
            

        </>
    )
}
export default Popular;