export const THEMES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

export const defaultTheme = THEMES.LIGHT

export default THEMES;

//--------------Url--------------------
let baseUrl = "http://localhost:9098/api"
//let baseUrl = "http://45.90.108.173:9098/api"


export const URL = {
  BASE: baseUrl,
  //WEB: "http://localhost:3000",
  WEB: "http://45.90.108.173:3000",
  //user  
  REGISTER: `${baseUrl}/v1/auth/register`,
  LOGIN: `${baseUrl}/v1/auth/authenticate`,
  LOGIN_GOOGLE: `${baseUrl}/v1/auth/authenticate-google`,
  USER: `${baseUrl}/v1/auth/user`,

  OPERATION: `${baseUrl}/v1/operation`,

}

