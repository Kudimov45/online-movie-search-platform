import { type FC, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import type { RootState } from '../../store/store';
import { closeVideoPlayerModal } from '../../store/createVideoPlayerSlice';
import './index.css';
import Pause from '../../assets/svg/pause-icon.svg?react';
import Play from '../../assets/svg/play-icon.svg?react';

export const VideoPlayerModal: FC = () => {
  const dispatch = useDispatch();
  const { isOpen, videoUrl, title } = useSelector((state: RootState) => state.videoPlayer);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOrientationChange = () => {
      if (isOpen) {
        if (window.innerWidth > window.innerHeight) {
          if (containerRef.current && !document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(() => {});
          }
        } else {

          if (document.fullscreenElement === containerRef.current) {
            document.exitFullscreen().catch(() => {});
          }
        }
      }
    };

    window.addEventListener('resize', handleOrientationChange);
    return () => window.removeEventListener('resize', handleOrientationChange);
  }, [isOpen]);


  const getVideoId = (url: string | null) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  if (!isOpen || !videoUrl) {
    return null;
  }

  const videoId = getVideoId(videoUrl);

  const handleClose = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setIsPlaying(true); 
    dispatch(closeVideoPlayerModal());
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      controls: 0, 
      showinfo: 0,
      iv_load_policy: 3,
      origin: window.location.origin,
    },
  };

  return (
    <div className="video-modal__overlay" onClick={handleClose}>
      <div className="video-modal__content" onClick={(e) => e.stopPropagation()} ref={containerRef}>
        <button className="video-modal__close-btn" onClick={handleClose}>&times;</button>
        <div className="video-player">
          {videoId ? (
            <>
              <YouTube 
                videoId={videoId} 
                opts={opts} 
                className="video-modal__iframe"
                onReady={(e) => {
                  playerRef.current = e.target;
                  setIsPlaying(true);
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnd={() => setIsPlaying(false)}
              />
              <button className="video-player__play-button" onClick={togglePlay}>
                {isPlaying ? <Pause /> : <Play />}
              </button>
            </>
          ) : (
            <p style={{ color: 'white', textAlign: 'center' }}>Видео не найдено</p>
          )}
        </div>
        {title && <p className="video-modal__title">{title}</p>}
      </div>
    </div>
  );
};