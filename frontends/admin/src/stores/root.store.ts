'use client';

import { createContext, useContext } from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import { UserDocument, UserInterface } from '@/hooks/useFirebaseAuth';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase.config';
import { docRef } from '@/api/firebase.service';
import { onSnapshot } from '@firebase/firestore';

export class RootStore {

  user: UserInterface | null = null;
  isLoading: boolean = true;

  get isAuthenticated() {
    return this.user !== null;
  }

  constructor() {
    makeAutoObservable(this);
    console.log('mobx is running');
    this.sub();
  }

  sub() {
    const unsubscribe = onAuthStateChanged(auth, this.authStateChanged);
    return () => unsubscribe();
  }

  authStateChanged = async (authState: User | null): Promise<void> => {
    await runInAction(async () => {
      if (!authState) {
        this.user = null;
        this.isLoading = false;
        return;
      }
      this.isLoading = true;
      const formattedUser: UserInterface = this.formatAuthUser(authState);
      await this.getUserDoc(formattedUser);
      if (!this.user) {
      }
    });
  };

  formatAuthUser: (user: User) => UserInterface = (user: User) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
  } as UserInterface);

  async getUserDoc(user: UserInterface): Promise<void> {
    if (auth.currentUser) {
      const compactUser: UserInterface = user;
      const ref = docRef('users', auth.currentUser.uid);
      onSnapshot(ref, async (doc) => {
        if (doc.exists()) {
          compactUser.userDocument = doc.data() as UserDocument;
        }

        runInAction(() => {
          this.user = compactUser;
          this.isLoading = false;
        });
      });
    }
  }

}

export const rootStore = new RootStore();
export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);