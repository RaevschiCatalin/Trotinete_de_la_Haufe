"use client";
import Image from 'next/image'
import WelcomeHeader from '../components/WelcomeHeader'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">

      <div className="w-max md:w-3/4 h-2 mt-12 pb-2 mb-6">
        <WelcomeHeader />

      </div>
        <div className="flex flex-col items-center justify-center">
            <button className="black_btn w-96 h-24"><h1 className="text-4xl font-extrabold">Get a ride</h1></button>
        </div>
    </main>
  )
}
