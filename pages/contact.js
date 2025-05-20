export default function Contact() {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '4rem auto',
      padding: '3rem',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <h1 style={{
        fontSize: '2.2rem',
        fontWeight: '700',
        marginBottom: '2rem',
        textAlign: 'center',
        color: '#2d3436'
      }}>
        📩 문의하기
      </h1>
      <form
        action="https://formspree.io/f/xovdbpjq"
        method="POST"
      >
        <label style={labelStyle}>이름</label>
        <input type="text" name="name" required style={inputStyle} />

        <label style={labelStyle}>이메일</label>
        <input type="email" name="email" required style={inputStyle} />

        <label style={labelStyle}>문의 내용</label>
        <textarea name="message" required rows={6} style={textareaStyle} />

        <button type="submit" style={buttonStyle}>✉️ 전송하기</button>
      </form>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: '600',
  color: '#636e72'
};

const inputStyle = {
  width: '100%',
  padding: '0.9rem',
  marginBottom: '1.5rem',
  borderRadius: '8px',
  border: '1px solid #dcdde1',
  fontSize: '1rem',
  outline: 'none',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical'
};

const buttonStyle = {
  width: '100%',
  padding: '1rem',
  fontSize: '1.1rem',
  backgroundColor: '#00b894',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s'
};
