'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Header from '../../components/Header'
import Marquee from '@/components/ui/marquee'
import { cn } from "@/lib/utils"
import TextRevealByWord from "@/components/ui/text-reveal"
import Image from "next/image"
import Link from "next/link"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"

const features = [
    {
        title: "智能分析",
        description: "强大的数据分析能力，帮助您做出明智决策",
        icon: "https://avatar.vercel.sh/analysis"
    },
    {
        title: "实时监控",
        description: "24/7全天候监控，确保系统稳定运行",
        icon: "https://avatar.vercel.sh/monitor"
    },
    {
        title: "自动化处理",
        description: "自动化工作流程，提高工作效率",
        icon: "https://avatar.vercel.sh/auto"
    },
    {
        title: "安全防护",
        description: "多层次安全防护，保护您的数据安全",
        icon: "https://avatar.vercel.sh/security"
    },
    {
        title: "团队协作",
        description: "便捷的团队协作功能，提升团队效率",
        icon: "https://avatar.vercel.sh/team"
    },
    {
        title: "定制化服务",
        description: "根据您的需求提供定制化解决方案",
        icon: "https://avatar.vercel.sh/custom"
    }
]

const firstRow = features.slice(0, features.length / 2)
const secondRow = features.slice(features.length / 2)

const FeatureCard = ({
    icon,
    title,
    description,
}: {
    icon: string
    title: string
    description: string
}) => {
    return (
        <figure className={cn(
            "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-6 mx-4",
            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
        )}>
            <div className="flex flex-row items-center gap-4">
                <img className="rounded-full" width="48" height="48" alt="" src={icon} />
                <h3 className="text-xl font-semibold dark:text-white">{title}</h3>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
        </figure>
    )
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                探索无限可能，创造独特体验。
              </span>{" "}
              让科技与艺术完美融合，打造属于你的专属空间。在这里，每一个想法都能成为现实，每一个梦想都值得被实现。
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const carouselData = [
  {
    category: "人工智能",
    title: "AI 让生活更智能",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "效率提升",
    title: "提升你的工作效率",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "产品创新",
    title: "突破传统，创新未来",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
];

export default function Features() {
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isLoggedIn = localStorage.getItem('isLoggedIn')
            if (!isLoggedIn) {
                router.push('/')
            }
        }
    }, [router])

    const cards = carouselData.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="relative flex flex-col gap-6">
                    <div className="text-center mb-8">
                        <h2 className="text-xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                            探索无限可能
                        </h2>
                    </div>

                    <div className="w-full mb-12">
                        <Carousel items={cards} />
                    </div>

                    <div className="relative overflow-hidden">
                        <Marquee className="py-4" pauseOnHover>
                            {[...firstRow, ...firstRow].map((feature, index) => (
                                <FeatureCard key={`${feature.title}-${index}`} {...feature} />
                            ))}
                        </Marquee>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-100 dark:from-gray-900"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-100 dark:from-gray-900"></div>
                    </div>

                    <div className="relative overflow-hidden">
                        <Marquee className="py-4" reverse pauseOnHover>
                            {[...secondRow, ...secondRow].map((feature, index) => (
                                <FeatureCard key={`${feature.title}-${index}`} {...feature} />
                            ))}
                        </Marquee>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-100 dark:from-gray-900"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-100 dark:from-gray-900"></div>
                    </div>

                    <div className="my-6">
                        <TextRevealByWord text="我的心中住着一个梦，让二次元走进生活。" />
                    </div>

                    <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
                        <CardContainer>
                            <CardBody>
                                <CardItem
                                    translateZ="50"
                                    className="text-3xl font-bold text-gray-900 dark:text-white"
                                >
                                    让梦想成为现实
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-base text-gray-500 dark:text-gray-300 mt-4"
                                >
                                    将二次元的魅力融入现实生活，创造独特的体验
                                </CardItem>
                                <CardItem translateZ="100" className="mt-8">
                                    <div className="w-full aspect-[16/10] relative rounded-lg overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
                                            alt="Nature"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </CardItem>
                                <div className="flex justify-between items-center mt-8">
                                    <CardItem
                                        translateZ={20}
                                        as={Link}
                                        href="#"
                                        className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        了解更多 →
                                    </CardItem>
                                    <CardItem
                                        translateZ={20}
                                        as="button"
                                        className="px-5 py-3 rounded-lg bg-black text-white text-base font-medium dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                                    >
                                        立即体验
                                    </CardItem>
                                </div>
                            </CardBody>
                        </CardContainer>

                        <CardContainer>
                            <CardBody>
                                <CardItem
                                    translateZ="50"
                                    className="text-3xl font-bold text-gray-900 dark:text-white"
                                >
                                    探索无限可能
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-base text-gray-500 dark:text-gray-300 mt-4"
                                >
                                    突破次元壁，让想象力自由翱翔
                                </CardItem>
                                <CardItem translateZ="100" className="mt-8">
                                    <div className="w-full aspect-[16/10] relative rounded-lg overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1620121692029-d088224ddc74"
                                            alt="Abstract"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </CardItem>
                                <div className="flex justify-between items-center mt-8">
                                    <CardItem
                                        translateZ={20}
                                        as={Link}
                                        href="#"
                                        className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        发现更多 →
                                    </CardItem>
                                    <CardItem
                                        translateZ={20}
                                        as="button"
                                        className="px-5 py-3 rounded-lg bg-black text-white text-base font-medium dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                                    >
                                        开始探索
                                    </CardItem>
                                </div>
                            </CardBody>
                        </CardContainer>
                    </div>
                </div>
            </main>
        </div>
    )
}


