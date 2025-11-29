import { useState, useEffect } from 'react';

function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        if (user) {
            fetchNotifications();
            // Poll for notifications every 30 seconds
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/notifications/${user.id}`);
            const data = await response.json();
            if (data.message === 'success') {
                setNotifications(data.data);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/notifications/${id}/read`, { method: 'PUT' });
            setNotifications(notifications.map(n => n.id === id ? { ...n, readStatus: 1 } : n));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const unreadCount = notifications.filter(n => n.readStatus === 0).length;

    if (!user) return null;

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}
            >
                <span style={{ fontSize: '1.5rem' }}>🔔</span>
                {unreadCount > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        background: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '2px 6px',
                        fontSize: '0.7rem'
                    }}>
                        {unreadCount}
                    </span>
                )}
            </button>

            {showDropdown && (
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    width: '300px',
                    background: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    maxHeight: '400px',
                    overflowY: 'auto'
                }}>
                    <h4 style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #eee', margin: 0 }}>Notifications</h4>
                    {notifications.length === 0 ? (
                        <p style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>No notifications</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {notifications.map(n => (
                                <li key={n.id} style={{
                                    padding: '0.75rem 1rem',
                                    borderBottom: '1px solid #eee',
                                    background: n.readStatus === 0 ? '#f0f7ff' : 'white',
                                    cursor: 'pointer'
                                }} onClick={() => markAsRead(n.id)}>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{n.message}</p>
                                    <small style={{ color: '#999' }}>{new Date(n.createdAt).toLocaleString()}</small>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default NotificationBell;
