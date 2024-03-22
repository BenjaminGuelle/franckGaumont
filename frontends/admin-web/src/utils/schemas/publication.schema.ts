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
});

export type PublicationValues = z.infer<typeof publicationSchema>;

export const publicationPictureSchema = z.object({
  photo_1: z.string(),
  photo_2: z.string(),
  photo_3: z.string(),
});