import { createContext, useState } from "react";


const AuthContext = createContext<any | undefined>(undefined);

export function AuthProvider({children}: any) {

	localStorage.getItem("Auth") === 'undefined' && localStorage.clear()
	
	const persistedAuth = JSON.parse(localStorage.getItem("auth") as string)
	const [auth, setAuth] = useState(persistedAuth)

  function signuser(authData: string) {
    setAuth(authData)
    localStorage.setItem("auth", JSON.stringify(authData))
  }

  function userout(){
	  setAuth("")
	  localStorage.removeItem("auth")
  }

  return (
    <AuthContext.Provider value={{ auth, signuser, userout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;