import { CreateUserRequest } from '@/requests/users/CreateUser.request';
import { CreateUserResponse } from '@/responses/users/CreateUser.response';
import { toast } from '@/components/ui/use-toast';
import { FirebaseError } from '@firebase/util';
import { onCall } from '@/api/firebase.service';

interface ErrorHttp {
  error: {
    code: string;
    message: string
  }
}
export async function createUser(request: CreateUserRequest): Promise<void | ErrorHttp> {
  try {
    const {user}: CreateUserResponse = await onCall<'createUser'>('USERS-create_user', request);
    toast({ title: `utilisateur ${user}`, description: 'Nouvel utilisateur bien créé'});
  } catch (e) {
    const firebaseError = e as FirebaseError;
    toast({ title: `Error ${firebaseError.code}`, description: firebaseError.message});
    return {
      error: {
        code: firebaseError.code,
        message: firebaseError.message
      }
    }
  }
}