"use client";
import Image from 'next/image'
import DisplayLogButton from '../components/DisplayLogButton'
import WelcomeHeader from '../components/WelcomeHeader'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">

      <div className="w-max md:w-3/4 h-2 mt-12 pb-2 mb-6">
        <WelcomeHeader />

      </div>
        <div className="mt-96 items-center">
            <DisplayLogButton />
        </div>
    </main>
  )
}
