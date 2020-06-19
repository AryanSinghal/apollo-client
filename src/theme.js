import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'monospace',
      'cursive',
      '"Comic Sans MS"',
      'sans-serif',
    ].join(','),
  },
});
