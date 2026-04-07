import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'bootstrap'; 

function Home() {
  const [cars, setCars] = useState([]);
  const carouselRef = useRef(null); 

  const carImages = [
    { brand: 'Honda', model: 'Civic', image_url: 'https://motorguide-store.s3.ap-southeast-1.amazonaws.com/ikman/Honda_Civic_Featured_image_0c0e4ddc68.jpeg' },
    { brand: 'Toyota', model: 'Land Cruiser Prado', image_url: 'https://motorguide-store.s3.ap-southeast-1.amazonaws.com/ikman/Toyota_Land_Cruiser_Prado_2023_247c967116.jpg' },
    { brand: 'Suzuki', model: 'Wagon R', image_url: 'https://motorguide-store.s3.ap-southeast-1.amazonaws.com/ikman/537179483_1224523319477289_4237433665049728942_n_2d993ba278.jpg' },
    { brand: 'Toyota', model: 'Prius', image_url: 'https://s3.amazonaws.com/cdn1.adz.lk/wp-content/uploads/2024/11/13130042/466133591_540273545458013_6764873587399704035_n.jpg' }
  ];

  useEffect(() => {

    const shuffled = [...carImages].sort(() => Math.random() - 0.6);
    setCars(shuffled);
  }, []);

  useEffect(() => {
   
    if (cars.length > 0 && carouselRef.current) {
      const bsCarousel = new Carousel(carouselRef.current, {
        interval: 2000,
        ride: 'carousel'
      });
      bsCarousel.cycle(); 
    }
  }, [cars]);

  return (
    <div className="container-fluid p-0">
    
      {cars.length > 0 && (
        <div 
          id="carCarousel" 
          ref={carouselRef}
          className="carousel slide" 
        >
        
          <div className="carousel-indicators">
            {cars.map((_, index) => (
              <button 
                key={index} 
                type="button" 
                data-bs-target="#carCarousel" 
                data-bs-slide-to={index} 
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : 'false'}
              ></button>
            ))}
          </div>

       
          <div className="carousel-inner">
            {cars.map((car, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img
                  src={car.image_url}
                  className="d-block w-100"
                  alt={`${car.brand} ${car.model}`}
                  style={{
                    width: '100vw',
                    height: '85vh',
                    objectFit: 'cover'
                  }}
                />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                  <h2 className="text-white">{car.brand} {car.model}</h2>
                  <p className="text-white">Luxury Car available for Rent.</p>
                </div>
              </div>
            ))}
          </div>

         
          <button className="carousel-control-prev" type="button" data-bs-target="#carCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;