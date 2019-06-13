import theme from 'styled-theming';

export const backgroundColor = theme('mode', {
  light: '#222',
  dark: '#fafafa'
});

export const textColor = theme('mode', {
  light: '#fff',
  dark: '#000'
});

export const buttonBackgroundColor = theme('mode', {
  light: '#222',
  dark: '#eee'
});

export const buttonTextColor = theme('mode', {
  light: '#eee',
  dark: '#222'
});
