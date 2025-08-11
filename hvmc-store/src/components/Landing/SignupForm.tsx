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
import { authService } from "@/api/auth"; // Import the auth service
import { useState } from "react";
import { toast } from 'sonner';

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
});

export function SignupForm({ onSuccess }: { onSuccess?: () => void }) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
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
      phone: values.phone,}));

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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