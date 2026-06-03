import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import { ArrowRightIcon, SparklesIcon } from 'lucide-react'
import React from 'react'

export const Navbar: React.FC = () => {
  return (
    <nav className="relative z-10 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center shadow-lg size-9 rounded-xl bg-linear-to-br from bg-amber-400 to-orange-500 shadow-gray-500/20 ">
          <SparklesIcon className="size-5 text-primary-content" />
        </div>
        <span className="text-xl font-bold">Whisper</span>
      </div>

      <div className="flex items-center gap-2">
        <SignInButton mode="modal">
          <button className="px-5 py-2.5 text-sm font-medium text-base-content/50 hover:text-base-content transition">
            Sign in
          </button>
        </SignInButton>

        <SignUpButton mode="modal">
          <button className="gap-2 text-sm font-semibold border-none rounded-full shadow-lg btn bg-linear-to-r from-amber-500 to-orange-500 hover:opacity-90 shadow-orange-500/25">
            Get Started
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </SignUpButton>
      </div>
    </nav>
  )
}
