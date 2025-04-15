
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { userState, isAuthLoadingState } from '@/recoil/atoms/userAtom';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const setUser = useSetRecoilState(userState);
  const [isLoading, setIsAuthLoading] = useRecoilState(isAuthLoadingState);
  const [localUser, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setLocalUser(currentSession?.user ?? null);
        setUser(currentSession?.user ?? null);
        setIsAuthLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setLocalUser(currentSession?.user ?? null);
      setUser(currentSession?.user ?? null);
      setIsAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setIsAuthLoading]);

  const signIn = async (email: string, password: string) => {
    try {
      setIsAuthLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      toast.success("Signed in successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setIsAuthLoading(true);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });
      
      if (error) throw error;
      toast.success("Account created successfully! Please check your email for verification.");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsAuthLoading(true);
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const value = {
    user: localUser,
    session,
    signIn,
    signUp,
    signOut,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
