// pages/contact.js
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('메시지가 전송된 것처럼 보입니다 :) (이메일 연동은 아직 없음)');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📩 문의하기</h1>
      <form onSubmit={handleSubmit}>
        <label>이름</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <label>이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <label>문의 내용</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
        <button type="submit" style={buttonStyle}>전송</button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  margin: '0.5rem 0 1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '0.8rem 1.5rem',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#00b894',
  color: '#fff',
  cursor: 'pointer',
};
