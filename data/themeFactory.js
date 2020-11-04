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
        const overrides = {
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
        this.createdTheme = createMuiTheme({ palette, overrides })
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
