'use client';

export default function CourtRoomPage() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      textAlign: 'center',
      padding: '4rem 2rem'
    }}>
      <div style={{
        backgroundColor: '#f8d7da',
        border: '2px dashed #f5c6cb',
        borderRadius: '12px',
        padding: '4rem 2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚖️</div>
        <h1 style={{ color: '#721c24', marginBottom: '1rem' }}>Court Room Simulator</h1>
        <p style={{ color: '#721c24', fontSize: '1.2rem', lineHeight: '1.6' }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus, voluptate! Esse, iure temporibus nulla ea nemo velit error blanditiis similique.
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