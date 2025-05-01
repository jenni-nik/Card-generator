import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';

export default function App() {
  const [form, setForm] = useState({
    name: '',
    car: '',
    date: '',
    service: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDownload = () => {
    const element = cardRef.current;
    html2pdf().from(element).save(`${form.name || 'service'}_card.pdf`);
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem', backgroundColor: '#111', fontSize: '20px' ,minHeight: '100vh', color: 'white' }}>
      <h1 style={{ color: '#facc15' }}>Garage Service Card Generator</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input type="text" name="name" placeholder="Ім’я" value={form.name} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="car" placeholder="Авто" value={form.car} onChange={handleChange} required style={inputStyle} />
        <input type="date" name="date" value={form.date} onChange={handleChange} required style={inputStyle} />
        <textarea name="service" placeholder="Роботи виконані..." value={form.service} onChange={handleChange} required style={{ ...inputStyle, height: '80px' }} />
        <button type="submit" style={buttonStyle}>Згенерувати картку</button>
      </form>

      {submitted && (
        <>
          <div ref={cardRef} style={cardStyle}>
            <h2>📋 Картка обслуговування</h2>
            <p><strong>Ім’я:</strong> {form.name}</p>
            <p><strong>Авто:</strong> {form.car}</p>
            <p><strong>Дата:</strong> {form.date}</p>
            <p><strong>Роботи:</strong> {form.service}</p>
          </div>

          <button onClick={handleDownload} style={{ ...buttonStyle, marginTop: '10px' }}>
            Зберегти як PDF
          </button>
        </>
      )}
    </div>
  );
}

const inputStyle = {
  display: 'block',
  margin: '10px 0',
  padding: '10px',
  width: '100%',
  maxWidth: '400px',
  borderRadius: '5px',
  border: 'none',
  fontSize: '20px'
};

const buttonStyle = {
  backgroundColor: '#facc15',
  color: '#111',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const cardStyle = {
  backgroundColor: '#222',
  padding: '20px',
  borderRadius: '10px',
  maxWidth: '400px',
  border: '2px solid #facc15',
  marginBottom: '1rem'
};