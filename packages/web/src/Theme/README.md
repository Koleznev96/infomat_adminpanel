Theme is based on https://mui.com/material-ui/

### Modular scss

We use [CssVarsProvider](https://mui.com/material-ui/experimental-api/css-theme-variables/usage/) to generated CSS variables from the theme.vars

Theme colors and spacing usage:

```scss
@import '@infomat/uikit/src/themeUtils';

.style {
	color: themeColor(--mui-palette-chat-group);
	margin: themeSpacing(2.5);
}
```

List of theme colors which are currently in use can be found here @infomat/uikit/src/themeUtils

### TS code

```tsx

<Grid
    container
    sx={(theme) => ({
        margin: `${theme.spacing(isAlertGroupButtons ? 1.5 : 4)} 0`,

    })}
    {children}
/>

```
