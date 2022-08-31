import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase';


interface Auth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<Auth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ user, setUser ] = useState<User | null>(null);
  const [ error, setError ] = useState(null);
  const [ initialLoading, setInitialLoading ] = useState<boolean>(true)
  const router = useRouter();

  useEffect(() => 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } 
      else {
        setUser(null);
        setLoading(true);
        router.push('/register');
      }
      setInitialLoading(false);
  }), [auth]);


  const signUp = async (email: string, password: string) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user);
        router.push('/signup');
        setLoading(false);
      })
      .catch(error => { 
        alert(error.message);
        if (error.code === 'auth/email-already-in-use') {
          router.push('/login');
        }
        else {
          router.reload();
        }
      })
      .finally(() => setLoading(false))
  };


  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user);
        router.push('/');
        setLoading(false);
      })
      .catch(error => alert(error.message))
      .finally(() => setLoading(false))
  };


  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch(error => alert(error.message))
      .finally(() => setLoading(false))
  };

  const memorizedValue = useMemo(() => ({ user, signUp, signIn, error, loading, logout }), [user, loading, error]);


  return (
    <AuthContext.Provider value={memorizedValue}>
      { !initialLoading && children }
    </AuthContext.Provider>
  )
};

export default function useAuth() {
  return useContext(AuthContext);
};