export const SET_SETTING = "SET_SETTING"
export const setSetting = (setting) => {
  return { type: SET_SETTING, payload: { setting } }
}

export const SET_SETTINGS = "SET_SETTINGS"
export const setSettings = (settings) => {
  return { type: SET_SETTINGS, payload: { settings } }
}
