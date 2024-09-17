"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import { useState } from "react";
import { FaBars } from "react-icons/fa"; // Importando o ícone de menu do React Icons

export const Navbar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { href: "/server", label: "Server" },
        { href: "/client", label: "Client" },
        { href: "/admin", label: "Admin" },
        { href: "/settings", label: "Settings" },
    ];

    return (
        <div className="bg-secondary p-4 rounded-xl shadow-sm w-full max-w-[600px] mx-auto">
            <div className="flex justify-between items-center">
                <Button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    variant="outline"
                >
                    <FaBars />
                </Button>
                <div className={`flex flex-col md:flex-row gap-2 ${isMenuOpen ? 'block' : 'hidden md:flex'}`}>
                    {navItems.map((item) => (
                        <Button
                            key={item.href}
                            asChild
                            variant={pathname === item.href ? "default" : "outline"}
                            className="w-full md:w-auto"
                        >
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                </div>
                <UserButton />
            </div>
        </div>
    )
}