import { useState, useEffect, useCallback } from 'react';

export const useAudio = () => {
  const [audio] = useState(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'));
  const [playing, setPlaying] = useState(false);

  const toggleAudio = useCallback(() => setPlaying(!playing), [playing, setPlaying]);

  useEffect(() => {
    if (playing) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return {playing, toggleAudio};
};