import { configure, addDecorator } from '@storybook/react';
import { Global, css } from '@emotion/core';
import emotionReset from 'emotion-reset';
import { ThemeProvider } from 'emotion-theming';
import theme from '../lib/theme';


// Function that returns all colors in the theme as CSS variables
// This is for cases where we might not want to make a Styled component to access a var
const generateColorVariables = () => {
  return Object.keys(theme.colors)
    .map(color => `--color-${color}: ${theme.colors[color]}`)
    .join(';');
};

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    <Global
      styles={css`
        ${emotionReset}
        :root {
          ${generateColorVariables()};
        }
        html,
        body {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          font-size: 16px;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: futura-pt, sans-serif;
          font-weight: 800;
          font-style: normal;
          color: var(--color-CEDAR);
        }
        h1 {
          font-size: 2em;
        }
        h2 {
          font-size: 1.5em;
        }
        h3 {
          font-size: 1.17em;
        }
        h4 {
          font-size: 1.12em;
        }
        h5 {
          font-size: 0.83em;
        }
        h6 {
          font-size: 0.75em;
        }
        label {
          font-size: 0.75em;
        }
      `}
    />
    {storyFn()}
  </ThemeProvider>
);

addDecorator(ThemeDecorator);

// automatically import all files ending in *.stories.js
const req = require.context('../components', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
