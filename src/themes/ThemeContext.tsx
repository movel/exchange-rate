import React, { FunctionComponent } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { backgroundColor, textColor } from './theme';

interface IContextProps { 
  toggle: Function
};

const ThemeToggleContext = React.createContext<IContextProps>({toggle: () => {}});

export const useTheme = () => React.useContext(ThemeToggleContext);

type MyThemeProviderProps = {
  children: JSX.Element,
}

export const MyThemeProvider: FunctionComponent = (props) => {

  const [themeState, setThemeState] = React.useState({
    mode: 'light'
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
