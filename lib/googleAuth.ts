import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_SITE_URL || http://localhost:3000}/api/auth/google/callback`
);

export const getAuthUrl = (): string => [object Object] const scopes = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly'
  ];
  return oauth2Client.generateAuthUrl([object Object]    access_type: 'offline',
    scope: scopes,
    prompt: 'consent
  });
};

export const getTokens = async (code: string) => [object Object]  const [object Object]tokens } = await oauth2Client.getToken(code);
  return tokens;
};

export const createYouTubeClient = (tokens: any) => {
  oauth2Client.setCredentials(tokens);
  return google.youtube({ version: v3auth: oauth2Client });
};