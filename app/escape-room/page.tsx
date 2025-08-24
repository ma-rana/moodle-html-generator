'use client';

export default function EscapeRoomPage() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      textAlign: 'center',
      padding: '4rem 2rem'
    }}>
      <div style={{
        backgroundColor: '#fff3cd',
        border: '2px dashed #ffeaa7',
        borderRadius: '12px',
        padding: '4rem 2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
        <h1 style={{ color: '#856404', marginBottom: '1rem' }}>Escape Room Generator</h1>
        <p style={{ color: '#856404', fontSize: '1.2rem', lineHeight: '1.6' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel temporibus repellendus praesentium ea, atque eaque deserunt eius neque? Eveniet, quo!
        </p>
      </div>

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{ color: '#495057', marginBottom: '1rem' }}>🚧 Coming Soon</h2>
      </div>
    </div>
  );
}