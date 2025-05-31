import { useState } from 'react';

interface UseVoiceInputOptions {
  onResult?: (text: string) => void;
}

export default function useVoiceInput({ onResult }: UseVoiceInputOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const startListening = () => {
    setIsListening(true);
    setError(null);
    
    // Mock voice recognition - in a real app, this would use the Web Speech API
    setTimeout(() => {
      const mockTranscript = "Sample product name, quantity 10, price 25 GHS";
      setTranscript(mockTranscript);
      if (onResult) onResult(mockTranscript);
      setIsListening(false);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
  };
}