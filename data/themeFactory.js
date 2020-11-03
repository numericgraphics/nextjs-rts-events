import { createMuiTheme } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'

class ThemeFactory {
    constructor () {
        this.createdTheme = null
        this.backgroundImageURL = null
        this.createTheme = this.createTheme.bind(this)
        this.getCreatedTheme = this.getCreatedTheme.bind(this)
        this.getBackgroundImageURL = this.getBackgroundImageURL.bind(this)
        this.getDefaultTheme = this.getDefaultTheme.bind(this)
    }

    // TODO - add theme typo json model (yvain) - (scratch/theme-typo-json)
    createTheme (importedTheme) {
        console.log('importedTheme', importedTheme)
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
                // default: 'black'
                default: background
            },
            error: {
                main: error,
                contrastText: onError
            },
            action: {
                disabledBackground: 'gray',
                disabled: 'white'
            },
            onSecondary: onSecondary // @Rinaldo: Et pourquoi on pourrait pas faire ça???
        }
        // eslint-disable-next-line no-unused-vars

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
                    body1: 'span',
                    body2: 'span'
                }
            }
        }
        const overrides = {
            MuiTypography: {
                h1: {
                    fontFamily: 'srgssr-type-Bd, sans-serif',
                    fontSize: '2.4rem'
                },
                h2: {
                    fontFamily: 'srgssr-type-Bd, sans-serif',
                    fontSize: '1.75rem'
                },
                h3: {
                    fontFamily: 'srgssr-type-Bd, sans-serif',
                    fontSize: '1.5rem'
                },
                h4: {
                    fontFamily: 'srgssr-type-Bd, sans-serif',
                    fontSize: '1.25rem'
                },
                h5: {
                    fontFamily: 'srgssr-type-Bd, sans-serif',
                    fontSize: '1rem'
                },
                h6: {
                    fontFamily: 'srgssr-type-Bd, sans-serif',
                    fontSize: '0.75rem'
                },
                subtitle1: {
                    fontFamily: 'srgssr-type-Md, sans-serif',
                    fontSize: '1.25rem',
                    lineHeight: 1.5
                },
                subtitle2: {
                    fontFamily: 'srgssr-type-Rg, sans-serif',
                    fontSize: '1rem'
                },
                body1: {
                    fontFamily: 'srgssr-type-Rg, sans-serif',
                    fontSize: '0.75rem'
                }
            },
            MuiCardContent: {
                root: {
                    minHeight: '0px!important',
                    padding: 0
                }
            },
            MuiCard: {
                root: {
                    // Changement du border Radius fait globalement depuis la révision de la dasboard. avant 16px
                    borderRadius: '0.6rem',
                    minHeight: '0px!important',
                    boxShadow: 'none',
                    padding: '0.5rem'
                }
            },
            MuiCssBaseline: {
                '@global': {
                    /* body: {
                        backgroundImage: `url(${backgroundImageURL})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'auto 100%',
                        opacity: 1
                    }, */
                    a: {
                        color: palette.secondary.contrastText + '!important'
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
                contrastText: '#90caf9'
            },
            secondary: {
                main: '#90caf9',
                light: '#90caf9',
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
}

const ThemeFactoryInstance = new ThemeFactory()

export default ThemeFactoryInstance
