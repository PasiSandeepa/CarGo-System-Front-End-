import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // පාරිභෝගික දත්ත ලබා ගැනීම
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/api/v1/customer/get-all');
      setCustomers(res.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
      Swal.fire('Error', 'Could not fetch customer data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  
  const handleDelete = (id, name) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to remove ${name} from the system?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
         
          await axios.delete(`http://localhost:8080/api/v1/customer/delete/${id}`);
          
          Swal.fire('Deleted!', 'Customer has been removed.', 'success');
          fetchCustomers(); 
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire('Error', 'Failed to delete customer', 'error');
        }
      }
    });
  };

  const filteredCustomers = customers.filter(c =>
    c.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.nic?.includes(searchTerm)
  );

  return (
    <div className="container mt-5 pt-4">
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-header bg-white border-bottom py-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h3 className="fw-bold text-dark mb-0">
                <i className="bi bi-people-fill text-info me-2"></i>
                Customer Management
              </h3>
            </div>
            <div className="col-md-6 mt-2 mt-md-0">
              <div className="input-group border rounded-pill overflow-hidden">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control border-0 shadow-none" 
                  placeholder="Search by name, email or NIC..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                  <th className="ps-4 py-3">ID</th>
                  <th>Customer Details</th>
                  <th>Identity (NIC)</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th className="text-center">Role</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border text-info" role="status"></div>
                      <p className="mt-2 text-muted">Syncing data...</p>
                    </td>
                  </tr>
                ) : filteredCustomers.length > 0 ? (
                  filteredCustomers.map((c) => (
                    <tr key={c.customerId}>
                      <td className="ps-4 fw-bold text-muted">#{c.customerId}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style={{ width: '40px', height: '40px', fontSize: '0.9rem' }}>
                            {c.firstName?.charAt(0)}{c.lastName?.charAt(0)}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">{c.firstName} {c.lastName}</div>
                            <small className="text-muted d-block">{c.email}</small>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge bg-light text-dark border fw-normal">{c.nic}</span></td>
                      <td>
                        <div className="small fw-medium"><i className="bi bi-phone me-1 text-primary"></i>{c.phoneNumber}</div>
                      </td>
                      <td className="small text-muted" style={{ maxWidth: '180px' }}>
                        <i className="bi bi-geo-alt me-1"></i>{c.address}
                      </td>
                      <td className="text-center">
                        <span className={`badge rounded-pill ${c.role === 'ADMIN' ? 'bg-danger' : 'bg-success'} px-3`} style={{ fontSize: '0.7rem' }}>
                          {c.role || 'CUSTOMER'}
                        </span>
                      </td>
                      <td className="text-center">
                        <button 
                          className="btn btn-outline-danger btn-sm rounded-circle border-0"
                          title="Remove Customer"
                          onClick={() => handleDelete(c.customerId, `${c.firstName} ${c.lastName}`)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      <i className="bi bi-search fs-2 d-block mb-2"></i>
                      No records found for "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer bg-light border-top py-3 d-flex justify-content-between align-items-center">
          <span className="small text-muted fw-medium">Active Records: {filteredCustomers.length}</span>
          <button className="btn btn-sm btn-outline-secondary" onClick={fetchCustomers}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default Customer;