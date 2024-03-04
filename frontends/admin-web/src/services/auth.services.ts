import {
  signInWithEmailAndPassword,
  signOut, UserCredential,
} from 'firebase/auth';
import { auth } from '@/config/firebase.config';
import { FirebaseError } from '@firebase/util';
import { toast } from '@/components/ui/use-toast';
import { ConfirmationResponse } from '@/shared/responses/Confirmation.response';
import { CreateUserRequest } from '@/shared/requests/users/CreateUser.request';

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
    return user;
  } catch (e) {
    const error = e as FirebaseError;
    toast({
      title: error.code,
      description: error.message,
    })
  }
}

export async function signOutUser(): Promise<ReturnErrorFB | ConfirmationResponse> {
  try {
    console.log('AUTH', auth);
    await signOut(auth);
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