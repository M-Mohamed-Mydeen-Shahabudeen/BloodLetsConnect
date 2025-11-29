import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [donors, setDonors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }
        fetchDonors();
    }, [navigate]);

    const fetchDonors = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/donors');
            const data = await response.json();
            if (data.message === 'success') {
                setDonors(data.data);
            }
        } catch (error) {
            console.error('Error fetching donors:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this donor?')) {
            try {
                await fetch(`http://localhost:5000/api/donors/${id}`, { method: 'DELETE' });
                fetchDonors();
            } catch (error) {
                console.error('Error deleting donor:', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 style={{ color: 'var(--primary)' }}>Manage Donors</h2>
                <div className="flex gap-4">
                    <Link to="/admin/add" className="btn btn-primary">Add New Donor</Link>
                    <button onClick={handleLogout} className="btn btn-outline">Logout</button>
                </div>
            </div>

            <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Blood Group</th>
                            <th style={{ padding: '1rem' }}>Contact</th>
                            <th style={{ padding: '1rem' }}>Location</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donors.map(donor => (
                            <tr key={donor.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{donor.fullName}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{donor.bloodGroup}</span>
                                </td>
                                <td style={{ padding: '1rem' }}>{donor.phoneNumber}</td>
                                <td style={{ padding: '1rem' }}>{donor.city}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ color: donor.availabilityStatus === 'Available' ? 'green' : 'red' }}>
                                        {donor.availabilityStatus}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div className="flex gap-2">
                                        <Link to={`/admin/edit/${donor.id}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}>Edit</Link>
                                        <button onClick={() => handleDelete(donor.id)} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem', background: '#d32f2f' }}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {donors.length === 0 && <p className="text-center" style={{ padding: '2rem' }}>No donors found.</p>}
            </div>
        </div>
    );
}

export default AdminDashboard;
