import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase.config';
import { docRef } from '@/api/firebase.service';
import { onSnapshot, Timestamp } from '@firebase/firestore';
import {useRouter} from 'next/navigation';

export interface UserInterface {
  uid: string;
  email: string | null,
  displayName: string | null,
  emailVerified: boolean,
  isAnonymous: boolean,
  phoneNumber: string | null,
  photoURL: string | null,
  userDocument?: UserDocument,
}

export interface UserDocument {
  uid: string;
  email: string,
  creationDate: Timestamp,

  firstName?: string,
  lastName?: string,
  description?: string;
  birthdate?: null,

  isAdmin: boolean,
  isSuperAdmin: boolean,
}

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<UserInterface | null>(null);
  const [authUserIsLoading, setAuthUserIsLoading] = useState(true);
  const router = useRouter();

  const formatAuthUser: (user: User) => UserInterface = (user: User) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
  } as UserInterface);

  const getUserDoc = async (user: UserInterface): Promise<void> => {
    if (auth.currentUser) {
      const compactUser: UserInterface = user;
      const ref = docRef('users', auth.currentUser.uid);
      onSnapshot(ref, async (doc) => {
        if (doc.exists()) {
          compactUser.userDocument = doc.data() as UserDocument;
        }
        setAuthUser((prevState) => ({
          ...prevState,
          ...compactUser,
        }))
        setAuthUserIsLoading(false);
      });
    }
  }

  const authStateChanged = async (authState: User | null): Promise<void> => {
    if (!authState) {
      setAuthUser(null);
      setAuthUserIsLoading(false);
      router.replace('/connexion');
      return;
    }
    setAuthUserIsLoading(true);
    const formattedUser: UserInterface = formatAuthUser(authState);
    await getUserDoc(formattedUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser, authUserIsLoading,
  };
}