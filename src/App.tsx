import AutofillInput from './components/AutofillInput';
import './App.css'; // You can add global styles here or remove if not needed

function App() {
  return (
    <div className="app-container">
      <h1>Autofill Input Demo</h1>
      <AutofillInput />
      <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#555' }}>
        <p>Try typing: "react", "next", "node", "type", "redux", "tailwind"</p>
        <p>Open your browser's console to see cache hit/miss messages.</p>
      </div>
    </div>
  );
}

export default App;