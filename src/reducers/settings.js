import { SET_SETTING } from "../actions/settings.js"

const defaultSettings = {
  sku: "RE-VRC-17-3805", // TODO: make this user controllable
  season: "In The Zone",
  program: "VRC",
}

export default function settings(state = defaultSettings, action) {
  if(action.type === SET_SETTING) {
    return { ...state, ...action.payload }
  } else {
    return state
  }
}
