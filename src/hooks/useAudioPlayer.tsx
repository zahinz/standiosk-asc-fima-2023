import { useState, useEffect, useRef } from "react";

interface AudioPlayer {
  url: string;
  isPlaying: boolean;
  progress: number;
  togglePlayPause: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

interface AudioPlayerOptions {
  enabled: boolean;
  initialUrl: string;
}

interface AudioPlayerState extends AudioPlayer {
  reset: () => void;
}

const useAudioPlayer = ({
  enabled,
  initialUrl,
}: AudioPlayerOptions): AudioPlayerState => {
  const [url] = useState<string>(initialUrl);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = (): void => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  };

  const reset = (): void => {
    setIsPlaying(false);
    setProgress(0);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  useEffect(() => {
    // Update the play state
    const onPlay = (): void => setIsPlaying(true);
    const onPause = (): void => setIsPlaying(false);

    // Update the progress
    const onTimeUpdate = (): void => {
      const audioElement = audioRef.current;
      if (audioElement) {
        const currentTime = audioElement.currentTime;
        const duration = audioElement.duration;
        setProgress((currentTime / duration) * 100);
      }
    };

    if (enabled && audioRef.current) {
      audioRef.current.addEventListener("play", onPlay);
      audioRef.current.addEventListener("pause", onPause);
      audioRef.current.addEventListener("timeupdate", onTimeUpdate);
    }

    // Clean up listeners
    return (): void => {
      const audio = audioRef.current;
      if (enabled && audio) {
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
        audio.removeEventListener("timeupdate", onTimeUpdate);
      }
    };
  }, [enabled]);

  return { url, isPlaying, progress, togglePlayPause, audioRef, reset };
};

export default useAudioPlayer;
