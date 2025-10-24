'use client';

import { useState, useEffect } from 'react';

interface Stage {
  id: number;
  title: string;
  description: string;
  type: 'format' | 'debug' | 'generate' | 'transform';
  code: string;
  solution: string;
  hint: string;
}

export default function EscapeRoom() {
  const [currentStage, setCurrentStage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes default
  const [customTime, setCustomTime] = useState('30');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerSet, setIsTimerSet] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameFailed, setGameFailed] = useState(false);

const saveSolution = async () => {
  try {
    const response = await fetch('/api/solutions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stageId: currentStage + 1,
        code: userCode,
        isCorrect: isCorrect,
        timeSpent: (parseInt(customTime) * 60) - timeRemaining,
        userId: 'user-' + Date.now()
      })
    });
    
    if (response.ok) {
      alert('Solution saved successfully!');
    }
  } catch (error) {
    console.error('Failed to save solution:', error);
  }
};

// Add Save button in the UI
<button
  onClick={saveSolution}
  style={{
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }}
>
  💾 Save Progress
</button>
  const stages: Stage[] = [
    {
      id: 1,
      title: 'Stage 1: Format the Code',
      description: 'Format this JavaScript code properly with correct indentation.',
      type: 'format',
      code: 'function hello(){console.log("Hello");if(true){return "world";}}',
      solution: 'function hello() {\n  console.log("Hello");\n  if (true) {\n    return "world";\n  }\n}',
      hint: 'Add line breaks after { and before }, use 2 spaces for indentation'
    },
    {
      id: 2,
      title: 'Stage 2: Debug the Code',
      description: 'Find and fix the bug in this code. It should calculate the sum of an array.',
      type: 'debug',
      code: 'function sum(arr) {\n  let total = 0;\n  for (let i = 0; i <= arr.length; i++) {\n    total += arr[i];\n  }\n  return total;\n}',
      solution: 'function sum(arr) {\n  let total = 0;\n  for (let i = 0; i < arr.length; i++) {\n    total += arr[i];\n  }\n  return total;\n}',
      hint: 'Check the loop condition - should it be <= or <?'
    },
    {
      id: 3,
      title: 'Stage 3: Generate Numbers',
      description: 'Write code to generate all numbers from 0 to 1000.',
      type: 'generate',
      code: '// Write your code here',
      solution: 'for (let i = 0; i <= 1000; i++) {\n  console.log(i);\n}',
      hint: 'Use a for loop from 0 to 1000'
    },
    {
      id: 4,
      title: 'Stage 4: Transform Data',
      description: 'Convert this array of objects to CSV format.',
      type: 'transform',
      code: '// Input: [{name: "John", age: 30}, {name: "Jane", age: 25}]\n// Write code to output: name,age\\nJohn,30\\nJane,25',
      solution: 'const data = [{name: "John", age: 30}, {name: "Jane", age: 25}];\nconst headers = Object.keys(data[0]).join(",");\nconst rows = data.map(obj => Object.values(obj).join(",")).join("\\n");\nconsole.log(headers + "\\n" + rows);',
      hint: 'Extract headers with Object.keys(), values with Object.values(), and join with commas'
    }
  ];

  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setGameFailed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTimerRunning, timeRemaining]);

  useEffect(() => {
    if (stages[currentStage]) {
      setUserCode(stages[currentStage].code);
      setIsCorrect(false);
      setShowHint(false);
    }
  }, [currentStage]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    const minutes = parseInt(customTime) || 30;
    setTimeRemaining(minutes * 60);
    setIsTimerRunning(true);
    setIsTimerSet(true);
  };

  const checkSolution = () => {
    const current = stages[currentStage];
    const userClean = userCode.trim().replace(/\s+/g, ' ');
    const solutionClean = current.solution.trim().replace(/\s+/g, ' ');
    
    if (userClean === solutionClean || userCode.trim() === current.solution.trim()) {
      setIsCorrect(true);
      setTimeout(() => {
        if (currentStage < stages.length - 1) {
          setCurrentStage(currentStage + 1);
        } else {
          setGameComplete(true);
          setIsTimerRunning(false);
        }
      }, 1500);
    } else {
      alert('Not quite right. Try again or use a hint!');
    }
  };

  const resetGame = () => {
    setCurrentStage(0);
    setIsTimerSet(false);
    setIsTimerRunning(false);
    setGameComplete(false);
    setGameFailed(false);
    setIsCorrect(false);
  };

  if (!isTimerSet) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '3rem',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1e3c72' }}>
            🔐 Escape Room
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem' }}>
            Code your way out! Complete 4 coding challenges before time runs out.
          </p>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '2rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <label style={{
              display: 'block',
              fontSize: '1.1rem',
              marginBottom: '1rem',
              color: '#333',
              fontWeight: 'bold'
            }}>
              ⏱️ Set Timer (minutes):
            </label>
            <input
              type="number"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              min="1"
              max="120"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.5rem',
                border: '2px solid #ddd',
                borderRadius: '8px',
                textAlign: 'center',
                marginBottom: '1rem'
              }}
            />
            <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Recommended: 15-30 minutes
            </p>
          </div>

          <button
            onClick={startTimer}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '1rem 3rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
          >
            🚀 Start Challenge
          </button>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '3rem',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ fontSize: '2.5rem', color: '#11998e', marginBottom: '1rem' }}>
            Congratulations!
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
            {`You've successfully escaped the room with {formatTime(timeRemaining)} remaining!`}
          </p>
          <button
            onClick={resetGame}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            🔄 Play Again
          </button>
        </div>
      </div>
    );
  }

  if (gameFailed) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #c31432 0%, #240b36 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '3rem',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⏰</div>
          <h1 style={{ fontSize: '2.5rem', color: '#c31432', marginBottom: '1rem' }}>
           {`Time's Up!`}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
            {`You didn't escape in time. Better luck next time!`}
          </p>
          <button
            onClick={resetGame}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  const current = stages[currentStage];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      {/* Header with Timer */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <div>
          <h2 style={{ margin: 0, color: '#333' }}>
            Stage {currentStage + 1} of {stages.length}
          </h2>
          <div style={{
            marginTop: '0.5rem',
            backgroundColor: '#e9ecef',
            borderRadius: '8px',
            height: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              backgroundColor: '#28a745',
              width: `${((currentStage + 1) / stages.length) * 100}%`,
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>
        <div style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: timeRemaining < 300 ? '#dc3545' : '#28a745',
          fontFamily: 'monospace'
        }}>
          ⏱️ {formatTime(timeRemaining)}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>{current.title}</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
          {current.description}
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#333'
          }}>
            Your Code:
          </label>
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            style={{
              width: '100%',
              height: '300px',
              padding: '1rem',
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: '0.95rem',
              border: isCorrect ? '3px solid #28a745' : '2px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa',
              resize: 'vertical'
            }}
            spellCheck={false}
          />
        </div>

        {isCorrect && (
          <div style={{
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            color: '#155724'
          }}>
            ✅ Correct! Moving to next stage...
          </div>
        )}

        {showHint && (
          <div style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            color: '#856404'
          }}>
            💡 Hint: {current.hint}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={checkSolution}
            disabled={isCorrect}
            style={{
              backgroundColor: isCorrect ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '8px',
              cursor: isCorrect ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              flex: 1
            }}
          >
            {isCorrect ? '✓ Solved' : '🔍 Check Solution'}
          </button>
          
          <button
            onClick={() => setShowHint(!showHint)}
            style={{
              backgroundColor: '#ffc107',
              color: '#333',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {showHint ? '🙈 Hide Hint' : '💡 Show Hint'}
          </button>
        </div>
      </div>
    </div>
  );
}