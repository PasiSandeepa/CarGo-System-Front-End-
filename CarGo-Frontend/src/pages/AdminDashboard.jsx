import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    LayoutDashboard as DashboardIcon,
    Plus as PlusIcon,
    Loader2 as LoaderIcon,
    MapPin as MapPinIcon,
    Trash2 as TrashIcon,
    Edit3 as EditIcon
} from 'lucide-react';
import Swal from 'sweetalert2';
import MapComponent from "../components/MapComponent";

const AdminDashboard = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDistrict, setSelectedDistrict] = useState("All");

    const API_BASE = "http://localhost:8080/api/v1/cars";

    const loadInventory = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE}/all`);
            setCars(response.data);
            setFilteredCars(response.data);
        } catch (error) {
            console.error("Axios Fetch Error:", error);
            Swal.fire("Error", "Could not load data from server", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInventory();
    }, []);

    const handleFilter = (district) => {
        setSelectedDistrict(district);
        if (district === "All") {
            setFilteredCars(cars);
        } else {
            setFilteredCars(cars.filter(car =>
                car.pickupAddress?.toLowerCase().includes(district.toLowerCase())
            ));
        }
    };

    const showCarForm = async (carData = null) => {
        const isEdit = !!carData;

        const { value: formValues } = await Swal.fire({
            title: `<h3 class="fw-bold mt-2">${isEdit ? 'Update Vehicle' : 'Add New Vehicle'}</h3>`,
            width: '850px',
            html: `
            <div class="row g-3 text-start px-2">
                <div class="col-md-6"><label class="small fw-bold">Brand</label><input id="brand" class="form-control" value="${isEdit ? carData.brand : ''}"></div>
                <div class="col-md-6"><label class="small fw-bold">Model</label><input id="model" class="form-control" value="${isEdit ? carData.model : ''}"></div>
                <div class="col-md-4"><label class="small fw-bold">Registration No</label><input id="regNo" class="form-control" value="${isEdit ? carData.registrationNo : ''}"></div>
                <div class="col-md-4"><label class="small fw-bold">Color</label><input id="color" class="form-control" value="${isEdit ? carData.color : ''}"></div>
                <div class="col-md-4"><label class="small fw-bold">Year</label><input id="year" type="number" class="form-control" value="${isEdit ? carData.year : ''}"></div>
                
                <div class="col-md-6">
                    <label class="small fw-bold">Body Type</label>
                    <select id="type" class="form-select">
                        <option value="Sedan" ${isEdit && carData.type === 'Sedan' ? 'selected' : ''}>Sedan</option>
                        <option value="SUV" ${isEdit && carData.type === 'SUV' ? 'selected' : ''}>SUV</option>
                        <option value="Hatchback" ${isEdit && carData.type === 'Hatchback' ? 'selected' : ''}>Hatchback</option>
                        <option value="Crossover" ${isEdit && carData.type === 'Crossover' ? 'selected' : ''}>Crossover</option>
                        <option value="Van" ${isEdit && carData.type === 'Van' ? 'selected' : ''}>Van</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="small fw-bold">Transmission</label>
                    <select id="swal-transmission" class="form-select"> 
                        <option value="Auto" ${isEdit && carData.transmission === 'Auto' ? 'selected' : ''}>Auto</option>
                        <option value="Manual" ${isEdit && carData.transmission === 'Manual' ? 'selected' : ''}>Manual</option>
                    </select>
                </div>

                <div class="col-md-4">
                    <label class="small fw-bold">Fuel Type</label>
                    <select id="fuelType" class="form-select">
                        <option value="Petrol" ${isEdit && carData.fuelType === 'Petrol' ? 'selected' : ''}>Petrol</option>
                        <option value="Diesel" ${isEdit && carData.fuelType === 'Diesel' ? 'selected' : ''}>Diesel</option>
                        <option value="Hybrid" ${isEdit && carData.fuelType === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
                        <option value="Electric" ${isEdit && carData.fuelType === 'Electric' ? 'selected' : ''}>Electric</option>
                    </select>
                </div>

                <div class="col-md-4"><label class="small fw-bold">Engine (cc)</label><input id="engineCap" type="number" class="form-control" value="${isEdit ? carData.engineCapacity : ''}"></div>
                <div class="col-md-4"><label class="small fw-bold">Seats</label><input id="seats" type="number" class="form-control" value="${isEdit ? carData.seats : ''}"></div>
                <div class="col-md-6"><label class="small fw-bold">Price/Day (Rs.)</label><input id="price" type="number" class="form-control" value="${isEdit ? carData.pricePerDay : ''}"></div>
                <div class="col-md-6"><label class="small fw-bold">Image URL</label><input id="img" class="form-control" value="${isEdit ? carData.imageUrl : ''}"></div>
                
                <div class="col-12"><label class="small fw-bold">Pickup Address</label><input id="address" class="form-control" value="${isEdit ? carData.pickupAddress : ''}"></div>
                <div class="col-md-6"><label class="small fw-bold">Lat</label><input id="lat" type="number" step="any" class="form-control" value="${isEdit ? carData.pickupLat : ''}"></div>
                <div class="col-md-6"><label class="small fw-bold">Lng</label><input id="lng" type="number" step="any" class="form-control" value="${isEdit ? carData.pickupLng : ''}"></div>
            </div>
            `,
            showCancelButton: true,
            confirmButtonText: isEdit ? 'Update Now' : 'Save Vehicle',
            confirmButtonColor: '#000',
            preConfirm: () => {
                const popup = Swal.getPopup();
                const el = popup.querySelector('#swal-transmission');
                console.log("Element found:", el);
                return {
                    brand: popup.querySelector('#brand').value,
                    model: popup.querySelector('#model').value,

                    registrationNo: popup.querySelector('#regNo').value,
                    color: popup.querySelector('#color').value,
                    year: parseInt(popup.querySelector('#year').value) || 0,
                    fuelType: popup.querySelector('#fuelType').value,
                    type: popup.querySelector('#type').value,

                    transmission: popup.querySelector('#swal-transmission').value,
                    engineCapacity: parseFloat(popup.querySelector('#engineCap').value) || 0,
                    seats: parseInt(popup.querySelector('#seats').value) || 0,
                    pricePerDay: parseFloat(popup.querySelector('#price').value) || 0,
                    pickup_address: popup.querySelector('#address').value,
                    pickup_lat: parseFloat(popup.querySelector('#lat').value) || 0,
                    pickup_lng: parseFloat(popup.querySelector('#lng').value) || 0,
                    image_url: popup.querySelector('#img').value,
                    available: isEdit ? carData.available : true
                };
            }
        });

        if (formValues) {
            try {
                if (isEdit) {
                    await axios.put(`${API_BASE}/${carData.carid}`, formValues);
                    Swal.fire("Updated!", "Vehicle details saved.", "success");
                } else {
                    await axios.post(API_BASE, formValues);
                    Swal.fire("Saved!", "New vehicle added.", "success");
                }
                loadInventory();
            } catch (error) {
                console.error("Save/Update Error:", error);
                Swal.fire("Error", "Server rejection. Check field formats.", "error");
            }
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Vehicle?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm Delete',
            confirmButtonColor: '#d33'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_BASE}/${id}`);
                Swal.fire("Deleted!", "Record removed.", "success");
                loadInventory();
            } catch (error) {
                Swal.fire("Error", "Could not delete.", "error");
            }
        }
    };

    return (
        <div className="container-fluid p-0" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <nav className="navbar navbar-dark bg-dark px-4 py-3 shadow-sm">
                <span className="navbar-brand fw-bold d-flex align-items-center gap-2">
                    <DashboardIcon size={22} className="text-info" /> RENT-A-CAR ADMIN
                </span>
            </nav>

            <div className="p-4">
                <div className="row g-4 mb-4">
                    {["All", "Colombo", "Kandy", "Galle"].map((loc) => (
                        <div key={loc} className="col-md-3" onClick={() => handleFilter(loc)} style={{ cursor: 'pointer' }}>
                            <div className={`card p-4 rounded-4 border-0 shadow-sm transition-all ${selectedDistrict === loc ? 'bg-primary text-white' : 'bg-white'}`}>
                                <h6 className={selectedDistrict === loc ? 'text-white-50' : 'text-muted'}>{loc.toUpperCase()}</h6>
                                <h2 className="fw-bold mb-0">
                                    {loc === "All" ? cars.length : cars.filter(c => c.pickupAddress?.toLowerCase().includes(loc.toLowerCase())).length}
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-header bg-white py-4 px-4 d-flex justify-content-between align-items-center border-0">
                        <h4 className="fw-bold mb-0">Fleet Management</h4>
                        <button className="btn btn-dark rounded-pill px-4 d-flex align-items-center gap-2" onClick={() => showCarForm()}>
                            <PlusIcon size={18} /> Add New Vehicle
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">VEHICLE DETAILS</th>
                                    <th>SPECIFICATIONS</th>
                                    <th>LOCATION</th>
                                    <th>STATUS</th>
                                    <th>DAILY RATE</th>
                                    <th className="text-center">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="6" className="text-center py-5"><LoaderIcon className="animate-spin mx-auto text-primary" /></td></tr>
                                ) : filteredCars.map((car) => (
                                    <tr key={car.carid}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center gap-3">
                                                <img src={car.imageUrl} width="65" height="45" className="rounded shadow-sm" style={{ objectFit: 'cover' }} alt="car" />
                                                <div>
                                                    <div className="fw-bold">{car.brand} {car.model}</div>
                                                    <div className="text-muted small">

                                                        {car.registrationNo} • <span className="text-primary fw-medium">{car.transmission}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="small">
                                                <div className="fw-bold text-secondary">{car.type}</div>
                                                <div className="text-muted">{car.fuelType} • {car.seats} Seats</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="small text-muted text-truncate" style={{ maxWidth: '150px' }}>
                                                <MapPinIcon size={12} className="text-danger me-1" />
                                                {car.pickupAddress}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge rounded-pill ${car.available ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                                                {car.available ? 'Available' : 'Booked'}
                                            </span>
                                        </td>
                                        <td className="fw-bold text-dark">Rs. {car.pricePerDay?.toLocaleString()}</td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center gap-2">
                                                <button className="btn btn-light btn-sm rounded-circle border shadow-sm" onClick={() => showCarForm(car)} title="Edit">
                                                    <EditIcon size={14} className="text-primary" />
                                                </button>
                                                <button className="btn btn-light btn-sm rounded-circle border shadow-sm" onClick={() => handleDelete(car.carid)} title="Delete">
                                                    <TrashIcon size={14} className="text-danger" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;