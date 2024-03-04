'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLoader } from '@/hooks/useLoader';
import { createUser } from '@/api/users/users.services';

export const Register = () => {

  const formSchema = z.object({
    email: z.string().email({
      message: 'doit être un email valid',
    }),
    password: z.string().min(10, {
      message: 'doit faire au moins 10 caractères',
    }),
  })
  type FormValues = z.infer<typeof formSchema>;

  const registerForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const [onSubmit, isLoading] = useLoader(async (values: z.infer<typeof formSchema>) => {
    await createUser({email: values.email, password: values.password});
  }, [])

  return (
    <div>
      <h2 className={'text-xl font-semibold'}>Créer un nouvel utilisateur</h2>
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-8">
          <div className={'flex gap-10 py-10'}>
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    email de connexion
                  </FormDescription>
                  <FormMessage className={'text-red'}/>
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="Mot de passe" {...field} />
                  </FormControl>
                  <FormDescription>
                    * au moins 5 caractères
                  </FormDescription>
                  <FormDescription>
                    * au moins 1 caractère spécial
                  </FormDescription>
                  <FormMessage className={'text-red'}/>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit" className={'text-white'}>{isLoading ? 'load...' : 'Ajouter'}</Button>
        </form>
      </Form>
    </div>
  )
}