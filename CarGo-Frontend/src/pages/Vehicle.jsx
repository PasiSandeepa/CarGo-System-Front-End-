import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Vehicle() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/cars/all')
      .then(res => {
        setCars(res.data);
      })
      .catch(err => console.error('Error fetching cars:', err));
  }, []);

  const filteredCars = cars.filter(car =>
    car.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sedans = filteredCars.filter(car => car.type?.toLowerCase() === 'sedan');
  const vans = filteredCars.filter(car => car.type?.toLowerCase() === 'van');
  const suvs = filteredCars.filter(car =>
    car.type?.toLowerCase() === 'suv' || car.type?.toLowerCase() === 'electric suv'
  );
  const hatchbacks = filteredCars.filter(car => car.type?.toLowerCase() === 'hatchback');
  const others = filteredCars.filter(car =>
    !['sedan', 'van', 'suv', 'electric suv', 'hatchback'].includes(car.type?.toLowerCase())
  );

  const handleRentClick = (car) => {
    const user = localStorage.getItem('user');

    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'To reserve a vehicle, please log in first!',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Login',
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
        navigate('/Booking', { state: { carData: car } });
      }
    });
  };

  const renderCarList = (carList, title) => {
    if (carList.length === 0) return null;

    return (
      <div className="mb-5">
        <h2 className="fw-bold text-dark border-bottom border-5 border-info pb-2 mb-3 fs-3 text-uppercase">
          {title}
        </h2>
        <div className="row">
          {carList.map((car) => {
            const isAvailable = car.available === true || car.available === 1;

            return (
              <div key={car.carid} className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="card h-100 shadow-sm border border-danger border-3 d-flex flex-column pb-3">
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
                      <span className={`badge border w-100 py-2 shadow-sm text-uppercase ${isAvailable ? 'border-success text-success' : 'border-danger text-danger'}`}
                        style={{ letterSpacing: '1px', backgroundColor: isAvailable ? '#f0fff4' : '#fff5f5', fontSize: '0.7rem' }}>
                        ● {isAvailable ? 'Available' : 'Booked'}
                      </span>
                    </div>

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
    <div className="container mt-5 pt-3">
     
      <div className="row mb-4 justify-content-end">
        <div className="col-md-4">
          <div className="input-group border border-info rounded shadow-sm bg-white overflow-hidden">
            <span className="input-group-text bg-white border-0">
              <i className="bi bi-search text-info"></i>
            </span>
            <input
              type="text"
              className="form-control border-0 shadow-none bg-white"
              placeholder="Search vehicles by brand or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
            {searchTerm && (
              <button className="btn btn-white border-0 text-muted" onClick={() => setSearchTerm("")}>
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </div>

  
      {filteredCars.length > 0 ? (
        <>
          {renderCarList(sedans, "Sedans / Cars")}
          {renderCarList(hatchbacks, "Hatchbacks")}
          {renderCarList(vans, "Vans")}
          {renderCarList(suvs, "SUVs & Electric")}
          {renderCarList(others, "Crossover")}
        </>
      ) : (
        <div className="alert alert-warning text-center fw-bold mt-5">
          No vehicles found matching "{searchTerm}"
        </div>
      )}

      {cars.length === 0 && (
        <div className="alert alert-info text-center fw-bold mt-5 shadow-sm">
          <div className="spinner-border spinner-border-sm me-2" role="status"></div>
          Searching for available vehicles...
        </div>
      )}
    </div>
  );
}

export default Vehicle;