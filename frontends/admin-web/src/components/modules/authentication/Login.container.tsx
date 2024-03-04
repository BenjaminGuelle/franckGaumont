import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoader } from '@/hooks/useLoader';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { signInUser } from '@/services/auth.services';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  email: z.string().email({
    message: 'doit être un email valid',
  }),
  password: z.string().min(10, {
    message: 'doit faire au moins 10 caractères',
  }),
});

export const LoginContainer = () => {
  const router = useRouter();

  const loginForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const [onSubmit, isLoading] = useLoader(async (values: z.infer<typeof formSchema>) => {
    await signInUser(values);
    toast({
      title: `user bien connecté`,
      description: 'OKEY',
    })
    router.push('/');
  }, [])

  return (
    <div className={'p-20 rounded-3xl'}>
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
                    <Input placeholder="Mot de passe" {...field} type={'password'}/>
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
}