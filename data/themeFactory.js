import { createMuiTheme } from '@material-ui/core'

class ThemeFactory {
    constructor () {
        this.createdTheme = null
        this.createTheme = this.createTheme.bind(this)
    }

    createTheme (importedTheme) {
        const { primary, primaryVariant, onPrimary, secondary, secondaryVariant, onSecondary, background, error, onError, backgroundImageURL } = importedTheme
        const palette = {
            primary: {
                main: primary,
                light: primaryVariant,
                contrastText: onPrimary
            },
            secondary: {
                main: secondary,
                light: secondaryVariant,
                contrastText: onSecondary
            },
            background: {
                default: background
            },
            error: {
                main: error,
                contrastText: onError
            }
        }
        // eslint-disable-next-line no-unused-vars
        const overrides = {
            MuiCssBaseline: {
                '@global': {
                    body: {
                        backgroundImage: `url(${backgroundImageURL})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'auto 100%',
                        opacity: 1
                    }
                }
            }
        }
        this.createdTheme = createMuiTheme({ palette })
        return this.createdTheme
    }

    getCreatedTheme () {
        return this.createdTheme
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
