'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface LoginFormProps {
    isLogin: boolean
    setIsLogin: (isLogin: boolean) => void
}

export default function LoginForm({ isLogin, setIsLogin }: LoginFormProps) {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (email === '1@example.com' && password === '111111') {
            // 登录成功，存储登录状态
            localStorage.setItem('isLoggedIn', 'true')
            // 跳转到功能页面
            router.push('/features')
        } else {
            setError('邮箱或密码错误')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-80"
        >
            <h2 className="text-3xl font-semibold mb-6 text-center">
                {isLogin ? '登录' : '注册'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        邮箱
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        密码
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isLogin ? '登录' : '注册'}
                </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                {isLogin ? "还没有账号？" : "已有账号？"}
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                >
                    {isLogin ? '注册' : '登录'}
                </button>
            </p>
        </motion.div>
    )
}

