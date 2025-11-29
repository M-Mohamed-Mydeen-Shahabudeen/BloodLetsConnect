import { Link } from 'react-router-dom';
import NotificationBell from './NotificationBell';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    return (
        <nav style={{ background: 'var(--white)', boxShadow: 'var(--shadow)', padding: '1rem 0' }}>
            <div className="container flex justify-between items-center">
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    BloodLink
                </Link>
                <div className="flex gap-4 items-center">
                    <Link to="/" className="btn btn-outline" style={{ border: 'none' }}>Home</Link>
                    <Link to="/search" className="btn btn-outline" style={{ border: 'none' }}>Find Donor</Link>
                    <Link to="/request-blood" className="btn btn-outline" style={{ border: 'none' }}>Request Blood</Link>

                    {user && user.role === 'hospital' && (
                        <Link to="/hospital" className="btn btn-outline" style={{ border: 'none' }}>Dashboard</Link>
                    )}

                    {user ? (
                        <>
                            <NotificationBell />
                            <Link to="/admin" className="btn btn-primary">Admin/Hospital</Link>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
