export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const signIn = () => {
  return {
    type: SIGN_IN,
    userData: { id: 1337, name: 'David' }
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT,
    userData: null
  }
}