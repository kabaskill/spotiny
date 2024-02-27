import Image from "next/image";
import { useState, useEffect } from "react";
import { formatMsToMin } from "@/lib/formatMsToMin";

interface UserData {
  songs: SpotifyApi.TrackObjectFull[];
  currentSong?: SpotifyApi.TrackObjectFull | undefined;
  songCurrentTime?: number;
}

export default function MusicPlayer({ data }: any) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newAudio = new Audio();
      setAudio(newAudio);

      return () => {
        newAudio.pause();
      };
    }
  }, []);

  const [playlist, setPlaylist] = useState<SpotifyApi.TrackObjectFull[]>([
    {
      album: {
        album_type: "album",
        artists: [
          {
            external_urls: {
              spotify: "https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d",
            },
            href: "https://api.spotify.com/v1/artists/1dfeR4HaWDbWqFHLkxsg1d",
            id: "1dfeR4HaWDbWqFHLkxsg1d",
            name: "TEST",
            type: "artist",
            uri: "spotify:artist:1dfeR4HaWDbWqFHLkxsg1d",
          },
        ],
        available_markets: ["CA", "US"],
        external_urls: {
          spotify: "https://open.spotify.com/album/6wPXUmYJ9mOWrKlLzZ5cCa",
        },
        href: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
        id: "TEST1111",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab67616d0000b27307744e2ed983efa3e6620a47",
            width: 640,
          },
          {
            height: 300,
            url: "https://i.scdn.co/image/ab67616d00001e0207744e2ed983efa3e6620a47",
            width: 300,
          },
          {
            height: 64,
            url: "https://i.scdn.co/image/ab67616d0000485107744e2ed983efa3e6620a47",
            width: 64,
          },
        ],
        name: "The Game (Deluxe Remastered Version)",
        release_date: "1980-06-27",
        release_date_precision: "day",
        total_tracks: 15,
        type: "album",
        uri: "spotify:album:6wPXUmYJ9mOWrKlLzZ5cCa",
      },
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d",
          },
          href: "https://api.spotify.com/v1/artists/1dfeR4HaWDbWqFHLkxsg1d",
          id: "1dfeR4HaWDbWqFHLkxsg1d",
          name: "TEST",
          type: "artist",
          uri: "spotify:artist:1dfeR4HaWDbWqFHLkxsg1d",
        },
      ],
      available_markets: ["CA", "US"],
      disc_number: 1,
      duration_ms: 214653,
      explicit: false,
      external_ids: {
        isrc: "GBUM71029605",
      },
      external_urls: {
        spotify: "https://open.spotify.com/track/57JVGBtBLCfHw2muk5416J",
      },
      href: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
      id: "TESTTTTTT11111",
      is_local: false,
      name: "TEST",
      popularity: 77,
      preview_url: null,
      track_number: 3,
      type: "track",
      uri: "spotify:track:57JVGBtBLCfHw2muk5416J",
    },
    ...data,
  ]);

  const [userData, setUserData] = useState<UserData>({
    songs: [...playlist],
  });

  const playHandler = (id: string) => {
    const song: SpotifyApi.TrackObjectFull | void = userData.songs.find((s) => s.id === id);

    if (!song || !audio) {
      return;
    }

    // Pause and reset audio before setting the new source
    audio.pause();
    audio.currentTime = 0;
    audio.src = song.href;
    audio.load();

    // Set audio title
    audio.title = song.name;

    // If the current song is different, or if there is no current song, set the current song
    if (!userData.currentSong || userData.currentSong.id !== song.id) {
      setUserData({ ...userData, currentSong: song });
    }

    // Play the audio if it's paused
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          console.log("Audio playback started successfully");
        })
        .catch((error) => {
          console.error("Error starting audio playback:", error);
        });
    }
  };

  const pauseHandler = () => {
    audio?.pause;
  };

  const prevSongHandler = () => {};

  const nextSongHandler = () => {};

  const deleteSong = (str: string) => {};

  return (
    <div className=" flex flex-col justify-start items-center gap-1">
      <div className="w-full bg-background h-[250px] p-2 flex flex-col items-center gap-2 ">      {/*  max-w-[450px]*/}
        {/* Player Bar */}
        <div className="flex justify-center items-center p-1 w-full h-6 bg-foreground">
          <div className=" flex flex-wrap px-2 gap-y-1">
            <div className="h-[2px] w-full min-w-[75px] bg-highlight"></div>
            <div className="h-[2px] w-full min-w-[75px] bg-highlight"></div>
          </div>
          <h2 className="text-secondary mx-10">SpoLittle</h2>
          <div className=" flex flex-wrap px-2 gap-y-1">
            <div className="h-[2px] w-full min-w-[75px] bg-highlight"></div>
            <div className="h-[2px] w-full min-w-[75px] bg-highlight"></div>
          </div>
        </div>

        {/* Player Content */}
        <div className="flex bg-foreground w-full h-[200px] gap-x-4 items-center justify-center ">  {/*  w-[430px]*/}
          <div className="bg-secondary border-2 border-background">
            <Image
              className="block w-[150px]"
              src={
                userData.currentSong?.album.images[0].url ||
                "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/quincy-larson-album-art.jpg"
              }
              alt="song cover art"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col gap-y-5 p-4 bg-background w-[226px] h-[153px]">
            <div className="h-[80px]">
              <p className="m-0 text-lg ">{userData.currentSong?.name}</p>
              <p className="m-0 text-xs text-highlight">{userData.currentSong?.artists[0].name}</p>
            </div>
            <div className="flex justify-around">
              <button
                id="previous"
                className="previous bg-transparent border-none bg-primary cursor-pointer text-base outline-highlight text-center focus:outline-dashed focus:outline-2"
                aria-label="Previous"
                onClick={prevSongHandler}
              >
                <svg
                  className="fill-primary"
                  width="24"
                  height="19"
                  viewBox="0 0 24 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.2248 0L7.03964 9.5L23.2248 19L23.2248 0Z" />
                  <rect width="4.63633" height="18.5453" transform="matrix(-1 0 0 1 4.63633 0)" />
                </svg>
              </button>
              <button
                id="play"
                className="play bg-transparent border-none bg-primary cursor-pointer text-base outline-highlight text-center focus:outline-dashed focus:outline-2"
                aria-label="Play"
                onClick={() => playHandler(userData.currentSong?.id || "")}
              >
                <svg
                  className="fill-primary"
                  width="17"
                  height="19"
                  viewBox="0 0 17 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0L16.1852 9.5L1.88952e-07 19L0 0Z" />
                </svg>
              </button>
              <button
                id="pause"
                className="pause"
                aria-label="Pause"
                onClick={() => pauseHandler()}
              >
                <svg
                  className="fill-primary"
                  width="17"
                  height="19"
                  viewBox="0 0 17 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 6.54013e-07H4.75V19H0V6.54013e-07Z" />
                  <path d="M11.4 0H16.15V19H11.4V0Z" />
                </svg>
              </button>
              <button
                id="next"
                className="next bg-transparent border-none bg-primary cursor-pointer text-base outline-highlight text-center focus:outline-dashed focus:outline-2"
                aria-label="Next"
                onClick={nextSongHandler}
              >
                <svg
                  className="fill-primary"
                  width="24"
                  height="19"
                  viewBox="0 0 24 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0L16.1852 9.5L1.88952e-07 19L0 0Z" />
                  <rect x="18.5885" width="4.63633" height="18.5453" />
                </svg>
              </button>
              <button
                id="shuffle"
                className="shuffle bg-transparent border-none bg-primary cursor-pointer text-base outline-highlight text-center focus:outline-dashed focus:outline-2"
                aria-label="Shuffle"
              >
                <svg
                  className="fill-primary"
                  width="17"
                  height="14"
                  viewBox="0 0 17 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.2127 0L17 2.9219L12.0759 5.60686L12.1321 3.30594C11.9081 3.30997 11.7043 3.3165 11.528 3.326C11.3777 3.3341 11.2523 3.34411 11.1542 3.35578C11.1053 3.3616 11.0661 3.36749 11.036 3.37309C11.0211 3.37587 11.0095 3.37835 11.001 3.38041C10.9967 3.38143 10.9936 3.38227 10.9913 3.38289C10.989 3.38352 10.988 3.38385 10.9881 3.38382C10.9266 3.40381 10.7572 3.5014 10.4637 3.73265C10.1895 3.94866 9.85452 4.24234 9.47614 4.59282C8.81462 5.20556 8.03912 5.97461 7.25609 6.76752C8.03912 7.56043 8.81462 8.32948 9.47614 8.94223C9.85452 9.29271 10.1895 9.58639 10.4637 9.80239C10.7572 10.0336 10.9266 10.1312 10.9881 10.1512C10.988 10.1512 10.989 10.1515 10.9913 10.1522C10.9936 10.1528 10.9967 10.1536 11.001 10.1546C11.0095 10.1567 11.0211 10.1592 11.036 10.162C11.0661 10.1676 11.1053 10.1734 11.1542 10.1793C11.2523 10.1909 11.3777 10.2009 11.528 10.209C11.7043 10.2185 11.9081 10.2251 12.1321 10.2291L12.0759 7.92819L17 10.6131L12.2127 13.535L12.1558 11.2011C11.9071 11.197 11.677 11.1899 11.4757 11.1791C11.175 11.1629 10.8757 11.1361 10.6878 11.0751C10.4405 10.9947 10.1465 10.7892 9.86244 10.5654C9.55904 10.3263 9.20251 10.0129 8.81601 9.6549C8.14192 9.03051 7.35822 8.2533 6.57518 7.46052C6.2731 7.76927 5.9736 8.07675 5.68453 8.37353C5.24051 8.8294 4.82109 9.26001 4.45467 9.63114C4.10458 9.98574 3.79502 10.2941 3.54834 10.5285C3.42516 10.6455 3.31437 10.7473 3.22005 10.8285C3.13287 10.9035 3.03686 10.9812 2.94938 11.0324C2.46156 11.3178 1.79381 11.3751 1.32395 11.3812C1.07514 11.3845 0.852462 11.3732 0.692065 11.3611C0.611577 11.3551 0.546037 11.3488 0.499864 11.344C0.476761 11.3415 0.458455 11.3394 0.445496 11.3379L0.43012 11.336L0.425557 11.3355L0.423542 11.3352C0.423448 11.3352 0.423143 11.3352 0.485767 10.8535L0.423542 11.3352C0.157529 11.3006 -0.0304782 11.0569 0.00410824 10.7909C0.0386807 10.525 0.282182 10.3374 0.548069 10.3718C0.548087 10.3718 0.548051 10.3718 0.548069 10.3718L0.549944 10.372L0.559616 10.3732C0.568682 10.3743 0.582871 10.3759 0.60165 10.3779C0.639243 10.3818 0.695017 10.3872 0.764728 10.3924C0.90473 10.4029 1.09799 10.4127 1.31133 10.4099C1.76571 10.404 2.20705 10.3412 2.4587 10.194C2.45847 10.1941 2.4583 10.1942 2.4587 10.194C2.46075 10.1926 2.47161 10.1855 2.49271 10.1693C2.51674 10.1508 2.54777 10.1254 2.58634 10.0922C2.66358 10.0258 2.7615 9.93612 2.87917 9.82431C3.11419 9.60097 3.41488 9.30164 3.76339 8.94864C4.1317 8.57559 4.54478 8.15147 4.98424 7.70025C5.27761 7.39904 5.58273 7.08575 5.89415 6.76752C5.58272 6.44928 5.27759 6.13598 4.98421 5.83476C4.54476 5.38355 4.1317 4.95944 3.76339 4.5864C3.41488 4.2334 3.11419 3.93407 2.87917 3.71074C2.7615 3.59892 2.66358 3.50929 2.58634 3.44281C2.54777 3.40961 2.51674 3.38425 2.49271 3.36577C2.4716 3.34954 2.46099 3.34258 2.45894 3.34123C2.45868 3.34108 2.45853 3.34096 2.45894 3.34123C2.2073 3.19405 1.76572 3.13106 1.31133 3.12515C1.09799 3.12238 0.90473 3.13211 0.764728 3.14261C0.695017 3.14784 0.639243 3.15321 0.60165 3.15717C0.582871 3.15915 0.568682 3.16077 0.559616 3.16184L0.549944 3.16301L0.548391 3.1632C0.282436 3.1977 0.0386882 3.01013 0.00410824 2.74417C-0.0304782 2.47816 0.15713 2.23447 0.423143 2.19989L0.485767 2.68154C0.423143 2.19989 0.423048 2.1999 0.423143 2.19989L0.425557 2.19958L0.43012 2.199L0.445496 2.19714C0.458455 2.19561 0.476761 2.19352 0.499864 2.19109C0.546037 2.18622 0.611577 2.17995 0.692065 2.17391C0.852462 2.16188 1.07514 2.15058 1.32395 2.15381C1.79381 2.15992 2.46156 2.21726 2.94938 2.50267C3.03686 2.55385 3.13287 2.63152 3.22005 2.70655C3.31437 2.78773 3.42516 2.8895 3.54834 3.00655C3.79502 3.24097 4.10458 3.54931 4.45467 3.9039C4.82109 4.27504 5.24052 4.70565 5.68455 5.16153C5.97361 5.4583 6.2731 5.76578 6.57518 6.07452C7.35822 5.28174 8.14192 4.50454 8.81601 3.88014C9.20251 3.52214 9.55904 3.20872 9.86244 2.96964C10.1465 2.74581 10.4405 2.54035 10.6878 2.45997C10.8757 2.39892 11.175 2.37219 11.4757 2.35598C11.677 2.34514 11.9071 2.33807 12.1558 2.33396L12.2127 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className=" bg-background p-2 flex flex-col items-center gap-2 ">
        <div className="flex justify-between items-center py-2 w-full h-[30px] bg-foreground">
          <div className=" flex flex-wrap px-2 gap-1">
            <div className="h-[2px] w-full min-w-[75px] bg-highlight"></div>
            <div className="h-[2px] w-full min-w-[75px] bg-highlight"></div>
          </div>
          <h2 className="text-secondary mx-10" id="playlist">
            Playlist
          </h2>
          <div className=" flex flex-wrap px-2 gap-y-1">
            <div className="h-[2px] w-full min-w-[75px] bg-highlight"></div>
            <div className="h-[2px] w-full min-w-[75px] bg-highlight"></div>
          </div>
        </div>
        <ul className=" h-full bg-foreground flex flex-col gap-y-2 p-2 visible justify-start list-none">
          {playlist.map((song) => (
            <li
              key={song.id}
              className=" outline-highlight flex h-[40px] justify-between items-center p-1"
            >
              <button
                className="h-full flex flex-row items-center justify-around gap-x-2 focus:bg-slate-700"
                onClick={() => playHandler(song.id || "")}
              >
                <span className="w-[240px] text-left text-sm/4">{song.name}</span>
                <span className="w-[80px] m-0 text-xs/4 text-highlight">
                  {song.artists[0].name}
                </span>
                <span className=" text-xs m-auto w-[30px]">{formatMsToMin(song.duration_ms)}</span>
              </button>
              <button
                onClick={() => deleteSong(song.id || "")}
                className="playlist-song-delete"
                aria-label="Delete ${song.title}"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="8" cy="8" r="8" fill="#4d4d62" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z"
                    fill="white"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
