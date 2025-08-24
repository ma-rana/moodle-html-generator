'use client';

export default function CodingRacesPage() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      textAlign: 'center',
      padding: '4rem 2rem'
    }}>
      <div style={{
        backgroundColor: '#d1ecf1',
        border: '2px dashed #bee5eb',
        borderRadius: '12px',
        padding: '4rem 2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏁</div>
        <h1 style={{ color: '#0c5460', marginBottom: '1rem' }}>Coding Races Generator</h1>
        <p style={{ color: '#0c5460', fontSize: '1.2rem', lineHeight: '1.6' }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, assumenda earum. Nisi quos vel eos impedit ea aperiam voluptatibus delectus?
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