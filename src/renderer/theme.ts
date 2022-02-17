import { extendTheme, theme as defaultTheme } from '@chakra-ui/react';

export default extendTheme({
  colors: {
    green: {
      ...defaultTheme.colors.green,
      100: '#4CAF5033',
      500: '#38A169',
      800: '#4CAF50',
    },
    red: {
      ...defaultTheme.colors.red,
      100: '#F85C5B33',
      500: '#F85C5B',
      800: '#F85C5B',
    },
    blue: {
      ...defaultTheme.colors.blue,
      500: '#2196F3',
    },
    gray: {
      ...defaultTheme.colors.gray,
      200: '#ECEFF1',
    },
    orange: {
      ...defaultTheme.colors.orange,
      500: '#F59500',
    },
    primary: {
      100: '#3734ee',
      200: '#5334c2',
    },
    batch: {
      100: '#FEF4D5',
      800: '#FD9701',
    },
    unsync: {
      100: '#ECEFF1',
      800: '#AFB2B7',
    },
    serial: {
      100: '#D3EAFD',
      800: '#2196F3',
    },
    information: {
      100: '#EAF5FF',
      800: '#163A50',
    },
    jubelio: {
      primary: '#DE1A56',
      'primary-disabled': '#AFB2B7',
      dark: '#1E1F2D',
      black: '#163A50',
      blue: '#2196F3',
      'soft-dark': '#163A50',
      purple: '#B941B8',
      darkGreen: '#58A82E',
      grey: '#D7D7D7',
      grey100: '#F6F7F8',
      grey200: '#8999A5',
      grey300: '#A1AEB7',
      'blue-gray': '#F1F9FF',
      red100: 'rgba(222, 26, 86, 0.04)',
      red500: '#F32A67',
      cream: '#FEFBEC',
      outstock: 'rgba(0, 0, 0, 0.1)',
    },
    system: {
      green: '#38A169',
      blue: '#2196F3',
      orange: '#F59500',
      red: '#2196F3',
      smoke: '#F6F7F8',
      outline: '#D7D8DA',
      'dark-gray': '#D7D8DA',
      icon: '#8999A5',
    },
    accent: {
      100: '#FAFAFA',
      200: '#EAEAEA',
      300: '#999',
      400: '#888',
      500: '#666',
      600: '#444',
      700: '#333',
      800: '#111',
    },
  },
  shadows: {
    base: '0px 1px 4px rgba(0, 0, 0, 0.08);',
    top: '0px -5px 5px -1px rgba(176,176,176,0.24)',
    md: '0 5px 10px rgba(17, 17, 17, 0.075)',
    right: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    'lg-custom': '0px -6px 12px rgba(26, 29, 58, 0.04);',
    'shadow-item':
      '0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);',
    'main-card': '0px 1px 4px rgba(0, 0, 0, 0.08);',
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'jubelio.primary',
          color: 'white',
          px: '2.5rem',
          fontSize: '14px',
          _hover: {
            boxShadow: 'sm',
            bg: 'jubelio.red500',
            _disabled: {
              bg: 'jubelio.primary-disabled',
            },
          },
          _disabled: {
            bg: 'jubelio.primary-disabled',
          },
        },
        unselect: {
          bg: 'jubelio.primary-disabled',
          color: 'white',
        },
        outline: {
          border: '1px solid #D7D8DA',
          _hover: {
            bg: '#F8F8F8',
          },
        },
        payments: {
          border: '1px solid #D7D8DA',
          rounded: '8px',
          bg: 'system.smoke',
          color: 'jubelio.black',
          fontSize: '14px',
          _focus: {
            boxShadow: 'none',
          },
          _hover: {
            bg: '#F8F8F8',
            boxShadow: 'base',
          },
        },
        link: {
          _hover: {
            textDecoration: 'none',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 500,
        letterSpacing: 'tighter',
      },
    },
    Menu: {
      baseStyle: {
        boxShadow: 'md',
      },
    },
    Link: {
      variants: {
        link: {
          color: 'pink.400',
        },
      },
    },
  },

  fonts: {
    body: `'Nunito Sans',${defaultTheme.fonts.body}`,
    heading: `'Manrope',${defaultTheme.fonts.heading}`,
  },

  styles: {
    global: {
      '@media screen and (max-width: 1366px)': {
        html: {
          '-moz-transform': 'scale(1, 0.75)',
          zoom: '100%',
        },
      },
      '::-webkit-scrollbar': {
        width: '16px',
        height: '16px',
      },
      '::-webkit-scrollbar-corner': {
        backgroundColor: 'transparent',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#D7D8DA',
        minHeight: '40px',
      },
      '::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track': {
        border: '5px solid transparent',
        backgroundClip: 'padding-box',
        borderRadius: '8px',
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: '#F6F7F8',
      },
      html: {
        scrollBehavior: 'smooth',
      },
      'input:focus': {
        outline: 'none !important',
        border: '1px solid #DE1A56 !important',
        boxShadow: 'none !important',
      },
      'button:focus': {
        outline: 'none !important',
        boxShadow: 'none !important',
      },
      body: {
        cursor: 'default',
        fontFamily: 'body',
        lineHeight: 'base',
        background: 'jubelio.blue-gray',
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        textRendering: 'optimizeLegibility',
      },
      '*::placeholder': {
        color: 'gray.300',
      },
      '*, *::before, &::after': {
        wordWrap: 'break-word',
      },

      '#nprogress': {
        pointerEvents: 'none',
      },
      '#nprogress .bar': {
        bgGradient: 'linear(to-r, whiteAlpha.400, yellow.200)',
        h: '2px',
        left: 0,
        pos: 'fixed',
        top: 0,
        w: 'full',
        zIndex: 2000,
      },
      '.nprogress-custom-parent': {
        overflow: 'hidden',
        position: 'absolute',
      },
      '.background-left': {
        position: 'fixed',
        bottom: '0px',
        left: 0,
        zIndex: -10,
      },
      '.background-right': {
        position: 'fixed',
        bottom: '0px',
        left: '2.5rem',
        zIndex: -10,
      },
      '.start-item:not(:hover) .start-icon .color-onstroke': {
        stroke: '#8999a5 !important',
      },
      '.pages-link': {
        margin: '0.3rem',
        color: 'gray.800',
      },
      '.pages-number': {
        color: 'gray.700',
        fontWeight: 'bold',
        fontSzie: '13px',
      },
      '.page-items': {
        height: '36px',
        width: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '.pages-active-number': {
        color: 'jubelio.primary',
        fontWeight: 'bold',
        fontSzie: '14px',
      },
      '.pagination': {
        margin: 0,
        display: 'flex',
        padding: 0,
        flexWrap: 'wrap',
        listStyle: 'none',
        alignItems: 'center',
      },
    },
  },
});
