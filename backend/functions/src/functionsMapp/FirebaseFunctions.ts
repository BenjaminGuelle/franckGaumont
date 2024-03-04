import { CreateUserRequest } from '../requests/users/CreateUser.request';
import { CreateUserResponse } from '../responses/users/CreateUser.response';
import { UserModel } from '../models/users/User.model';

export interface FirebaseFunctions {
  createUser: {
    functionName: 'USERS-create_user';
    request: CreateUserRequest;
    response: CreateUserResponse;
  };
  getUser: {
    functionName: 'USERS-get_user';
    request: {userId: string};
    response: UserModel | null;
  };
}