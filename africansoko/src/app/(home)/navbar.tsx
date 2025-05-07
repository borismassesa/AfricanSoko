"use client";

import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu as MenuIcon } from 'lucide-react';
import { NavbarSidebar } from './navbar-sidebar';
import { useState } from 'react';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
})

interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}
const NavbarItem = ({
    href,
    children,
    isActive,
}: NavbarItemProps
) => {
    return (
        <Button 
            asChild
            variant="outline"
            className={cn(
                "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-5 text-base font-medium transition-all",
                isActive && "bg-black text-white hover:bg-black hover:text-white"
            )}
        >
            <Link href={href}>
                {children}
            </Link>
        </Button>
    );
};

const NavbarItems = [
    {href: "/", children: "Discover"},
    {href: "/marketplace", children: "Marketplace"},
    {href: "/about", children: "About"},
    {href: "/how-it-works", children: "How It Works"},
];

export const Navbar =() => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <nav className="h-20 flex border-b-2 border-black justify-between items-center font-medium bg-white px-6 md:px-10">
            <Link href="/" className="flex items-center">
                <span className={cn("text-4xl font-bold tracking-tight", poppins.className)}>
                    AfricanSoko
                </span>
            </Link>

            <NavbarSidebar
                items={NavbarItems}
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
            />
            
            <div className="items-center gap-6 hidden lg:flex mx-10">
                {NavbarItems.map((item) => (
                    <NavbarItem 
                        key={item.href} 
                        href={item.href}
                        isActive={pathname === item.href}
                    >
                        {item.children}
                    </NavbarItem>
                ))}
            </div>
            
            <div className="hidden lg:flex items-center">
                <Button 
                    variant="ghost" 
                    className="h-full rounded-full relative hover:bg-gray-100 transition-colors mr-2"
                    asChild
                >
                    <Link href="/cart" className="flex items-center justify-center p-2">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">0</span>
                    </Link>
                </Button>
                
                <Button 
                    variant="ghost"
                    className="h-10 px-6 rounded-full hover:bg-green-400 
                    transition-colors text-base font-medium mx-2"
                >
                    <Link href="/sign-in">
                        Sign In
                    </Link>
                </Button>
                
                <Button 
                    variant="default"
                    className="h-10 px-6 rounded-full bg-black text-white hover:bg-green-400 hover:text-black transition-colors text-base font-medium"
                >
                    <Link href="/sign-up">
                        Start Selling
                    </Link>
                </Button>
            </div>
            <div className="flex lg:hidden items-center">
                <Button 
                    variant="outline" 
                    className="size-12 border-transparent bg-white"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <MenuIcon />
                </Button>
            </div>

            

        </nav>
    )
}