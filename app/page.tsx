'use client';

import { useState, useEffect } from 'react';

interface Tab {
  id: number;
  title: string;
  content: string;
}

export default function HomePage() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: 'Tab 1', content: 'This is the content for tab 1' }
  ]);
  const [newTabTitle, setNewTabTitle] = useState('');
  const [newTabContent, setNewTabContent] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      try {
        if (typeof document !== 'undefined') {
          const theme = document.documentElement.getAttribute('data-theme');
          setIsDarkMode(theme === 'dark');
        }
      } catch (error) {
        console.log('Theme detection not available');
      }
    };

    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }

    return () => observer.disconnect();
  }, []);

  const addTab = () => {
    if (newTabTitle.trim() && newTabContent.trim()) {
      const newTab: Tab = {
        id: Date.now(),
        title: newTabTitle.trim(),
        content: newTabContent.trim()
      };
      setTabs([...tabs, newTab]);
      setNewTabTitle('');
      setNewTabContent('');
    }
  };

  const removeTab = (id: number) => {
    setTabs(tabs.filter(tab => tab.id !== id));
  };

  const updateTab = (id: number, field: keyof Tab, value: string) => {
    setTabs(tabs.map(tab => 
      tab.id === id ? { ...tab, [field]: value } : tab
    ));
  };

  const generateHTML = () => {
    const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Tabs</title>
    <style>
        :root {
            --bg-color: #f5f5f5;
            --container-bg: white;
            --nav-bg: #e9ecef;
            --border-color: #dee2e6;
            --text-color: #495057;
            --text-dark: #212529;
            --primary-color: #007bff;
            --hover-bg: #dee2e6;
        }

        [data-theme="dark"] {
            --bg-color: #1a1a1a;
            --container-bg: #2d2d2d;
            --nav-bg: #404040;
            --border-color: #555;
            --text-color: #e2e8f0;
            --text-dark: #ffffff;
            --primary-color: #4dabf7;
            --hover-bg: #555;
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: var(--bg-color);
            color: var(--text-color);
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .theme-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .theme-toggle:hover {
            transform: scale(1.1);
        }

        .tabs-container {
            max-width: 800px;
            margin: 0 auto;
            background-color: var(--container-bg);
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
            transition: background-color 0.3s ease;
        }
        .tabs-nav {
            display: flex;
            background-color: var(--nav-bg);
            border-bottom: 1px solid var(--border-color);
            transition: background-color 0.3s ease;
        }
        .tab-button {
            background: none;
            border: none;
            padding: 15px 20px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            color: var(--text-color);
            transition: all 0.3s ease;
            border-bottom: 3px solid transparent;
            flex: 1;
        }
        .tab-button:hover {
            background-color: var(--hover-bg);
            color: var(--text-dark);
        }
        .tab-button:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: -2px;
        }
        .tab-button.active {
            background-color: var(--container-bg);
            color: var(--primary-color);
            border-bottom-color: var(--primary-color);
        }
        .tab-content {
            padding: 30px;
            min-height: 200px;
            line-height: 1.6;
            color: var(--text-dark);
            background-color: var(--container-bg);
        }
        .tab-panel {
            display: none;
        }
        .tab-panel.active {
            display: block;
            animation: fadeIn 0.3s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
            .tabs-nav {
                flex-direction: column;
            }
            .tab-button {
                text-align: left;
            }
        }
    </style>
</head>
<body>
    <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">
        <span class="theme-icon">🌙</span>
    </button>

    <div class="tabs-container">
        <div class="tabs-nav" role="tablist">
${tabs.map((tab, index) => 
`            <button class="tab-button${index === 0 ? ' active' : ''}" role="tab" aria-selected="${index === 0 ? 'true' : 'false'}" aria-controls="panel-${tab.id}" id="tab-${tab.id}" onclick="switchTab(event, 'panel-${tab.id}')">${tab.title}</button>`
).join('\n')}
        </div>
        <div class="tab-content">
${tabs.map((tab, index) => 
`            <div id="panel-${tab.id}" class="tab-panel${index === 0 ? ' active' : ''}" role="tabpanel" aria-labelledby="tab-${tab.id}">
                <p>${tab.content}</p>
            </div>`
).join('\n')}
        </div>
    </div>

    <script>
        function switchTab(event, panelId) {
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabPanels = document.querySelectorAll('.tab-panel');
            
            tabButtons.forEach(button => {
                button.classList.remove('active');
                button.setAttribute('aria-selected', 'false');
            });
            
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            
            event.target.classList.add('active');
            event.target.setAttribute('aria-selected', 'true');
            document.getElementById(panelId).classList.add('active');
        }

        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            
            const themeIcon = document.querySelector('.theme-icon');
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {
                console.log('LocalStorage not available');
            }
        }

        // Initialize theme
        function initializeTheme() {
            try {
                const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', savedTheme);
                const themeIcon = document.querySelector('.theme-icon');
                themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
            } catch (e) {
                console.log('Theme initialization failed');
            }
        }

        document.addEventListener('DOMContentLoaded', initializeTheme);

        document.addEventListener('keydown', function(event) {
            const activeTab = document.querySelector('.tab-button.active');
            if (!activeTab) return;
            
            const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
            const currentIndex = tabButtons.indexOf(activeTab);
            
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault();
                const nextIndex = event.key === 'ArrowRight' 
                    ? (currentIndex + 1) % tabButtons.length 
                    : (currentIndex - 1 + tabButtons.length) % tabButtons.length;
                
                tabButtons[nextIndex].click();
                tabButtons[nextIndex].focus();
            }
        });
    </script>
</body>
</html>`;
    
    setGeneratedCode(htmlCode);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      const textArea = document.createElement('textarea');
      textArea.value = generatedCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Code copied to clipboard!');
    }
  };

  const getStyles = () => ({
    backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f9fa',
    color: isDarkMode ? '#e2e8f0' : '#495057',
    borderColor: isDarkMode ? '#555' : '#e9ecef',
  });

  const getInputStyles = () => ({
    backgroundColor: isDarkMode ? '#404040' : 'white',
    color: isDarkMode ? '#e2e8f0' : '#495057',
    borderColor: isDarkMode ? '#666' : '#ced4da',
  });

  const getCardStyles = () => ({
    backgroundColor: isDarkMode ? '#404040' : 'white',
    borderColor: isDarkMode ? '#666' : '#dee2e6',
  });

  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '0 auto',
      transition: 'all 0.3s ease'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        color: isDarkMode ? '#ffffff' : '#000000'
      }}>
        Interactive Tabs Generator
      </h1>
      
      <div style={{
        ...getStyles(),
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: `1px solid ${isDarkMode ? '#555' : '#e9ecef'}`,
        transition: 'all 0.3s ease'
      }}>
        <h2 style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Configure Your Tabs</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: isDarkMode ? '#e2e8f0' : '#495057' }}>Current Tabs</h3>
          {tabs.map((tab) => (
            <div key={tab.id} style={{
              ...getCardStyles(),
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '5px',
              border: `1px solid ${isDarkMode ? '#666' : '#dee2e6'}`,
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={tab.title}
                  onChange={(e) => updateTab(tab.id, 'title', e.target.value)}
                  style={{
                    ...getInputStyles(),
                    padding: '0.5rem',
                    border: `1px solid ${isDarkMode ? '#666' : '#ced4da'}`,
                    borderRadius: '4px',
                    flex: 1,
                    marginRight: '1rem',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="Tab title"
                />
                <button
                  onClick={() => removeTab(tab.id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = '#c82333';
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = '#dc3545';
                  }}
                >
                  Remove
                </button>
              </div>
              <textarea
                value={tab.content}
                onChange={(e) => updateTab(tab.id, 'content', e.target.value)}
                style={{
                  ...getInputStyles(),
                  width: '100%',
                  height: '80px',
                  padding: '0.5rem',
                  border: `1px solid ${isDarkMode ? '#666' : '#ced4da'}`,
                  borderRadius: '4px',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '1rem',
                  resize: 'vertical',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Tab content"
              />
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: isDarkMode ? '#1e3a5f' : '#e3f2fd',
          padding: '1.5rem',
          borderRadius: '5px',
          border: `1px solid ${isDarkMode ? '#2c5aa0' : '#bbdefb'}`,
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Add New Tab</h3>
          <input
            type="text"
            value={newTabTitle}
            onChange={(e) => setNewTabTitle(e.target.value)}
            placeholder="New tab title"
            style={{
              ...getInputStyles(),
              width: '100%',
              padding: '0.5rem',
              marginBottom: '1rem',
              border: `1px solid ${isDarkMode ? '#666' : '#ced4da'}`,
              borderRadius: '4px',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
          />
          <textarea
            value={newTabContent}
            onChange={(e) => setNewTabContent(e.target.value)}
            placeholder="New tab content"
            style={{
              ...getInputStyles(),
              width: '100%',
              height: '80px',
              padding: '0.5rem',
              marginBottom: '1rem',
              border: `1px solid ${isDarkMode ? '#666' : '#ced4da'}`,
              borderRadius: '4px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '1rem',
              resize: 'vertical',
              transition: 'all 0.3s ease'
            }}
          />
          <button
            onClick={addTab}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#218838';
              (e.target as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#28a745';
              (e.target as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Add Tab
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button
          onClick={generateHTML}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,123,255,0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#0056b3';
            (e.target as HTMLElement).style.transform = 'translateY(-2px)';
            (e.target as HTMLElement).style.boxShadow = '0 4px 8px rgba(0,123,255,0.4)';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#007bff';
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            (e.target as HTMLElement).style.boxShadow = '0 2px 4px rgba(0,123,255,0.3)';
          }}
        >
          🚀 Generate HTML5 Code
        </button>
      </div>

      {generatedCode && (
        <div style={{
          backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f9fa',
          border: `1px solid ${isDarkMode ? '#555' : '#e9ecef'}`,
          borderRadius: '8px',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            backgroundColor: isDarkMode ? '#404040' : '#e9ecef',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${isDarkMode ? '#555' : '#dee2e6'}`
          }}>
            <h3 style={{ 
              margin: '0', 
              color: isDarkMode ? '#ffffff' : '#495057'
            }}>
              Generated HTML5 Code
            </h3>
            <button
              onClick={copyToClipboard}
              style={{
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#138496';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#17a2b8';
              }}
            >
              📋 Copy Code
            </button>
          </div>
          <pre style={{
            margin: '0',
            padding: '1.5rem',
            backgroundColor: isDarkMode ? '#1a1a1a' : '#2d3748',
            color: '#e2e8f0',
            overflow: 'auto',
            fontSize: '0.9rem',
            lineHeight: '1.4',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
            {generatedCode}
          </pre>
        </div>
      )}

      <div style={{
        backgroundColor: isDarkMode ? '#2d1b0e' : '#fff3cd',
        border: `1px solid ${isDarkMode ? '#5d4a1f' : '#ffeaa7'}`,
        borderRadius: '8px',
        padding: '1.5rem',
        marginTop: '2rem',
        transition: 'all 0.3s ease'
      }}>
        <h3 style={{ 
          color: isDarkMode ? '#ffd93d' : '#856404', 
          marginTop: '0' 
        }}>
          📝 Instructions
        </h3>
        <ol style={{ 
          color: isDarkMode ? '#e2e8f0' : '#856404', 
          lineHeight: '1.6' 
        }}>
          <li>Configure your tabs above by editing existing ones or adding new tabs</li>
          <li>{`Click "Generate HTML5 Code" to create the complete HTML file`}</li>
          <li>{`Copy the generated code using the "Copy Code" button`}</li>
          <li>{`Save the code as a .html file (e.g., "tabs.html")`}</li>
          <li>Open the file in any web browser to see your interactive tabs</li>
          <li>Upload to your LMS for deployment</li>
        </ol>
      </div>
    </div>
  );
}