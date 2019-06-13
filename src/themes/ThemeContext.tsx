import React, { FunctionComponent } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { backgroundColor, textColor } from './theme';

type ContextProps = { 
  toggle: Function
};

const ThemeToggleContext = React.createContext<ContextProps>({toggle: () => {}});

export const useTheme = () => React.useContext(ThemeToggleContext);

export const MyThemeProvider: FunctionComponent = (props) => {

  const [themeState, setThemeState] = React.useState({
    mode: 'dark'
  });

  const Wrapper = styled.div`
    background-color: ${backgroundColor};
    color: ${textColor};
  `;

  const toggle = () => {
    const mode = (themeState.mode === 'light' ? `dark` : `light`);
    setThemeState({ mode: mode });
  };

  return (
    <ThemeToggleContext.Provider value={{ toggle: toggle }}>
      <ThemeProvider
        theme={{
          mode: themeState.mode
        }}
      >
        <Wrapper>
          {props.children}
        </Wrapper>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProvider;
