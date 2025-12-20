import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Vehicle() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/cars/all')
      .then(res => {
        setCars(res.data);
      })
      .catch(err => console.error('Error fetching cars:', err));
  }, []);

  const sedans = cars.filter(car => car.type?.toLowerCase() === 'sedan');
  const vans = cars.filter(car => car.type?.toLowerCase() === 'van');
  const suvs = cars.filter(car =>
    car.type?.toLowerCase() === 'suv' || car.type?.toLowerCase() === 'electric suv'
  );
  const hatchbacks = cars.filter(car => car.type?.toLowerCase() === 'hatchback');
  const others = cars.filter(car =>
    !['sedan', 'van', 'suv', 'electric suv', 'hatchback'].includes(car.type?.toLowerCase())
  );

const handleRentClick = (car) => {
  const user = localStorage.getItem('user');

  if (!user) {
    Swal.fire({
      title: 'Login Required',
      text: 'To reserve a vehicle, please log in first.!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Login ',
      cancelButtonText: 'See you later.'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login'); 
      }
    });
    return; 
  }

  Swal.fire({
    title: `Rent this ${car.model}?`,
    text: `Daily Price: LKR ${car.pricePerDay.toLocaleString()}`,
    imageUrl: car.imageUrl ? `http://localhost:8080/api/v1/cars/image-proxy?url=${encodeURIComponent(car.imageUrl)}` : 'https://placehold.co/400x200',
    imageWidth: 600,
    imageHeight: 400,
    showCancelButton: true,
    confirmButtonText: 'Book Now',
    confirmButtonColor: '#0d6efd',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      navigate('/booking', { state: { carData: car } });
    }
  });
};

  const renderCarList = (carList, title) => {
    if (carList.length === 0) return null;

    return (
      <div className="mb-5">
        <h2 className="fw-bold text-dark border-bottom border-3 border-primary pb-2 mb-4 fs-2 text-uppercase">
          {title}
        </h2>
        <div className="row">
          {carList.map((car) => {
            // Availability එක පරීක්ෂා කිරීම (Database එකේ 1 හෝ 0 ලෙස තිබිය හැක)
            const isAvailable = car.available === true || car.available === 1;

            return (
              <div key={car.carid} className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="card h-100 shadow-sm border border-danger border-2 d-flex flex-column pb-3">
                  <img
                    src={car.imageUrl ? `http://localhost:8080/api/v1/cars/image-proxy?url=${encodeURIComponent(car.imageUrl)}` : "https://placehold.co/400x200?text=No+Image"}
                    onError={(e) => { e.target.src = "https://placehold.co/400x200?text=Load+Error"; }}
                    alt={car.model}
                    className="card-img-top"
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  />

                  <div className="p-3 pb-2 text-center">
                    <h5 className="fw-bold text-uppercase" style={{ fontSize: '1rem' }}>{car.brand} {car.model}</h5>
                  </div>

                  <div className="row g-0 mb-3 align-items-center px-2" style={{ fontSize: '0.85rem' }}>
                    <div className="col-6 border-end text-center">
                      <span className="text-muted d-block small text-uppercase" style={{ fontSize: '0.6rem' }}>Daily Price</span>
                      <strong className="text-primary">LKR {car.pricePerDay.toLocaleString()}</strong>
                    </div>
                    <div className="col-6 text-center">
                      <span className="text-muted d-block small text-uppercase" style={{ fontSize: '0.6rem' }}>Location</span>
                      <strong className="text-dark text-truncate d-block px-1" title={car.pickupAddress}>
                        {car.pickupAddress || 'N/A'}
                      </strong>
                    </div>
                  </div>

                  <div className="mt-auto px-3">
                    <div className="mb-2">
                      {isAvailable ? (
                        <span className="badge border border-success text-success w-100 py-2 shadow-sm text-uppercase"
                          style={{ letterSpacing: '1px', backgroundColor: '#f0fff4', fontSize: '0.7rem' }}>
                          ● Available
                        </span>
                      ) : (
                        <span className="badge border border-danger text-danger w-100 py-2 shadow-sm text-uppercase"
                          style={{ letterSpacing: '1px', backgroundColor: '#fff5f5', fontSize: '0.7rem' }}>
                          ● Booked
                        </span>
                      )}
                    </div>

                    {/* මෙහිදී Button එකේ පැහැය සහ text එක වෙනස් වේ */}
                    <button
                      className={`btn w-100 fw-bold py-2 shadow-sm rounded-2 ${isAvailable ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleRentClick(car)}
                      disabled={!isAvailable} 
                    >
                      {isAvailable ? 'BOOK NOW' : 'NOT AVAILABLE'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {renderCarList(sedans, " Sedans / Cars")}
        {renderCarList(hatchbacks, " Hatchbacks")}
        {renderCarList(vans, " Vans")}
        {renderCarList(suvs, " SUVs & Electric")}
        {renderCarList(others, " Crossover")}

        {cars.length === 0 && (
          <div className="alert alert-info text-center fw-bold mt-5 shadow-sm">
            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
            Searching for available vehicles...
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Vehicle;