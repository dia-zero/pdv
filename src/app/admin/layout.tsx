"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AdminLayout } from "@/components/admin-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted) {
          if (!session) {
            router.replace("/login");
          } else {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error("Erro ao verificar usuário:", error);
        if (mounted) {
          router.replace("/login");
        }
      }
    };

    checkUser();

    return () => {
      mounted = false;
    };
  }, [router, supabase.auth]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <AdminLayout>{children}</AdminLayout>;
}
