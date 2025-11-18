import PatientForm from './components/PatientForm';
import PatientSearch from './components/PatientSearch';

function App() {
  return (
    <div className="App">
      <header>
        <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>EHR Management System</h1>
      </header>
      <main>
        <PatientForm />
        <PatientSearch />
      </main>
    </div>
  );
}

export default App;
