"use client";

import { login } from "./actions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: { [key: string]: string } = {
    email_password_required: 'Email e senha são obrigatórios',
    invalid_credentials: 'Email ou senha incorretos',
    signup_failed: 'Erro ao criar conta. Tente novamente.',
    password_too_short: 'Senha deve ter no mínimo 6 caracteres',
  };

  const errorMessage = error ? errorMessages[error] || 'Erro desconhecido' : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <DollarSign className="h-10 w-10" />
          <h2 className="text-2xl font-bold">Mr. Gold</h2>
          <p className="text-sm text-muted-foreground">Sistema de PDV e Gerenciamento</p>
        </div>

        <Card>
          {errorMessage && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-t-lg text-sm">
              {errorMessage}
            </div>
          )}

          <form action={login}>
            <CardContent className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="email-login">E-mail</Label>
                <Input
                  id="email-login"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password-login">Senha</Label>
                <Input
                  id="password-login"
                  name="password"
                  type="password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}