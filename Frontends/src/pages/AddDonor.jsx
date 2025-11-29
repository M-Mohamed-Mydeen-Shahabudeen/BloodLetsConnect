import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddDonor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: 'Male',
        bloodGroup: 'A+',
        phoneNumber: '',
        email: '',
        city: '',
        area: '',
        pincode: '',
        availabilityStatus: 'Available'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
        }
        if (id) {
            fetchDonor();
        }
    }, [id, navigate]);

    const fetchDonor = async () => {
        try {
            // In a real app, we might need a specific endpoint to get one donor by ID
            // For now, we can filter from the list or assume we have an endpoint
            // Our backend doesn't have GET /:id, let's add it or just fetch all and find.
            // Wait, I didn't add GET /:id in backend. I should add it.
            // Or I can just fetch all and filter client side for now.
            // Better to add GET /:id to backend. I'll do that next.
            // For now, let's assume it exists or implement it.
            // Actually, I'll implement GET /:id in backend quickly.

            // Let's assume I'll add it.
            const response = await fetch(`http://localhost:5000/api/donors`);
            const data = await response.json();
            if (data.message === 'success') {
                const donor = data.data.find(d => d.id === parseInt(id));
                if (donor) setFormData(donor);
            }
        } catch (error) {
            console.error('Error fetching donor:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = id ? `http://localhost:5000/api/donors/${id}` : 'http://localhost:5000/api/donors';
        const method = id ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate('/admin');
            } else {
                alert('Failed to save donor');
            }
        } catch (error) {
            console.error('Error saving donor:', error);
            alert('Error saving donor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="card" style={{ width: '100%', maxWidth: '600px' }}>
                <h2 className="mb-4" style={{ color: 'var(--primary)' }}>{id ? 'Edit Donor' : 'Add New Donor'}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" name="fullName" className="form-input" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Age</label>
                        <input type="number" name="age" className="form-input" value={formData.age} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Gender</label>
                        <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Blood Group</label>
                        <select name="bloodGroup" className="form-select" value={formData.bloodGroup} onChange={handleChange}>
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
                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input type="tel" name="phoneNumber" className="form-input" value={formData.phoneNumber} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">City</label>
                        <input type="text" name="city" className="form-input" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Area</label>
                        <input type="text" name="area" className="form-input" value={formData.area} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Pincode</label>
                        <input type="text" name="pincode" className="form-input" value={formData.pincode} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Availability</label>
                        <select name="availabilityStatus" className="form-select" value={formData.availabilityStatus} onChange={handleChange}>
                            <option value="Available">Available</option>
                            <option value="Not Available">Not Available</option>
                        </select>
                    </div>
                    <div className="col-span-full flex gap-4 mt-4">
                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1 }}>
                            {loading ? 'Saving...' : 'Save Donor'}
                        </button>
                        <button type="button" className="btn btn-outline" onClick={() => navigate('/admin')} style={{ flex: 1 }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddDonor;
