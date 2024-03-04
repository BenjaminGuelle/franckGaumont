import { CreateUserRequest } from '@/requests/users/CreateUser.request';
import { CreateUserResponse } from '@/responses/users/CreateUser.response';

export interface FunctionsMapp {
  createUser: {
    functionName: 'USERS-create_user';
    request: CreateUserRequest;
    response: CreateUserResponse;
  };
}