import {
  signInWithEmailAndPassword,
  signOut, UserCredential,
} from 'firebase/auth';
import { auth } from '@/config/firebase.config';
import { FirebaseError } from '@firebase/util';
import { ConfirmationResponse } from '@/responses/Confirmation.response';
import { CreateUserRequest } from '@/requests/users/CreateUser.request';
import { toast } from '@/components/ui/use-toast';
import { manegeAccessToken, removeCook } from '@/app/lib/action';

interface ReturnErrorFB extends ConfirmationResponse{
  error: {
    code: string,
    message: string
  }
}

interface SignInUserRequest extends CreateUserRequest {}

export async function signInUser(request: SignInUserRequest) {
  const {email, password} = request;

  try {
    const { user }: UserCredential = await signInWithEmailAndPassword(auth, email, password);

    const token = await user.getIdToken();

    if (user) {
      await manegeAccessToken(token);
    }
  } catch (e) {
    const error = e as FirebaseError;
    toast({
      title: error.code,
      description: error.message,
    })
    return {
      info: 'error',
      error: {
        code: error.code,
        message: error.message
      }
    }
  }
}

export async function signOutUser(): Promise<ReturnErrorFB | ConfirmationResponse> {
  try {
    await signOut(auth);
    await removeCook();
    toast({
      title: `utilisateur`,
      description: 'Vous êtes bien déconnecté',
    })
    return {
      info: 'ok'
    }
  } catch (e) {
    const error = e as FirebaseError
    return {
      info: 'error',
      error: {
        code: error.code,
        message: error.message
      }
    }
  }
}