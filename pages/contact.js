export default function Contact() {
  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '2rem' }}>
      <h1>📩 문의하기</h1>
      <form
        action="https://formspree.io/f/오빠의_ID"  // 여기를 오빠 ID로 바꾸면 끝!
        method="POST"
      >
        <label>이름</label>
        <input type="text" name="name" required style={inputStyle} />

        <label>이메일</label>
        <input type="email" name="email" required style={inputStyle} />

        <label>문의 내용</label>
        <textarea name="message" required rows={6} style={{ ...inputStyle, resize: 'vertical' }} />

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
