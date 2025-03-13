import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
      error: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
      error?: string;
    };
  }
}
