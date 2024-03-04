'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useLoader } from '@/hooks/useLoader';
import { signInUser } from '@/api/auth/auth.services';
import { observer } from 'mobx-react';

interface Props {

}

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  email: z.string().email({
    message: 'doit être un email valid',
  }),
  password: z.string().min(10, {
    message: 'doit faire au moins 10 caractères',
  }),
});

export const Login = observer(({}: Props) => {

  const loginForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const [onSubmit, isLoading] = useLoader(async (values: z.infer<typeof formSchema>) => {
    await signInUser(values);
  }, [])


  return (
    <div>
      <h2 className={'text-xl font-semibold'}>Veuillez vous connecter</h2>
      <p className={'h-14 py-3 font-light text-red'}></p>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
          <div className={'flex gap-10 py-10'}>
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type={'email'}/>
                  </FormControl>
                  <FormDescription>
                    email de connexion
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="Mot de passe" {...field} type={'password'} />
                  </FormControl>
                  <FormDescription>
                    * au moins 5 caractères
                  </FormDescription>
                  <FormDescription>
                    * au moins 1 caractère spécial
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className={'text-white'}>{isLoading ? '...load' : 'Me connecter'}</Button>
        </form>
      </Form>
    </div>
  )
})