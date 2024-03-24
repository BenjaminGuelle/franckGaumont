import { z } from 'zod';

export const CategoryModel = z.union([
  z.literal('ARRANGEMENT'),
  z.literal('PLUMBING'),
]);

export const publicationSchema = z.object({
  title: z.string().min(1, {message: `Le titre est oblibatoire`}),
  description: z.string().min(1, {message: `La description est oblibatoire`}),
  city: z.string().min(1, {message: `La ville est oblibatoire`}),
  category: CategoryModel,
  isOnline: z.boolean(),
});

export type PublicationValues = z.infer<typeof publicationSchema>;
