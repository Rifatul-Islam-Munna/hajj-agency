// components/QuranAudioPlayer.tsx

"use client";

import { useEffect, useRef, useState } from "react";

export default function QuranAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio Playlist
  const playlist = [
    {
      title: "Surah - Al - Fatiha (001)",
      src: "https://server8.mp3quran.net/download/afs/001.mp3",
    },
    {
      title: "Surah - Al - Baqarah (002)",
      src: "https://server8.mp3quran.net/download/afs/002.mp3",
    },
    {
      title: "Surah - Aal - Imran (003)",
      src: "https://server8.mp3quran.net/download/afs/003.mp3",
    },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);

  const [currentTime, setCurrentTime] =
    useState("00:00");

  const [duration, setDuration] =
    useState("00:00");

  // Format Time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  // Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Next Track
  const nextTrack = () => {
    const next =
      currentTrack === playlist.length - 1
        ? 0
        : currentTrack + 1;

    setCurrentTrack(next);
  };

  // Prev Track
  const prevTrack = () => {
    const prev =
      currentTrack === 0
        ? playlist.length - 1
        : currentTrack - 1;

    setCurrentTrack(prev);
  };

  // Auto Play When Track Changes
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrack]);

  // Update Progress
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      const current = audio.currentTime;

      const total = audio.duration || 0;

      setCurrentTime(formatTime(current));

      setDuration(formatTime(total));

      setProgress((current / total) * 100);
    };

    // Auto Next Track
    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener(
      "timeupdate",
      updateProgress
    );

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener(
        "timeupdate",
        updateProgress
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, [currentTrack]);

  // Seek Audio
  const handleSeek = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!audioRef.current) return;

    const width = e.currentTarget.clientWidth;

    const clickX = e.nativeEvent.offsetX;

    const duration = audioRef.current.duration;

    audioRef.current.currentTime =
      (clickX / width) * duration;
  };

  return (
    <>
      <div className="player">

        <h2>Listen To Quran Audio</h2>

        <div className="bismillah">
          <img
            src="/assets/img/bismillah.svg"
            alt=""
          />
        </div>

        {/* Current Surah */}
        <p className="surah">
          {playlist[currentTrack].title}
        </p>

        {/* Audio */}
        <audio
          ref={audioRef}
          src={playlist[currentTrack].src}
        ></audio>

        {/* Time Row */}
        <div className="time-row">

          <span>{currentTime}</span>

          <div
            className="progress-container"
            onClick={handleSeek}
          >
            <div
              className="progress"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>

          <span>{duration}</span>

        </div>

        {/* Controls */}
        <div className="controls">

          {/* Prev */}
          <button onClick={prevTrack}>
            <i className="fa-solid fa-angle-left"></i>
          </button>

          {/* Play */}
          <button
            className="play"
            onClick={togglePlay}
          >
            <i
              className={`fa-solid ${
                isPlaying
                  ? "fa-pause"
                  : "fa-play"
              }`}
            ></i>
          </button>

          {/* Next */}
          <button onClick={nextTrack}>
            <i className="fa-solid fa-angle-right"></i>
          </button>

        </div>

      </div>
    </>
  );
}