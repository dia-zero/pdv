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
import Image from "next/image";
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
} from "lucide-react";
import { useState } from "react";

const pageNames: { [key: string]: string } = {
  "/admin": "Quadro",
  "/admin/customers": "Clientes",
  "/admin/products": "Produtos",
  "/admin/orders": "Pedidos",
  "/admin/pos": "Caixa",
  "/admin/cashier": "Vendas",
};

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:pl-0">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Admin Panel</span>
        </Link>
        
        {/* Menu hamburger para mobile */}
        <button
          className="sm:hidden ml-auto mr-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>

        <h1 className="text-xl font-bold hidden sm:block">{pageNames[pathname]}</h1>
        <div className="relative ml-auto flex-1 md:grow-0 hidden sm:block">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Image
                src="/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
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
        {/* Sidebar - Mobile: visível quando sidebarOpen, Desktop: sempre visível */}
        <aside
          className={`fixed mt-[56px] inset-y-0 left-0 z-20 w-14 flex-col border-r bg-background ${
            sidebarOpen ? "flex" : "hidden"
          } sm:flex`}
        >
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/admin"
                    onClick={closeSidebar}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      pathname === "/admin"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  >
                    <LayoutDashboardIcon className="h-5 w-5" />
                    <span className="sr-only">Quadro</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Quadro</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/admin/cashier"
                    onClick={closeSidebar}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      pathname === "/admin/cashier"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  >
                    <DollarSignIcon className="h-5 w-5" />
                    <span className="sr-only">Vendas</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Vendas</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/admin/products"
                    onClick={closeSidebar}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      pathname === "/admin/products"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  >
                    <PackageIcon className="h-5 w-5" />
                    <span className="sr-only">Produtos</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Produtos</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/admin/customers"
                    onClick={closeSidebar}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      pathname === "/admin/customers"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  >
                    <UsersIcon className="h-5 w-5" />
                    <span className="sr-only">Clientes</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Clientes</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/admin/orders"
                    onClick={closeSidebar}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      pathname === "/admin/orders"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  >
                    <ShoppingBagIcon className="h-5 w-5" />
                    <span className="sr-only">Pedidos</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Pedidos</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/admin/pos"
                    onClick={closeSidebar}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      pathname === "/admin/pos"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span className="sr-only">POS</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Caixa</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>

        {/* Overlay para fechar sidebar em mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 sm:hidden"
            onClick={closeSidebar}
          />
        )}

        <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
      </div>
    </div>
  );
}