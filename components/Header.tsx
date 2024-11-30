'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { HomeIcon, LayoutDashboardIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { Dock, DockIcon } from '@/components/ui/dock'
import { useRouter } from 'next/navigation'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const NAV_ITEMS = [
    { href: "/features", icon: LayoutDashboardIcon, label: "功能" },
    { href: "/profile", icon: UserIcon, label: "个人中心" },
]

const TEXT_NAV_ITEMS = [
    { href: "/features", label: "功能" },
    { href: "/pricing", label: "价格" },
    { href: "/contact", label: "联系我们" },
]

export default function Header() {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn')
        router.push('/')
    }

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-md fixed w-full top-0 z-50"
            >
                <div className="container mx-auto px-4">
                    <nav className="h-16 flex items-center">
                        {/* 左侧 Logo */}
                        <div className="w-48">
                            <Link href="/" className="text-2xl font-bold text-indigo-600">
                                Logo
                            </Link>
                        </div>
                        
                        {/* 中间导航 */}
                        <div className="hidden md:flex flex-1 justify-center">
                            <ul className="flex space-x-8">
                                {TEXT_NAV_ITEMS.map((item) => (
                                    <li key={item.label}>
                                        <Link 
                                            href={item.href}
                                            className="text-gray-600 hover:text-indigo-600 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* 右侧 Dock */}
                        <div className="w-48 flex justify-end">
                            <TooltipProvider>
                                <Dock className="bg-transparent p-0 h-[42px] gap-1 mt-1">
                                    {NAV_ITEMS.map((item) => (
                                        <DockIcon key={item.label} className="h-full">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link
                                                        href={item.href}
                                                        aria-label={item.label}
                                                        className={cn(
                                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                                            "h-full aspect-square rounded-full"
                                                        )}
                                                    >
                                                        <item.icon className="h-4 w-4" />
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{item.label}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </DockIcon>
                                    ))}
                                    <DockIcon className="h-full">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    onClick={handleLogout}
                                                    className={cn(
                                                        buttonVariants({ variant: "ghost", size: "icon" }),
                                                        "h-full aspect-square rounded-full text-red-500 hover:text-red-600"
                                                    )}
                                                >
                                                    <LogOutIcon className="h-4 w-4" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>退出登录</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </DockIcon>
                                </Dock>
                            </TooltipProvider>
                        </div>
                    </nav>
                </div>
            </motion.header>
            {/* 添加一个占位符，防止内容被固定定位的header遮挡 */}
            <div className="h-16"></div>
        </>
    )
}

