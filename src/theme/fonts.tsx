import { Global } from '@emotion/react';

export const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'e-Ukraine';
        font-weight: 100;
        font-display: swap;
        src: url('/fonts/e-Ukraine-UltraLight.otf') format('otf');
      }
      @font-face {
        font-family: 'e-Ukraine';
        font-weight: 200;
        font-display: swap;
        src: url('/fonts/e-Ukraine-Light.otf') format('otf');
      }
      @font-face {
        font-family: 'e-Ukraine';
        font-weight: 300;
        font-display: swap;
        src: url('/fonts/e-Ukraine-Thin.otf') format('otf');
      }
      @font-face {
        font-family: 'e-Ukraine';
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/e-Ukraine-Regular.otf') format('otf');
      }
      @font-face {
        font-family: 'e-Ukraine';
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/e-Ukraine-Medium.otf') format('otf');
      }
      @font-face {
        font-family: 'e-Ukraine';
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/e-Ukraine-Bold.otf') format('otf');
      }
      `}
  />
);
