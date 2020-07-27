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

        return createMuiTheme({ palette })
    }
}

const ThemeFactoryInstance = new ThemeFactory()

export default ThemeFactoryInstance
