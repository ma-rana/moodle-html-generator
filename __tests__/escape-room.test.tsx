import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EscapeRoom from '@/app/escape-room/page';

describe('Escape Room Tests', () => {
  test('Timer starts with custom time', () => {
    render(<EscapeRoom />);
    
    const input = screen.getByLabelText(/Set Timer/i);
    fireEvent.change(input, { target: { value: '15' } });
    
    const startButton = screen.getByText(/Start Challenge/i);
    fireEvent.click(startButton);
    
    expect(screen.getByText(/15:00/)).toBeInTheDocument();
  });

  test('Code formatting stage accepts correct solution', async () => {
    render(<EscapeRoom />);
    
    // Start game
    const startButton = screen.getByText(/Start Challenge/i);
    fireEvent.click(startButton);
    
    // Enter correct formatted code
    const textarea = screen.getByLabelText(/Your Code/i);
    const correctCode = 'function hello() {\n  console.log("Hello");\n  if (true) {\n    return "world";\n  }\n}';
    fireEvent.change(textarea, { target: { value: correctCode } });
    
    const checkButton = screen.getByText(/Check Solution/i);
    fireEvent.click(checkButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    });
  });

  test('Hint system displays correct hints', () => {
    render(<EscapeRoom />);
    
    const startButton = screen.getByText(/Start Challenge/i);
    fireEvent.click(startButton);
    
    const hintButton = screen.getByText(/Show Hint/i);
    fireEvent.click(hintButton);
    
    expect(screen.getByText(/Add line breaks/i)).toBeInTheDocument();
  });

  test('Game completes after all stages', async () => {
    // This would require completing all 4 stages
    // Implementation depends on your exact component structure
  });
});