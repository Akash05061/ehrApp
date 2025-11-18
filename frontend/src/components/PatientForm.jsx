import { useState } from 'react';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    allergies: '',
    gender: '',
    phone: '',
    email: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Patient created successfully!');
        setFormData({ firstName: '', lastName: '', dateOfBirth: '', allergies: '', gender: '', phone: '', email: '' });
      } else {
        alert('Error creating patient. (Backend not connected)');
      }
    } catch (error) {
      console.error('Error creating patient:', error);
      alert('Error creating patient. Backend not connected.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="patient-form">
      <h2>Create New Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          name="allergies"
          placeholder="Allergies (comma separated)"
          value={formData.allergies}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Create Patient</button>
      </form>
    </div>
  );
};

export default PatientForm;
