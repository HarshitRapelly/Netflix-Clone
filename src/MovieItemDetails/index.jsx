import './index.css';
import { useParams, Link } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import Cookies from 'js-cookie';
import { TailSpin } from 'react-loader-spinner';
import { FaGoogle, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import {WishlistContext} from '../WishlistContext';

const MovieItemDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState({});
    const { addToWishlist, isInWishlist } = useContext(WishlistContext);

    const { id } = useParams();

    const onClickedMovie = () => {
        if(!isInWishlist(movieDetails.id)) {
            const newMovie = {
                id: movieDetails.id,
                title: movieDetails.title,
                posterPath: movieDetails.posterPath,
                backdropPath: movieDetails.backdropPath,
                overview: movieDetails.overview,
                releaseDate: movieDetails.releaseDate,
                voteAverage: movieDetails.voteAverage,
                voteCount: movieDetails.voteCount,
            };
            addToWishlist(newMovie);
    }
    alert(`${movieDetails.title} movie added to wishlist successfully!`);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        setIsLoading(true);
        const fetchMovieItemDetails = async () => {
            const jwtToken = Cookies.get('jwt_token');
            const movieItemDetailsUrl = `https://apis.ccbp.in/movies-app/movies/${id}`;

            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: 'GET',
            };

            const response = await fetch(movieItemDetailsUrl, options);
            if (response.ok) {
                const data = await response.json();

                const movie = data.movie_details;


                const formattedData = {
                    adult: movie.adult,
                    backdropPath: movie.backdrop_path,
                    budget: movie.budget,
                    genres: movie.genres.map((genre) => ({
                        id: genre.id,
                        name: genre.name,
                    })),
                    id: movie.id,
                    overview: movie.overview,
                    posterPath: movie.poster_path,
                    releaseDate: movie.release_date,
                    runtime: movie.runtime,
                    similarMovies: movie.similar_movies.map((movie) => ({
                        backdropPath: movie.backdrop_path,
                        id: movie.id,
                        overview: movie.overview,
                        posterPath: movie.poster_path,
                        title: movie.title,
                    })),
                    spokenLanguages: movie.spoken_languages.map((language) => ({
                        englishName: language.english_name,
                        id: language.id,
                    })),
                    title: movie.title,
                    voteAverage: movie.vote_average,
                    voteCount: movie.vote_count,
                };

                setMovieDetails(formattedData);

            } else {
                console.error('Failed to fetch movie details');
            }
            setIsLoading(false);
        };

        fetchMovieItemDetails();
    }, [id]);

    const formatRuntime = () => {
        const runtime = movieDetails.runtime || 0;
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    }

    const adultContent = movieDetails.adult ? 'A' : 'U/A';
    const releaseYear = movieDetails.releaseDate ? movieDetails.releaseDate.split('-')[0] : '';

    return (
        <>
            {isLoading ? (
                <div style={{ display: 'flex', backgroundColor: '#131313', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
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
                <div className="movie-item-details-main-container">
                    {movieDetails && (
                        <>
                            <div
                                className="movie-item-details-container"
                                style={{
                                    backgroundImage: `url(${movieDetails.posterPath})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <Header />
                                <h1 style={{ marginBottom: '10px', marginLeft: '250px', marginTop: '100px', color: '#FFFFFF', fontSize: '45px', fontFamily: 'HK Grotesk', fontWeight: '600' }}>{movieDetails.title}</h1>
                                <div style={{ display: 'flex', marginBottom: '10px' }}>
                                    <p style={{ color: '#FFFFFF', marginLeft: '250px', fontSize: '20px', fontWeight: '500' }}>{formatRuntime()}</p>
                                    <p style={{ color: '#FFFFFF', marginLeft: '10px', fontSize: '20px', paddingLeft: '8px', paddingRight: '8px', borderRadius: '1px', borderColor: '#FFFFFF', borderWidth: '1px' }}>{adultContent}</p>
                                    <p style={{ color: '#FFFFFF', marginLeft: '10px', fontSize: '20px', fontWeight: '500' }}>{releaseYear}</p>
                                </div>
                                <p
                                    style={{
                                        color: '#FFFFFF',
                                        marginLeft: '250px',
                                        fontSize: '20px',
                                        width: movieDetails.overview && movieDetails.overview.length > 30 ? '650px' : '450px'
                                    }}
                                >
                                    {movieDetails.overview}
                                </p>
                                <div style={{ display: 'flex', marginLeft: '250px', marginTop: '20px' }}>
                                    <Link to={`/youtubevideo/${movieDetails.id}`}><button
                                        style={{
                                            color: '#171F46',
                                            backgroundColor: 'white',
                                            borderRadius: '4px',
                                            paddingTop: '20px',
                                            paddingRight: '10px',
                                            paddingBottom: '23px',
                                            paddingLeft: '5px',
                                            height: '40px',
                                            marginLeft: '0px',
                                            marginTop: '18px',
                                            marginRight: '10px',
                                            textAlign: 'center',
                                            fontWeight: 500,
                                            width: '90px',
                                            fontSize: '18px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    ><img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751609983/Screenshot_2025-07-04_114930_amzlel.png"
                                        style={{ width: '25px', height: '20px', marginRight: '5px' }} />
                                        Play
                                    </button>
                                    </Link>
                                    <button onClick={onClickedMovie} style={{ color: 'white', background: 'transparent', textAlign: 'center', borderWidth: '2px', borderRadius: '7px', paddingLeft: '10px', paddingRight: '10px', paddingBottom: '40px', paddingTop: '0px', borderColor: 'grey', height: '40px', marginTop: '18px', fontSize: '25px', fontWeight: '500' }}>+</button>
                                </div>
                                <div className="movie-item-details-shadow" />
                            </div>
                        </>
                    )
                    }
                    <div style={{ display: 'flex', marginLeft: '160px', marginRight: '160px', justifyContent: 'space-between' }}>


                        <div style={{ marginTop: ' 20px', display: 'flex', flexDirection: 'column', paddingBottom: '5px' }}>
                            <h1 style={{ color: '#94A3B8', fontSize: '17px', marginBottom: '5px', marginTop: '10px' }}>Genres</h1>
                            {movieDetails.genres && movieDetails.genres.length > 0 && movieDetails.genres.map((genre) => (
                                <p key={genre.id} style={{ color: '#FFFFFF', fontSize: '15px' }}>{genre.name}</p>
                            ))}
                        </div>

                        <div style={{ marginTop: ' 20px', display: 'flex', flexDirection: 'column', paddingBottom: '5px' }}>
                            <h1 style={{ color: '#94A3B8', fontSize: '17px', marginBottom: '5px', marginTop: '10px' }}>Audio Available</h1>
                            {movieDetails.spokenLanguages && movieDetails.spokenLanguages.length > 0 && movieDetails.spokenLanguages.map((language) => (
                                <p key={language.id} style={{ color: '#FFFFFF', fontSize: '15px' }}>{language.englishName}</p>
                            ))}
                        </div>

                        <div style={{ marginTop: ' 20px', display: 'flex', flexDirection: 'column', paddingBottom: '5px' }}>
                            <h1 style={{ color: '#94A3B8', fontSize: '17px', marginBottom: '5px', marginTop: '10px' }}>Rating Count</h1>
                            <p style={{ color: '#FFFFFF', fontSize: '15px' }}>{movieDetails.voteCount}</p>
                            <h1 style={{ color: '#94A3B8', fontSize: '17px', marginBottom: '5px', marginTop: '10px' }}>Rating Average</h1>
                            <p style={{ color: '#FFFFFF', fontSize: '15px' }}>{movieDetails.voteAverage}</p>
                        </div>

                        <div style={{ marginTop: ' 20px', display: 'flex', flexDirection: 'column', paddingBottom: '5px' }}>
                            <h1 style={{ color: '#94A3B8', fontSize: '17px', marginBottom: '5px', marginTop: '10px' }}>Budget</h1>
                            <p style={{ color: '#FFFFFF', fontSize: '15px' }}>${movieDetails.budget}</p>
                            <h1 style={{ color: '#94A3B8', fontSize: '17px', marginBottom: '5px', marginTop: '10px' }}>Release Date</h1>
                            <p style={{ color: '#FFFFFF', fontSize: '15px', marginBottom: '40px' }}>{movieDetails.releaseDate}</p>
                        </div>

                    </div>
                    <h1 style={{ color: '#FFFFFF', marginLeft: '160px', fontSize: '20px', fontWeight: '500', marginBottom: '20px' }}>More like this</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', marginLeft: '160px', marginRight: '160px' }}>
                        {movieDetails.similarMovies && movieDetails.similarMovies.map((each) => (
                            <Link to={`/movieitemdetails/${each.id}`} key={each.id}>
                                <img src={each.backdropPath} alt={each.title} style={{ borderRadius: '6px', width: '260px', height: '165px' }} />
                            </Link>
                        ))}
                    </div>
                    <div style={{ paddingBottom: '10px' }}></div>
                    <div className="each-movie-section-icon-card">
                        <FaGoogle size={20} color="white" style={{ marginRight: '18px' }} />
                        <FaTwitter size={20} color="white" style={{ marginRight: '18px' }} />
                        <FaInstagram size={20} color="white" style={{ marginRight: '18px' }} />
                        <FaYoutube size={20} color="white" style={{ marginRight: '10px' }} />
                    </div>
                    <div className="each-movie-last-card">
                        <p className="each-movie-page-p1">Contact Us</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieItemDetails;
