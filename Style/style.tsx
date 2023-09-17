const palette = {
    purple: '#5A31F4',
    green: '#0ECD9D',
    red: '#CD0E61',
    black: '#3d3c3fff',
    white: '#eeeeee',
    darkText: '#3d3c3fff',
    lightText: '#eeeeee',
    lightText2: '#2a6f29',
    darkcard: '#222124',
    lightcard: '#dedede'
  }
  
  export const theme = {
    colors: {
      background: palette.white,
      foreground: palette.black,
      textcolor: palette.darkText,
      textcolor1: palette.lightText2,
      cardcolor: palette.lightcard,
      primary: palette.purple,
      success: palette.green,
      danger: palette.red,
      failure: palette.red,
    },
    spacing: {
      s: 8,
      m: 16,
      l: 24,
      xl: 40,
    },
    textVariants: {
      header: {
        fontFamily: 'Raleway',
        fontSize: 36,
        fontWeight: 'bold',
      },
      body: {
        fontFamily: 'Merriweather',
        fontSize: 16,
      },
    }
  };
  
  export const darkTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      background: palette.black,
      textcolor: palette.lightText,
      textcolor1: palette.darkText,
      foreground: palette.white,
      cardcolor: palette.darkcard,
      
    }
  }