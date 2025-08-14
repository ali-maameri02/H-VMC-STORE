"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { authService } from "@/api/auth";
import { useState } from "react";
import { toast } from 'sonner';
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "auth.signup.errors.name",
  }),
  phone: z.string().min(10, {
    message: "auth.signup.errors.phone",
  }),
  email: z.string().email({
    message: "auth.signup.errors.email",
  }),
  password: z.string().min(6, {
    message: "auth.signup.errors.password",
  }),
  wilaya: z.string().min(1, {
    message: "auth.signup.errors.wilaya",
  }),
  address: z.string().min(5, {
    message: "auth.signup.errors.address",
  }),
});

export function SignupForm({ onSuccess }: { onSuccess?: () => void }) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      wilaya: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await authService.register(values);
      toast.success(t('auth.signup.successMessage'));
      localStorage.setItem('userData', JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
        wilaya: values.wilaya,
        address: values.address,
      }));

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(t('auth.signup.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2  overflow-y-clip">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.signup.name')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t('auth.signup.namePlaceholder')} 
                  {...field} 
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.name?.message && 
                  t(form.formState.errors.name.message as string)}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.signup.phone')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t('auth.signup.phonePlaceholder')} 
                  {...field} 
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.phone?.message && 
                  t(form.formState.errors.phone.message as string)}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.signup.email')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t('auth.signup.emailPlaceholder')} 
                  {...field} 
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.email?.message && 
                  t(form.formState.errors.email.message as string)}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wilaya"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.signup.wilaya')}</FormLabel>
              <FormControl>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 bg-white"
                  {...field}
                >
                  <option value="">{t('auth.signup.wilayaPlaceholder')}</option>
                  <option value="">Sélectionnez votre wilaya</option>
                    <option value="Adrar">Adrar</option>
                    <option value="Chlef">Chlef</option>
                    <option value="Laghouat">Laghouat</option>
                    <option value="Oum El Bouaghi">Oum El Bouaghi</option>
                    <option value="Batna">Batna</option>
                    <option value="Béjaïa">Béjaïa</option>
                    <option value="Biskra">Biskra</option>
                    <option value="Béchar">Béchar</option>
                    <option value="Blida">Blida</option>
                    <option value="Bouira">Bouira</option>
                    <option value="Tamanrasset">Tamanrasset</option>
                    <option value="Tébessa">Tébessa</option>
                    <option value="Tlemcen">Tlemcen</option>
                    <option value="Tiaret">Tiaret</option>
                    <option value="Tizi Ouzou">Tizi Ouzou</option>
                    <option value="Alger">Alger</option>
                    <option value="Djelfa">Djelfa</option>
                    <option value="Jijel">Jijel</option>
                    <option value="Sétif">Sétif</option>
                    <option value="Saïda">Saïda</option>
                    <option value="Skikda">Skikda</option>
                    <option value="Sidi Bel Abbès">Sidi Bel Abbès</option>
                    <option value="Annaba">Annaba</option>
                    <option value="Guelma">Guelma</option>
                    <option value="Constantine">Constantine</option>
                    <option value="Médéa">Médéa</option>
                    <option value="Mostaganem">Mostaganem</option>
                    <option value="M'Sila">M'Sila</option>
                    <option value="Mascara">Mascara</option>
                    <option value="Ouargla">Ouargla</option>
                    <option value="Oran">Oran</option>
                    <option value="El Bayadh">El Bayadh</option>
                    <option value="Illizi">Illizi</option>
                    <option value="Bordj Bou Arréridj">Bordj Bou Arréridj</option>
                    <option value="Boumerdès">Boumerdès</option>
                    <option value="El Tarf">El Tarf</option>
                    <option value="Tindouf">Tindouf</option>
                    <option value="Tissemsilt">Tissemsilt</option>
                    <option value="El Oued">El Oued</option>
                    <option value="Khenchela">Khenchela</option>
                    <option value="Souk Ahras">Souk Ahras</option>
                    <option value="Tipaza">Tipaza</option>
                    <option value="Mila">Mila</option>
                    <option value="Aïn Defla">Aïn Defla</option>
                    <option value="Naâma">Naâma</option>
                    <option value="Aïn Témouchent">Aïn Témouchent</option>
                    <option value="Ghardaïa">Ghardaïa</option>
                    <option value="Relizane">Relizane</option>
                  {/* Add all other wilayas here */}
                </select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.wilaya?.message && 
                  t(form.formState.errors.wilaya.message as string)}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.signup.address')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('auth.signup.addressPlaceholder')} 
                  {...field} 
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.address?.message && 
                  t(form.formState.errors.address.message as string)}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.signup.password')}</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder={t('auth.signup.passwordPlaceholder')} 
                  {...field} 
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message && 
                  t(form.formState.errors.password.message as string)}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t('auth.signup.submitting') : t('auth.signup.submit')}
        </Button>
      </form>
    </Form>
  );
}