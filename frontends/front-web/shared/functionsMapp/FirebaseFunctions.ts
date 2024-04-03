import { CreateUserRequest } from '../requests/users/CreateUser.request';
import { CreateUserResponse } from '../responses/users/CreateUser.response';
import { CreatePublicationRequest } from '../requests/publications/CreatePublication.request';
import { PublicationModel } from '../models/publication/Publication.model';
import { ConfirmationResponse } from '../responses/Confirmation.response';
import { UpdatePublicationRequest } from '../requests/publications/UpdatePublication.request';
import { DeletePublicationFileRequest } from '../requests/publications/DeletePublicationFile.request';

export interface FirebaseFunctions {
  createUser: {
    functionName: 'USERS-create_user';
    request: CreateUserRequest;
    response: CreateUserResponse;
  };
  createPublication: {
    functionName: 'PUBLICATIONS-create_publication';
    request: CreatePublicationRequest;
    response: PublicationModel;
  };
  getAllPublications: {
    functionName: 'PUBLICATIONS-get_all_publication';
    request: any;
    response: PublicationModel[];
  },
  deletePublication: {
    functionName: 'PUBLICATIONS-delete_publication';
    request: {publicationId: string};
    response: ConfirmationResponse;
  },
  updatePublication: {
    functionName: 'PUBLICATIONS-update_publication';
    request: UpdatePublicationRequest;
    response: ConfirmationResponse;
  },
  deletePublicationFile: {
    functionName: 'PUBLICATIONS-delete_publication_file';
    request: DeletePublicationFileRequest;
    response: ConfirmationResponse;
  },
}