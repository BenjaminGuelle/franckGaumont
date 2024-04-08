export interface CreateUserRequest {
  email: string;
  password: string;

  firstName?: string;
  lastName?: string;

  userUid?: string;
  description?: string;

}
