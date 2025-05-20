import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('전송 중...');

    emailjs
      .send(
        'service_en30nc5',      // 오빠 서비스 ID
        'template_u434fzy',     // 템플릿 ID
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        'lv6C_Cuih2klty8PM'      // 퍼블릭 키
      )
      .then(
        () => {
          setStatus('✅ 전송 완료! 메일 확인 후 빠르게 답변드릴게요.');
          setForm({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error(error);
          setStatus('❌ 전송 실패. 다시 시도해주세요.');
        }
      );
  };

  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '2rem' }}>
      <h1>📩 문의하기</h1>
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
        <p style={{ marginTop: '1rem', color: '#555' }}>{status}</p>
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
