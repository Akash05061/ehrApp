import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Patients API
export const patientsAPI = {
  getAll: (params = {}) => api.get('/patients', { params }),
  getById: (id) => api.get(`/patients/${id}`),
  create: (patientData) => api.post('/patients', patientData),
  update: (id, patientData) => api.put(`/patients/${id}`, patientData),
  search: (searchTerm) => api.get('/patients', { params: { search: searchTerm } }),
};

// Appointments API
export const appointmentsAPI = {
  getAll: (params = {}) => api.get('/appointments', { params }),
  create: (appointmentData) => api.post('/appointments', appointmentData),
  updateStatus: (id, status) => api.put(`/appointments/${id}/status`, { status }),
};

// Prescriptions API
export const prescriptionsAPI = {
  create: (prescriptionData) => api.post('/prescriptions', prescriptionData),
  getByPatient: (patientId) => api.get(`/patients/${patientId}/prescriptions`),
};

// Lab Results API
export const labResultsAPI = {
  create: (labData) => api.post('/lab-results', labData),
};

// Files API
export const filesAPI = {
  upload: (patientId, fileData) => {
    const formData = new FormData();
    formData.append('file', fileData.file);
    formData.append('fileType', fileData.fileType);
    formData.append('description', fileData.description);
    
    return api.post(`/patients/${patientId}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getByPatient: (patientId) => api.get(`/patients/${patientId}/files`),
};

// Analytics API
export const analyticsAPI = {
  getOverview: () => api.get('/analytics/overview'),
};

export default api;
