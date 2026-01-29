"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logout } from "@/app/login/actions";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import {
  Package2Icon,
  SearchIcon,
  LayoutDashboardIcon,
  DollarSignIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
  ShoppingBagIcon,
  MenuIcon,
  XIcon,
  CircleUserIcon,
} from "lucide-react";
import { useState, useEffect } from "react";

const pageNames: { [key: string]: string } = {
  "/admin": "Quadro",
  "/admin/customers": "Clientes",
  "/admin/products": "Produtos",
  "/admin/orders": "Pedidos",
  "/admin/pos": "Caixa",
  "/admin/cashier": "Vendas",
};

const navItems = [
  { href: "/admin", icon: LayoutDashboardIcon, label: "Quadro" },
  { href: "/admin/cashier", icon: DollarSignIcon, label: "Vendas" },
  { href: "/admin/products", icon: PackageIcon, label: "Produtos" },
  { href: "/admin/customers", icon: UsersIcon, label: "Clientes" },
  { href: "/admin/orders", icon: ShoppingBagIcon, label: "Pedidos" },
  { href: "/admin/pos", icon: ShoppingCartIcon, label: "Caixa" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeSidebar = () => setSidebarOpen(false);
  const currentPageName = pageNames[pathname] || "Admin";

  if (!mounted) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4">
          <Package2Icon className="h-6 w-6" />
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:pl-0">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-lg font-semibold flex-shrink-0"
        >
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Admin Panel</span>
        </Link>

        <h1 className="text-lg font-bold sm:text-xl flex-1 sm:flex-none truncate">
          {currentPageName}
        </h1>

        <div className="relative ml-auto flex-1 md:grow-0 hidden sm:block">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>

        <button
          className="sm:hidden p-2 hover:bg-accent rounded-md transition-colors flex-shrink-0"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full flex-shrink-0"
            >
              <CircleUserIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem>Suporte</DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={logout}>
              <button
                type="submit"
                className="w-full text-left px-2 py-1.5 text-sm cursor-pointer hover:bg-accent"
              >
                Sair
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <aside
          className={`fixed mt-[56px] inset-y-0 left-0 z-20 w-14 flex-col border-r bg-background transition-all duration-200 ${
            sidebarOpen ? "flex" : "hidden"
          } sm:flex`}
        >
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5 py-4">
            <TooltipProvider>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onClick={closeSidebar}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        title={item.label}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 sm:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

        <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
      </div>
    </div>
  );
}