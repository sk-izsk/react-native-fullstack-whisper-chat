import React from 'react'

export const Poster: React.FC = () => {
  return (
    <div className="relative items-center justify-center flex-1 hidden overflow-hidden lg:flex bg-base-200">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
          backgroundSize: '50px 50px',
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]
           bg-linear-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-[100px]"
      />

      <div className="relative z-10">
        <div className="absolute p-px -inset-px rounded-3xl bg-linear-to-b from-white/20 to-white/5">
          <div className="w-full h-full rounded-3xl bg-base-200" />
        </div>

        <div className="relative p-6 border shadow-2xl rounded-3xl border-base-300 bg-base-200/80 backdrop-blur-xl">
          <img src="/auth.png" alt="Chat illustration" className="w-80 xl:w-96 rounded-2xl" />

          <div className="absolute px-4 py-2 text-sm font-medium border rounded-full -top-4 -right-4 bg-emerald-500/20 border-emerald-500/30 text-emerald-400 backdrop-blur-sm">
            ● 3 online
          </div>

          <div className="absolute -bottom-4 -left-4 px-4 py-2.5 bg-base-300/40 border border-base-300 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-amber-400 to-orange-500" />
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-rose-400 to-pink-500" />
              </div>
              <span className="text-sm text-base-content/80">typing...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
