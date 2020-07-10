import { createMuiTheme } from '@material-ui/core'

class ThemeFactory {
    createTheme (importedTheme) {
        const { primary, primaryVariant, onPrimary, secondary, secondaryVariant, onSecondary, background, error, onError } = importedTheme
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

        return createMuiTheme({ palette })
    }
}

const ThemeFactoryInstance = new ThemeFactory()

export default ThemeFactoryInstance
