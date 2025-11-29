import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="text-center" style={{ padding: '4rem 0' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>Save a Life, Donate Blood</h1>
            <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                Connect with blood donors in your area quickly and easily. Every drop counts.
            </p>
            <div className="flex justify-center gap-4">
                <Link to="/search" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '0.75rem 2rem' }}>
                    Find a Donor
                </Link>
                <Link to="/login" className="btn btn-outline" style={{ fontSize: '1.2rem', padding: '0.75rem 2rem' }}>
                    Admin Access
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4" style={{ marginTop: '4rem' }}>
                <div className="card">
                    <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Find Donors</h3>
                    <p>Search by blood group and location to find available donors near you.</p>
                </div>
                <div className="card">
                    <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Contact Directly</h3>
                    <p>Get phone numbers and email addresses to contact donors immediately.</p>
                </div>
                <div className="card">
                    <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Save Lives</h3>
                    <p>Your quick action can save a life in an emergency.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
