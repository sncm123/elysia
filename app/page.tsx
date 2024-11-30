'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import { IconCloudDemo } from '@/components/ui/icon-cloud'
import { getFullPath } from '@/lib/utils'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // 检查是否已登录
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      if (isLoggedIn) {
        // 使用辅助函数获取完整路径
        window.location.href = getFullPath('/features')
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 bg-white flex items-center justify-center"
      >
        <IconCloudDemo />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 flex items-center justify-center"
      >
        <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
      </motion.div>
    </div>
  )
}

