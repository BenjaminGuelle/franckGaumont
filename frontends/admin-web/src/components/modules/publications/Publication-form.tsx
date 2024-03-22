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
import { useLoader } from '@/hooks/useLoader';
import { publicationSchema, PublicationValues } from '@/utils/schemas/publication.schema';
import { Textarea } from '@/components/ui/textarea';
import { useCallback, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { RxUpdate } from 'react-icons/rx';

interface Props {
  callbackSubmit: (values: PublicationValues) => Promise<void>;
  initialData?: PublicationValues;
}
export const PublicationForm = ({callbackSubmit, initialData}: Props) => {

  const [isLoading, setIsLoading] = useState(false);

  const publicationForm = useForm<PublicationValues>({
    resolver: zodResolver(publicationSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      city: '',
      category: 'ARRANGEMENT',
    }
  })

  const onSubmit = useCallback(async (values: z.infer<typeof publicationSchema>) => {
    setIsLoading(true);
    await callbackSubmit(values);
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className={'border-b border-b-primary-500'}>
        <h3 className={'text-primary font-medium text-lg'}>Description</h3>
      </div>
      <Form {...publicationForm}>
        <form onSubmit={publicationForm.handleSubmit(onSubmit)} className="space-y-8">
          <div className={'flex flex-col gap-10 py-5'}>
            <FormField
              control={publicationForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre de la publication</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} type={'text'}/>
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
                  <FormLabel>description</FormLabel>
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
                  <FormLabel>ville</FormLabel>
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
                  <FormLabel>Catégorie de la publication</FormLabel>
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
              <Button type="submit" variant={'link'} isLoading={isLoading} className={'pl-0'}>
                <div className={'bg-primary p-2 rounded-full'}>
                  <RxUpdate className={'w-6 h-6 text-white'}/>
                </div>
                <p className={'text-primary'}>
                  {initialData ? 'Mettre à jour les informations' : 'Créer la publication'}
                </p>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}