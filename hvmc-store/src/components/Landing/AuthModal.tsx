"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { useTranslation } from "react-i18next";

export function AuthModal({
  open,
  onOpenChange,
  onLoginSuccess, // <-- Add this line

  
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (userData: { name: string }) => void; // <-- Add this line
}) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const { t } = useTranslation();

  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {activeTab === "login" 
              ? t('auth.login.title') 
              : t('auth.signup.title')}
          </DialogTitle>
        </DialogHeader>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">
              {t('header.login')}
            </TabsTrigger>
            <TabsTrigger value="signup">
              {t('auth.signup.title')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
  <LoginForm 
    onSuccess={(userData) => {
      onLoginSuccess(userData);  // <-- Update Header state
      handleSuccess();           // <-- Close modal
    }} 
  />
</TabsContent>

          <TabsContent value="signup">
            <SignupForm onSuccess={handleSuccess} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}