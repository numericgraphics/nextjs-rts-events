import { createMuiTheme } from '@material-ui/core'

class ThemeFactory {
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
        const overrides = {
            MuiCssBaseline: {
                '@global': {
                    body: {
                        backgroundImage: `url(${backgroundImageURL})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'auto 100%',
                        height: '100vh',
                        opacity: 1
                    }
                }
            }
        }

        return createMuiTheme({ palette, overrides })
    }
}

const ThemeFactoryInstance = new ThemeFactory()

export default ThemeFactoryInstance
