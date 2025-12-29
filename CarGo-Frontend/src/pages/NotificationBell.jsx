import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const NotificationBell = ({ customerId, isAdmin }) => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const loadNotifications = async () => {
        if (!customerId && !isAdmin) return;
        try {
            const url = isAdmin 
                ? `http://localhost:8080/api/v1/notifications/admin` 
                : `http://localhost:8080/api/v1/notifications/customer/${customerId}`;
            
            const res = await axios.get(url);
            setNotifications(res.data);
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

    return (
        <div className="position-relative d-inline-block" ref={dropdownRef} style={{ zIndex: 9999 }}>
     
            <div className="p-2 cursor-pointer position-relative" onClick={() => setIsOpen(!isOpen)}>
                <i className="bi bi-bell-fill fs-4 text-warning shadow-sm"></i>
                {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                          style={{ fontSize: '0.65rem', marginTop: '10px' }}>
                        {unreadCount}
                    </span>
                )}
            </div>

            
            {isOpen && (
                <div className="shadow-lg border bg-white rounded-3 mt-2 text-dark overflow-hidden" 
                     style={{ 
                        position: 'absolute', right: 0, width: '340px', 
                        maxHeight: '450px', display: 'flex', flexDirection: 'column',
                        zIndex: 10000 
                     }}>
                    
                    <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light fw-bold">
                        <span>Notifications</span>
                        <small className="text-primary cursor-pointer">Settings</small>
                    </div>

                    <div style={{ overflowY: 'auto' }}>
                        {notifications.length === 0 ? (
                            <div className="p-5 text-center text-muted">
                                <i className="bi bi-bell-slash fs-1 d-block mb-2 text-secondary"></i>
                                <p className="small m-0">No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((note) => (
                                <div 
                                    key={note.notificationId}
                                    className={`p-3 border-bottom d-flex align-items-start notification-item ${note.state === 'UNREAD' ? 'bg-light' : ''}`}
                                    onClick={() => handleMarkAsRead(note.notificationId)}
                                    style={{ cursor: 'pointer', transition: '0.2s' }}
                                >
                                    <div className="bg-primary text-white rounded-circle p-2 me-3" 
                                         style={{ minWidth: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="bi bi-info-circle"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className={`mb-0 small ${note.state === 'UNREAD' ? 'fw-bold' : ''}`} style={{ lineHeight: '1.2' }}>
                                            {note.message}
                                        </p>
                                        <small className="text-muted" style={{ fontSize: '0.65rem' }}>{note.sendDate}</small>
                                    </div>
                                    {note.state === 'UNREAD' && (
                                        <div className="ms-2 bg-primary rounded-circle" style={{ width: '8px', height: '8px', marginTop: '5px' }}></div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;