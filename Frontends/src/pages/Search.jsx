import { useState, useEffect } from 'react';

function Search() {
    const [donors, setDonors] = useState([]);
    const [filters, setFilters] = useState({
        bloodGroup: '',
        city: '',
        availabilityStatus: ''
    });
    const [loading, setLoading] = useState(false);

    const fetchDonors = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams(filters).toString();
            const response = await fetch(`http://localhost:5000/api/donors?${query}`);
            const data = await response.json();
            if (data.message === 'success') {
                setDonors(data.data);
            }
        } catch (error) {
            console.error('Error fetching donors:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []); // Initial load

    const handleSearch = (e) => {
        e.preventDefault();
        fetchDonors();
    };

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2 className="mb-4" style={{ color: 'var(--primary)' }}>Find Blood Donors</h2>

            <div className="card mb-4">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Blood Group</label>
                        <select name="bloodGroup" className="form-select" value={filters.bloodGroup} onChange={handleChange}>
                            <option value="">All Groups</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">City</label>
                        <input
                            type="text"
                            name="city"
                            className="form-input"
                            placeholder="Enter city"
                            value={filters.city}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ height: '42px' }}>Search Donors</button>
                </form>
            </div>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {donors.length > 0 ? (
                        donors.map(donor => (
                            <div key={donor.id} className="card">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 style={{ margin: 0 }}>{donor.fullName}</h3>
                                    <span style={{
                                        background: donor.bloodGroup.includes('+') ? '#ffebee' : '#e3f2fd',
                                        color: donor.bloodGroup.includes('+') ? '#c62828' : '#1565c0',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontWeight: 'bold'
                                    }}>
                                        {donor.bloodGroup}
                                    </span>
                                </div>
                                <p style={{ color: '#666', fontSize: '0.9rem' }}>{donor.age} Years • {donor.gender}</p>
                                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                                    <p><strong>Location:</strong> {donor.city}, {donor.area}</p>
                                    <p><strong>Phone:</strong> {donor.phoneNumber}</p>
                                    <p><strong>Status:</strong> <span style={{ color: donor.availabilityStatus === 'Available' ? 'green' : 'red' }}>{donor.availabilityStatus}</span></p>
                                </div>
                                <a href={`tel:${donor.phoneNumber}`} className="btn btn-outline mt-4" style={{ width: '100%' }}>Call Now</a>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full">No donors found matching your criteria.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;
