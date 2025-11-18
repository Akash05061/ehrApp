import { useState } from 'react';

const PatientSearch = () => {
  const [patientId, setPatientId] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPatient = async () => {
    if (!patientId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/patients/${patientId}`);
      if (response.ok) {
        const data = await response.json();
        setPatientData(data);
      } else {
        setPatientData(null);
        alert('Patient not found');
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
      alert('Backend not connected. This is expected during development.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-search">
      <h2>Fetch Patient by ID</h2>
      <div className="search-container">
        <input
          type="number"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button onClick={fetchPatient} disabled={loading}>
          {loading ? 'Searching...' : 'Fetch Patient'}
        </button>
      </div>
      
      {patientData && (
        <div className="patient-details">
          <h3>Patient Details</h3>
          <p><strong>Name:</strong> {patientData.firstName} {patientData.lastName}</p>
          <p><strong>DOB:</strong> {patientData.dateOfBirth}</p>
          <p><strong>Allergies:</strong> {patientData.allergies || 'None'}</p>
        </div>
      )}
    </div>
  );
};

export default PatientSearch;
