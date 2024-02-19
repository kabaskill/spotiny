const SPOTIFY_API_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

export const getSpotifyAccessToken = async (): Promise<string> => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const body = new URLSearchParams();
  body.append('grant_type', 'client_credentials');
  body.append('client_id', clientId!);
  body.append('client_secret', clientSecret!);

  const response = await fetch(SPOTIFY_API_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Spotify access token');
  }

  const data = await response.json();
  return data.access_token;
};
