import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HospitalDashboard() {
    const [requests, setRequests] = useState([]);
    const [newRequest, setNewRequest] = useState({
        patientName: '',
        bloodGroup: 'A+',
        units: 1
    });
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        if (!user || user.role !== 'hospital') {
            // For demo purposes, if not logged in as hospital, redirect or show message
            // navigate('/login');
        }
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            // In real app, filter by hospitalId. For now, fetch all or filter client side if needed.
            // We implemented filter by hospitalId in backend.
            const response = await fetch(`http://localhost:5000/api/requests?hospitalId=${user.id}`);
            const data = await response.json();
            if (data.message === 'success') {
                setRequests(data.data);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleCreateRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newRequest, hospitalId: user.id || 1 }) // Default to 1 if no user
            });

            if (response.ok) {
                setNewRequest({ patientName: '', bloodGroup: 'A+', units: 1 });
                fetchRequests();
                alert('Blood request created!');
            }
        } catch (error) {
            console.error('Error creating request:', error);
        }
    };

    return (
        <div>
            <h2 className="mb-4" style={{ color: 'var(--primary)' }}>Hospital Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card">
                    <h3 className="mb-4">Create Blood Request</h3>
                    <form onSubmit={handleCreateRequest}>
                        <div className="form-group">
                            <label className="form-label">Patient Name</label>
                            <input
                                type="text"
                                className="form-input"
                                value={newRequest.patientName}
                                onChange={(e) => setNewRequest({ ...newRequest, patientName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Blood Group</label>
                            <select
                                className="form-select"
                                value={newRequest.bloodGroup}
                                onChange={(e) => setNewRequest({ ...newRequest, bloodGroup: e.target.value })}
                            >
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
                            <label className="form-label">Units Required</label>
                            <input
                                type="number"
                                className="form-input"
                                value={newRequest.units}
                                onChange={(e) => setNewRequest({ ...newRequest, units: parseInt(e.target.value) })}
                                min="1"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Create Request</button>
                    </form>
                </div>

                <div className="card">
                    <h3 className="mb-4">Active Requests</h3>
                    {requests.length === 0 ? (
                        <p>No active requests.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {requests.map(req => (
                                <li key={req.id} style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
                                    <div className="flex justify-between">
                                        <strong>{req.patientName}</strong>
                                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{req.bloodGroup}</span>
                                    </div>
                                    <div className="flex justify-between mt-2" style={{ fontSize: '0.9rem', color: '#666' }}>
                                        <span>{req.units} Units</span>
                                        <span>{req.status}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HospitalDashboard;
