import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext(); // creates a context object that facilitates the sharing of data across the component tree without the need for prop drilling

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
        await setTrack(songsData[track.id - 1]);
        await audioRef.current.play();
        setPlayStatus(true);
    }
  }

  const next = async () => {
    if (track.id < songsData.length - 1) {
        await setTrack(songsData[track.id + 1]);
        await audioRef.current.play();
        setPlayStatus(true);
    }
  }

  const seekSong = async (e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
  }

  const contextValue = { // these elements are accessible in other files through useContext(PlayerContext)
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    next, previous,
    seekSong,
  };

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
        setTime({
        currentTime: {
          second: Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0'),
          minute: Math.floor(audioRef.current.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audioRef.current.duration % 60).toString().padStart(2, '0'),
          minute: Math.floor(audioRef.current.duration / 60),
        },
      });
      }
    }, 1000);
  }, [audioRef]);

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
