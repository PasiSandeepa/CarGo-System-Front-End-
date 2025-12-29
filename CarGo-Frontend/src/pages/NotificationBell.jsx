import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const NotificationBell = ({ customerId, isAdmin }) => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const prevCountRef = useRef(0); 

    const loadNotifications = async () => {
        if (!customerId && !isAdmin) return;
        try {
            const url = isAdmin 
                ? `http://localhost:8080/api/v1/notifications/admin` 
                : `http://localhost:8080/api/v1/notifications/customer/${customerId}`;
            
            const res = await axios.get(url);
            const data = res.data;
            
         
            const currentUnread = data.filter(n => n.state === 'UNREAD').length;
            if (currentUnread > prevCountRef.current) {
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');
                audio.play().catch(e => console.log("Audio play blocked"));
            }
            prevCountRef.current = currentUnread;

            setNotifications(data);
        } catch (err) {
            console.error("Error loading notifications:", err);
        }
    };

    useEffect(() => {
        loadNotifications();
        const interval = setInterval(loadNotifications, 10000); 
        return () => clearInterval(interval);
    }, [customerId, isAdmin]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const unreadCount = notifications.filter(n => n.state === 'UNREAD').length;

    const handleMarkAsRead = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/v1/notifications/read/${id}`);
            loadNotifications();
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation(); 
        try {
            await axios.delete(`http://localhost:8080/api/v1/notifications/delete/${id}`);
            setNotifications(notifications.filter(n => n.notificationId !== id));
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Notification removed',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err) {
            console.error("Error deleting notification:", err);
        }
    };

    return (
        <div className="position-relative d-inline-block" ref={dropdownRef} style={{ zIndex: 9999 }}>
            
         
            <div className="p-2 cursor-pointer position-relative" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                <i className="bi bi-bell-fill fs-4 text-warning"></i>
                {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                          style={{ fontSize: '0.6rem', marginTop: '8px' }}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </div>

            
            {isOpen && (
                <div className="shadow-lg border bg-white rounded-3 mt-2 text-dark overflow-hidden animate__animated animate__fadeIn" 
                     style={{ 
                        position: 'absolute', right: 0, width: '350px', 
                        maxHeight: '500px', display: 'flex', flexDirection: 'column',
                        zIndex: 10000 
                     }}>
                    
                    <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-dark text-white fw-bold">
                        <span className="small"><i className="bi bi- megaphone-fill me-2"></i>NOTIFICATIONS</span>
                        <span className="badge bg-info text-dark" style={{ fontSize: '0.7rem' }}>{unreadCount} New</span>
                    </div>

                    <div style={{ overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
                        {notifications.length === 0 ? (
                            <div className="p-5 text-center text-muted">
                                <i className="bi bi-bell-slash fs-1 d-block mb-2 text-secondary opacity-50"></i>
                                <p className="small m-0">All caught up!</p>
                            </div>
                        ) : (
                            notifications.map((note) => (
                                <div 
                                    key={note.notificationId}
                                    className={`p-3 border-bottom d-flex align-items-start position-relative notification-hover ${note.state === 'UNREAD' ? 'bg-white border-start border-primary border-4' : 'bg-light opacity-75'}`}
                                    onClick={() => handleMarkAsRead(note.notificationId)}
                                    style={{ cursor: 'pointer', transition: '0.3s' }}
                                >
                                    <div className={`rounded-circle p-2 me-3 d-flex align-items-center justify-content-center ${note.state === 'UNREAD' ? 'bg-primary text-white' : 'bg-secondary text-white'}`} 
                                         style={{ minWidth: '35px', height: '35px' }}>
                                        <i className={`bi ${isAdmin ? 'bi-person-badge' : 'bi-info-circle'}`} style={{ fontSize: '0.9rem' }}></i>
                                    </div>
                                    
                                    <div className="flex-grow-1">
                                        <p className={`mb-1 small ${note.state === 'UNREAD' ? 'fw-bold text-dark' : 'text-muted'}`} style={{ lineHeight: '1.3' }}>
                                            {note.message}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted" style={{ fontSize: '0.65rem' }}>
                                                <i className="bi bi-clock me-1"></i>{note.sendDate}
                                            </small>
                                            <button 
                                                className="btn btn-sm text-danger p-0 border-0 opacity-50 hover-opacity-100" 
                                                onClick={(e) => handleDelete(e, note.notificationId)}
                                                title="Remove"
                                            >
                                                <i className="bi bi-trash-fill" style={{ fontSize: '0.8rem' }}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-2 border-top text-center bg-light">
                        <small className="text-primary fw-bold cursor-pointer" style={{ fontSize: '0.75rem' }}>
                            VIEW ALL ACTIVITY
                        </small>
                    </div>
                </div>
            )}

            <style>
                {`
                    .notification-hover:hover {
                        background-color: #e9ecef !important;
                    }
                    .hover-opacity-100:hover {
                        opacity: 1 !important;
                    }
                `}
            </style>
        </div>
    );
};

export default NotificationBell;