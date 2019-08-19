import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"

fairyGateTheme.baseLineHeight = 1.4
fairyGateTheme.blockMarginBottom = 0.75

fairyGateTheme.overrideThemeStyles = ({ rhythm }) => ({
  "a": {color: "#4156bf"},
  "blockquote > h1, blockquote > h2, blockquote > h3, blockquote > h4": {
    marginTop: 0,
  },
  "li > p": {
    marginBottom: rhythm(1 / 2),
  },
  "p code": {
    fontSize: "75%",
  },
  "tt,code": {
    fontSize: "80%",
  },
  pre: {
    lineHeight: 1.22,
  },
})

const typography = new Typography(fairyGateTheme)

const { rhythm, scale } = typography
export { rhythm, scale, typography as default }
