import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import { ArrowRightIcon } from 'lucide-react'

export const AccessButtons = () => {
  return (
    <div className="flex items-center gap-4 mt-10">
      <SignUpButton mode="modal">
        <button className="flex items-center gap-3 px-8 py-4 font-semibold transition group bg-base-100 text-base-content rounded-2xl hover:bg-base-200">
          Start chatting
          <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </SignUpButton>

      <SignInButton mode="modal">
        <button className="px-8 py-4 font-semibold transition text-base-content/60 hover:text-base-content">
          I have an account
        </button>
      </SignInButton>
    </div>
  )
}
