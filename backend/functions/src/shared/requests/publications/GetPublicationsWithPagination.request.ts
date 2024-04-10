export interface GetPublicationsWithPaginationRequest {
  perPage: number;
  lastVisible?: number;
  lastPriority?: boolean;
}