'use client';

import { useState, useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LMS HTML5 Generator</title>
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const studentNumber = "21835022";
  const studentName = "Basanta Rana Magar";

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    const savedTab = document.cookie
      .split('; ')
      .find(row => row.startsWith('activeTab='))
      ?.split('=')[1];
    if (savedTab) {
      setActiveTab(savedTab);
    }

    const style = document.createElement('style');
    style.textContent = `
      * {
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      button:focus,
      input:focus,
      textarea:focus,
      select:focus {
        outline: 2px solid #007bff;
        outline-offset: 2px;
      }
      
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    document.cookie = `activeTab=${tab}; path=/; max-age=31536000`;
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      fontFamily: 'Arial, sans-serif',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>

      <header style={{
        backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f9fa',
        padding: '1rem',
        borderBottom: '2px solid ' + (isDarkMode ? '#404040' : '#e0e0e0'),
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>

          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            Student #: {studentNumber}
          </div>

          <h1 style={{
            fontSize: '1.5rem',
            margin: '0',
            textAlign: 'center',
            flex: 1
          }}>
            LMS HTML5 Generator
          </h1>

          <button 
            onClick={toggleTheme}
            style={{
              backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
              border: 'none',
              borderRadius: '5px',
              padding: '0.5rem',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button
            onClick={toggleMenu}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              padding: '0.5rem'
            }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div style={{
              width: '25px',
              height: '3px',
              backgroundColor: isDarkMode ? '#fff' : '#000',
              margin: '3px 0',
              transition: '0.3s',
              transform: isMenuOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none'
            }}></div>
            <div style={{
              width: '25px',
              height: '3px',
              backgroundColor: isDarkMode ? '#fff' : '#000',
              margin: '3px 0',
              transition: '0.3s',
              opacity: isMenuOpen ? '0' : '1'
            }}></div>
            <div style={{
              width: '25px',
              height: '3px',
              backgroundColor: isDarkMode ? '#fff' : '#000',
              margin: '3px 0',
              transition: '0.3s',
              transform: isMenuOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none'
            }}></div>
          </button>
        </div>

        {isMenuOpen && (
          <nav style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f9fa',
            border: '1px solid ' + (isDarkMode ? '#404040' : '#e0e0e0'),
            borderRadius: '5px',
            padding: '1rem',
            minWidth: '200px',
            zIndex: 1000
          }}>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              margin: '0'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a
                  href="/ " 
                  style={{
                    textDecoration: 'none',
                    color: isDarkMode ? '#fff' : '#000',
                    display: 'block',
                    padding: '0.5rem',
                    borderRadius: '3px',
                    backgroundColor: activeTab === 'home' ? (isDarkMode ? '#404040' : '#e0e0e0') : 'transparent'
                  }}
                  onClick={() => handleTabChange('home')}
                >
                  🏠 Home
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a 
                  href="/about" 
                  style={{
                    textDecoration: 'none',
                    color: isDarkMode ? '#fff' : '#000',
                    display: 'block',
                    padding: '0.5rem',
                    borderRadius: '3px',
                    backgroundColor: activeTab === 'about' ? (isDarkMode ? '#404040' : '#e0e0e0') : 'transparent'
                  }}
                  onClick={() => handleTabChange('about')}
                >
                  ℹ️ About
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a 
                  href="/escape-room" 
                  style={{
                    textDecoration: 'none',
                    color: isDarkMode ? '#fff' : '#000',
                    display: 'block',
                    padding: '0.5rem',
                    borderRadius: '3px',
                    backgroundColor: activeTab === 'escape-room' ? (isDarkMode ? '#404040' : '#e0e0e0') : 'transparent'
                  }}
                  onClick={() => handleTabChange('escape-room')}
                >
                  🔐 Escape Room
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a 
                  href="/coding-races" 
                  style={{
                    textDecoration: 'none',
                    color: isDarkMode ? '#fff' : '#000',
                    display: 'block',
                    padding: '0.5rem',
                    borderRadius: '3px',
                    backgroundColor: activeTab === 'coding-races' ? (isDarkMode ? '#404040' : '#e0e0e0') : 'transparent'
                  }}
                  onClick={() => handleTabChange('coding-races')}
                >
                  🏁 Coding Races
                </a>
              </li>
              <li>
                <a 
                  href="/court-room" 
                  style={{
                    textDecoration: 'none',
                    color: isDarkMode ? '#fff' : '#000',
                    display: 'block',
                    padding: '0.5rem',
                    borderRadius: '3px',
                    backgroundColor: activeTab === 'court-room' ? (isDarkMode ? '#404040' : '#e0e0e0') : 'transparent'
                  }}
                  onClick={() => handleTabChange('court-room')}
                >
                  ⚖️ Court Room
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        minHeight: 'calc(100vh - 200px)'
      }}>
        {children}
      </main>

      <footer style={{
        backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f9fa',
        borderTop: '2px solid ' + (isDarkMode ? '#404040' : '#e0e0e0'),
        padding: '1rem',
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} {studentName} | Student Number: {studentNumber}
          </p>
          <p style={{ margin: '0.5rem 0', fontSize: '0.8rem', opacity: '0.8' }}>
            Created on: {new Date().toLocaleDateString()}
          </p>
        </div>
      </footer>
    </div>
  );
}