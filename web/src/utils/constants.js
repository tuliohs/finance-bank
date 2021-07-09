export const THEMES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

export const defaultTheme = THEMES.LIGHT

export default THEMES;

//--------------Url--------------------
let baseUrl = "http://localhost:9098/api"

export const URL = {
  BASE: baseUrl,
  //user  
  REGISTER: `${baseUrl}/v1/auth/register`,
  LOGIN: `${baseUrl}/v1/auth/authenticate`,
  USER: `${baseUrl}/v1/auth/user`,

  OPERATION: `${baseUrl}/v1/operation`,

}

