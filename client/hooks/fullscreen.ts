import { useCallback, useState } from 'react';

export const useFullscreen = () => {
  if (typeof window === 'undefined') return () => {};
  const [isFullscreen, setFullscreen] = useState(false);
  const element: any = document.documentElement;

  const activateFullscreen = useCallback(() => {
    if (element.requestFullscreen) {
      element.requestFullscreen(); // W3C spec
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Safari
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }
  }, [element]);

  const deactivateFullscreen = useCallback(() => {
    const doc: any = document;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    }
  }, []);

  const handleFSChange = useCallback(() => {
    if (document.fullscreenElement) {
      setFullscreen(true);
    } else {
      setFullscreen(false);
    }
  }, [setFullscreen]);

  document.addEventListener('fullscreenchange', handleFSChange);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      deactivateFullscreen();
    } else {
      activateFullscreen();
    }
  }, [isFullscreen, activateFullscreen, deactivateFullscreen]);

  return toggleFullscreen;
};
