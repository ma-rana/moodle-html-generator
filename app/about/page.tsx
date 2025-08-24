'use client';

export default function AboutPage() {
  const studentName = "Basanta Rana Magar";
  const studentNumber = "21835022";

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>About This Project</h1>
      
      {/* Personal Information */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '1px solid #e9ecef',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#007bff', marginBottom: '1rem' }}>Student Information</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          <strong>Name:</strong> {studentName}
        </p>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
          <strong>Student Number:</strong> {studentNumber}
        </p>
        
        <div style={{
          backgroundColor: '#e3f2fd',
          padding: '1rem',
          borderRadius: '5px',
          border: '1px solid #bbdefb'
        }}>
          <p style={{ margin: '0', fontStyle: 'italic', color: '#1976d2' }}>
            Creating interactive educational content for LMS deployment
          </p>
        </div>
      </div>

    <div style={{
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#495057', marginBottom: '1rem' }}>🚧 Coming Soon</h2>
      </div>

      {/* Project Features */}
      <div style={{
        backgroundColor: '#d1ecf1',
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '1px solid #bee5eb'
      }}>
        <h2 style={{ color: '#0c5460', marginBottom: '1rem' }}>🚀 Project Features</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '5px',
            border: '1px solid #b8daff'
          }}>
            <h3 style={{ color: '#004085', marginTop: '0' }}>🎨 Interactive Tabs</h3>
            <p style={{ margin: '0', color: '#004085' }}>
              Generate fully functional HTML5 tabs with smooth animations and responsive design
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '5px',
            border: '1px solid #b8daff'
          }}>
            <h3 style={{ color: '#004085', marginTop: '0' }}>♿ Accessibility</h3>
            <p style={{ margin: '0', color: '#004085' }}>
              WCAG compliant with keyboard navigation, ARIA labels, and screen reader support
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '5px',
            border: '1px solid #b8daff'
          }}>
            <h3 style={{ color: '#004085', marginTop: '0' }}>📱 Responsive</h3>
            <p style={{ margin: '0', color: '#004085' }}>
              Mobile-first design that works perfectly on all devices and screen sizes
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '5px',
            border: '1px solid #b8daff'
          }}>
            <h3 style={{ color: '#004085', marginTop: '0' }}>🌙 Theme Support</h3>
            <p style={{ margin: '0', color: '#004085' }}>
              Built-in dark/light mode toggle with persistent theme preferences
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '5px',
            border: '1px solid #b8daff'
          }}>
            <h3 style={{ color: '#004085', marginTop: '0' }}>📋 Copy & Deploy</h3>
            <p style={{ margin: '0', color: '#004085' }}>
              One-click code copying with self-contained HTML ready for LMS deployment
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '5px',
            border: '1px solid #b8daff'
          }}>
            <h3 style={{ color: '#004085', marginTop: '0' }}>🍪 State Memory</h3>
            <p style={{ margin: '0', color: '#004085' }}>
              Remembers your last visited tab using cookies for better user experience
            </p>
          </div>
        </div>
      </div>

      {/* Future Pages Preview */}
      <div style={{
        backgroundColor: '#e2e3e5',
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '1px solid #d6d8db'
      }}>
        <h2 style={{ color: '#383d41', marginBottom: '1rem' }}>🚧 Coming Soon</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '5px',
            border: '1px solid #ced4da',
            textAlign: 'center',
            opacity: '0.8'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔐</div>
            <h3 style={{ color: '#495057', marginTop: '0' }}>Escape Room</h3>
            <p style={{ margin: '0', color: '#6c757d', fontSize: '0.9rem' }}>
              Interactive puzzle generator
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '5px',
            border: '1px solid #ced4da',
            textAlign: 'center',
            opacity: '0.8'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏁</div>
            <h3 style={{ color: '#495057', marginTop: '0' }}>Coding Races</h3>
            <p style={{ margin: '0', color: '#6c757d', fontSize: '0.9rem' }}>
              Competitive coding challenges
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '5px',
            border: '1px solid #ced4da',
            textAlign: 'center',
            opacity: '0.8'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚖️</div>
            <h3 style={{ color: '#495057', marginTop: '0' }}>Court Room</h3>
            <p style={{ margin: '0', color: '#6c757d', fontSize: '0.9rem' }}>
              Legal simulation environment
            </p>
          </div>
        </div>
        
        <p style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem', 
          color: '#6c757d',
          fontStyle: 'italic',
          margin: '1.5rem 0 0 0'
        }}>
          These pages are currently under development and will be available in future updates.
        </p>
      </div>

      {/* Contact Information */}
      <div style={{
        backgroundColor: '#d4edda',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #c3e6cb',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#155724', marginBottom: '1rem' }}>📞 Need Help?</h2>
        <p style={{ color: '#155724', lineHeight: '1.6', margin: '0' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, numquam.
        </p>
      </div>
    </div>
  );
}