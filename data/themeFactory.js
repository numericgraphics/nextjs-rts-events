import { createMuiTheme } from '@material-ui/core'

class ThemeFactory {
    createTheme (importedTheme) {
        console.log('importedTheme', importedTheme)
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


accentColor: "#00A8C7"
actionColor: "#AF001E"
background: "#006978"
backgroundColor: "#F0F0F0"
backgroundImageURL: "https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95c3a34f9.png"
cardColor: "#FFFFFE"
error: "#FF0000"
foregroundAccentColor: "#333333"
foregroundActionColor: "#FFFFFF"
foregroundCardColor: "#382929"
foregroundColor: "#222222"
onBackground: "#B6FFAC"
onError: "#FFFFFF"
onPrimary: "#FFFFFE"
onSecondary: "#FFFDFD"
onSurface: "#000000"
primary: "#C62828"
primaryVariant: "#F05545"
secondary: "#0097A7"
secondaryVariant: "#56C8D8"
surface: "#EAEAEA"
