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


/*
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

*/
