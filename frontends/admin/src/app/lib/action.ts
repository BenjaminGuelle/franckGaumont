'use server'

import { cookies } from 'next/headers'
import { toast } from '@/components/ui/use-toast';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function manegeAccessToken(token: string) {
  cookies().set('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
  });

  toast({
    title: `utilisateur`,
    description: 'Vous êtes bien connecté',
  });

  revalidatePath('/');
  redirect('/');
}

export async function removeCook() {
  cookies().delete('session');

  toast({
    title: `utilisateur`,
    description: 'Vous êtes bien déconnecté',
  })

  revalidatePath('/connexion');
  redirect('/connexion');
}