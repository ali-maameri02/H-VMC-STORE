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
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email({
    message: "auth.login.errors.email",
  }),
  password: z.string().min(6, {
    message: "auth.login.errors.password",
  }),
});

export function LoginForm({
  onSuccess,
}: {
  onSuccess?: (userData: { name: string }) => void; // <-- Change to accept userData
}) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await authService.login(values);
  
      toast.success(t('auth.login.successMessage'));
  
      if (onSuccess && response?.data) {
        onSuccess({ name: response.data }); // ✅ Pass name
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(t('auth.login.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.login.email')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t('auth.login.emailPlaceholder')} 
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
              <FormLabel>{t('auth.login.password')}</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder={t('auth.login.passwordPlaceholder')} 
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
          {isSubmitting ? t('auth.login.submitting') : t('auth.login.submit')}
        </Button>
      </form>
    </Form>
  );
}