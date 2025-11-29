import { useState } from 'react';

function RequestBlood() {
    const [request, setRequest] = useState({
        patientName: '',
        bloodGroup: 'A+',
        units: 1,
        hospitalId: 1 // Defaulting to hospital 1 for public requests for now
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            });

            if (response.ok) {
                alert('Blood request submitted successfully! Hospitals will be notified.');
                setRequest({ patientName: '', bloodGroup: 'A+', units: 1, hospitalId: 1 });
            } else {
                alert('Failed to submit request.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting request.');
        }
    };

    return (
        <div className="flex justify-center">
            <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
                <h2 className="text-center mb-4" style={{ color: 'var(--primary)' }}>Request Blood</h2>
                <p className="text-center mb-4 text-gray-600">Submit a request for blood. Local hospitals and donors will be notified.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Patient Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={request.patientName}
                            onChange={(e) => setRequest({ ...request, patientName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Blood Group Needed</label>
                        <select
                            className="form-select"
                            value={request.bloodGroup}
                            onChange={(e) => setRequest({ ...request, bloodGroup: e.target.value })}
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
                            value={request.units}
                            onChange={(e) => setRequest({ ...request, units: parseInt(e.target.value) })}
                            min="1"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" style={{ width: '100%' }}>Submit Request</button>
                </form>
            </div>
        </div>
    );
}

export default RequestBlood;
