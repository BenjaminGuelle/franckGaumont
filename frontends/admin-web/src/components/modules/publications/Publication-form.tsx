import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { publicationSchema, PublicationValues } from '@/utils/schemas/publication.schema';
import { Textarea } from '@/components/ui/textarea';
import { useCallback, useState } from 'react';
import { RxUpdate } from 'react-icons/rx';
import { Switch } from '@/components/ui/switch';
import { Simulate } from 'react-dom/test-utils';
import submit = Simulate.submit;

interface Props {
  callbackSubmit: (values: PublicationValues) => Promise<void>;
  initialData?: PublicationValues;
}

export const PublicationForm = ({ callbackSubmit, initialData }: Props) => {

  const [isLoading, setIsLoading] = useState(false);

  const publicationForm = useForm<PublicationValues>({
    resolver: zodResolver(publicationSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      city: '',
      category: 'ARRANGEMENT',
      isOnline: false,
    },
  });

  const onSubmit = useCallback(async (values: z.infer<typeof publicationSchema>) => {
    setIsLoading(true);
    await callbackSubmit(values);
    setIsLoading(false);
  }, [callbackSubmit]);

  return (
    <>
      <div className={'border-b border-b-primary-500 flex items-center justify-between py-4 md:py-0'}>
        <h3 className={'text-primary font-medium md:text-lg'}>Description</h3>
        {initialData &&
            <Button type="button" size={'icon'} isLoading={isLoading} className={'pl-0 md:hidden'}
                    onClick={publicationForm.handleSubmit(onSubmit)}>
                <div className={'bg-primary p-2 rounded-full'}>
                    <RxUpdate className={'w-6 h-6 text-white'}/>
                </div>
            </Button>}
      </div>
      <Form {...publicationForm}>
        <form onSubmit={publicationForm.handleSubmit(onSubmit)} className="space-y-8">
          <div className={'flex flex-col gap-5 md:gap-10 py-5'}>
            <FormField
              control={publicationForm.control}
              name="isOnline"
              render={({ field }) => (
                <FormItem>
                  <FormControl className={'bg-white text-black pl-2'}>
                    <div className={'flex gap-4 items-center'}>
                      <p>Publication en ligne:</p>
                      <span>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={publicationForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Titre de la publication" {...field} type={'text'}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={publicationForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="description" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={publicationForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="ville" {...field} type={'text'}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={publicationForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={'text-black text-base'}>Catégorie de la publication</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Choisir une catégorie"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Catégories</SelectLabel>
                          <SelectItem value="ARRANGEMENT">Agencement</SelectItem>
                          <SelectItem value="PLUMBING">Plomberie</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className={'flex justify-center lg:justify-normal'}>
              {initialData
                ? <Button type="submit" variant={'link'} isLoading={isLoading} className={'pl-0 hidden md:flex'}>
                  <div className={'bg-primary p-2 rounded-full'}>
                    <RxUpdate className={'w-6 h-6 text-white'}/>
                  </div>
                  <p className={'text-primary text-sm md:text-base'}>Mettre à jour les informations</p>
                </Button>
                : <Button type="submit" variant={'default'} isLoading={isLoading}>
                  <p>Créer la publication</p>
                </Button>
              }
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};