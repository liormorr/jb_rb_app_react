const BASE_URL = "http://127.0.0.1:8000"
export const RESTAURANTS_LIST_URL = `${BASE_URL}/restaurants?rest_types=1`
export const BARS_LIST_URL = `${BASE_URL}/restaurants?rest_types=2`
export const WINERIES_LIST_URL = `${BASE_URL}/restaurants?rest_types=3`
export const PRIVATE_CHEFS_LIST_URL = `${BASE_URL}/restaurants?rest_types=4`
export const LOGIN_URL = `${BASE_URL}/api/auth/login`
export const ME_USER_URL = `${BASE_URL}/user-details/me`
export const USER_DETAILS_URL = `${BASE_URL}/user-details`
export const USER_REGISTRATION_URL = `${BASE_URL}/api/auth/signup`
export const POST_RESERVATION_URL = `${BASE_URL}/api/create/reservation/`
export const GET_USER_RESERVATIONS = `${BASE_URL}/api/user-reservations/`
