'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import LoginForm from '../components/LoginForm'
import { IconCloudDemo } from '@/components/ui/icon-cloud'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)

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

