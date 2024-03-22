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
import { useCallback, useState } from 'react';
import { User } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loginForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const [sub, loadin] = useLoader(async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const user: User | FirebaseError = await signInUser(values);
    setIsLoading(false);
    if (user instanceof FirebaseError) {
      setError('Votre email ou mot de passe est incorrect')
    }
    else router.push('/');
  }, [])

  return (
    <div className={'p-8 rounded-2xl bg-white shadow-lg w-[368px] h-[402px] flex flex-col justify-between'}>
      <h2 className={'text-xl font-medium border-b py-4 text-center'}>Veuillez vous connecter</h2>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(sub)}>
          <div className={'flex flex-col py-4 space-y-4'}>
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email d'utilisateur" {...field} type={'email'} required={true}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Mot de passe" {...field} type={'password'} required={true}/>
                  </FormControl>
                  <FormMessage>{error}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <p className={'flex justify-end text-sm text-primary hover:text-primary/50 cursor-pointer'}>Mot de passe oublié?</p>
      <div className={'w-full flex justify-center'}>
        <Button isLoading={isLoading} onClick={loginForm.handleSubmit(sub)}>
          Se connecter
        </Button>
      </div>
    </div>
  )
}