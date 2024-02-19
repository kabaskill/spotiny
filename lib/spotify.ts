import { getSpotifyAccessToken } from "./spotifyAuth";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export const searchSpotify = async (
  query: string,
  types: string[] = ["album", "artist", "playlist", "track", "show", "episode"]
): Promise<any> => {
  try {
    const accessToken = await getSpotifyAccessToken();

    const typeParam = types.join(",");

    const response = await fetch(
      `${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(query)}&type=${typeParam}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Spotify API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching on Spotify:", error);
    throw error;
  }
};
