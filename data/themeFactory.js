import { createMuiTheme } from '@material-ui/core'

class ThemeFactory {
    constructor () {
        this.createdTheme = null
        this.backgroundImageURL = null
        this.createTheme = this.createTheme.bind(this)
        this.getCreatedTheme = this.getCreatedTheme.bind(this)
        this.getBackgroundImageURL = this.getBackgroundImageURL.bind(this)
        this.getDefaultTheme = this.getDefaultTheme.bind(this)
    }

    createTheme (importedTheme) {
        const {
            primary,
            primaryLight,
            primaryDark,
            onPrimary,
            secondary,
            secondaryLight,
            secondaryDark,
            onSecondary,
            background,
            error,
            onError,
            success,
            onSuccess,
            formNoValidate,
            formValidate,
            backgroundImageURL
        } = importedTheme

        const palette = {
            primary: {
                main: primary,
                light: primaryLight,
                dark: primaryDark,
                contrastText: onPrimary
            },
            secondary: {
                main: secondary,
                light: secondaryLight,
                dark: secondaryDark,
                contrastText: onSecondary
            },
            background: {
                default: primary,
                paper: background
            },
            error: {
                main: error,
                contrastText: onError
            },
            success: {
                main: success,
                contrastText: onSuccess
            },
            action: {
                disabledBackground: 'gray',
                disabled: 'white'
            },
            onSecondary: onSecondary,
            formNoValidate: formNoValidate,
            formValidate: formValidate
        }

        const props = {
            MuiTypography: {
                variantMapping: {
                    h1: 'p',
                    h2: 'p',
                    h3: 'p',
                    h4: 'p',
                    h5: 'p',
                    h6: 'p',
                    subtitle1: 'p',
                    subtitle2: 'p',
                    body1: 'p',
                    body2: 'p'
                }
            }
        }

        const overrides = {
            MuiTypography: {
                h1: { // H1Title
                    fontFamily: 'srgssr-type-Bd, sans-serif',
                    fontSize: '2.4rem'
                },
                h2: { // H2Title
                    fontFamily: 'srgssr-type-Bd, sans-serif',
                    fontSize: '1.75rem'
                },
                h3: { // H3Title
                    fontFamily: 'srgssr-type-Bd, sans-serif',
                    fontSize: '1.5rem'
                },
                h4: {
                    fontFamily: 'srgssr-type-Bd, sans-serif',
                    fontSize: '1.25rem'
                },
                h5: { // text2
                    fontFamily: 'srgssr-type-Bd, sans-serif',
                    fontSize: '1rem'
                },
                h6: {
                    fontFamily: 'srgssr-type-Bd, sans-serif',
                    fontSize: '0.75rem'
                },
                subtitle1: { // text1
                    fontFamily: 'srgssr-type-Md, sans-serif',
                    fontSize: '1.25rem',
                    lineHeight: 1.5
                },
                subtitle2: { // text3
                    fontFamily: 'srgssr-type-Rg, sans-serif',
                    fontSize: '1rem'
                },
                body1: { // text4
                    fontFamily: 'srgssr-type-Rg, sans-serif',
                    fontSize: '0.75rem'
                }
            },
            MuiCardContent: {
                root: {
                    minHeight: '0px!important',
                    padding: '0.8rem',
                    paddingBottom: 0,
                    '&:last-child': {
                        paddingBottom: '0.8rem'
                    }
                }
            },
            MuiCard: {
                root: {
                    // Changement du border Radius fait globalement depuis la r??vision de la dasboard. avant 16px
                    borderRadius: '0.6rem',
                    minHeight: '0px!important',
                    boxShadow: 'none',
                    padding: '0.5rem'
                }
            },
            MuiIconButton: {
                root: {
                    padding: '1px!important'
                }
            },
            MuiCssBaseline: {
                '@global': {
                    'html, body': {
                        margin: 0,
                        fontSize: '2.2vh', /* Relative ?? la hauteur du viewPort (bloque le zoom?) */
                        fontFamily: 'sans-serif',
                        WebkitTextSizeAdjust: 'none',
                        overscrollBehavior: 'contain', /* prevent pull to refresh on mobile browsers */
                        '@media only screen and (min-width: 481px)': {
                            fontSize: '1.1em'
                        },
                        '@media only screen and (min-height: 901px)': {
                            fontSize: '1.1em'
                        },
                        '@media only screen and (min-height: 901px) and (min-width: 600px) and (min-aspect-ratio: 600/901)': {
                            fontSize: '2.2vh'
                        },
                        '@media only screen and (max-height:550px)': {
                            fontSize: '0.9em'
                        }
                    },
                    p: {
                        lineHeight: '1.2em' + '!important'
                    },
                    button: {
                        fontSize: '1.25rem!important',
                        fontFamily: 'srgssr-type-Md, sans-serif!important',
                        boxShadow: 'none!important'
                    }
                }
            }
        }

        this.backgroundImageURL = backgroundImageURL
        this.createdTheme = createMuiTheme({ props, palette, overrides })
        return this.createdTheme
    }

    getCreatedTheme () {
        return this.createdTheme
    }

    getBackgroundImageURL () {
        return this.backgroundImageURL
    }

    getDefaultTheme () {
        const palette = {
            primary: {
                main: '#90caf9',
                light: '#90caf9',
                dark: '#FFFF5B',
                contrastText: '#90caf9'
            },
            secondary: {
                main: '#90caf9',
                light: '#90caf9',
                dark: '#FFFF5B',
                contrastText: '#90caf9'
            },
            background: {
                paper: '#006978',
                default: '#006978'
            },
            error: {
                main: '#90caf9',
                contrastText: '#90caf9'
            }
        }
        return createMuiTheme({ palette })
    }

    getAdminTheme () {
        const palette = {
            primary: {
                main: '#424242',
                light: '#424242',
                dark: '#424242',
                contrastText: '#FFFFFF'
            },
            secondary: {
                main: '#FFFFFF',
                light: '#FFFFFF',
                dark: '#FFFFFF',
                contrastText: '#424242'
            },
            background: {
                paper: '#424242',
                default: '#FFFFFF'
            },
            error: {
                main: '#90caf9',
                contrastText: '#90caf9'
            }
        }

        const overrides = {
            MuiButton: {
                root: {
                    color: '#FFFFFF!important'
                }
            },
            MuiTypography: {
                colorPrimary: {
                    color: '#FFFFFF!important'
                }
            },
            MuiPickersDay: {
                current: {
                    color: 'rgba(255, 255, 255, 0.54)!important'
                }
            }

        }
        return createMuiTheme({ palette, overrides })
    }
}

const ThemeFactoryInstance = new ThemeFactory()

export default ThemeFactoryInstance
