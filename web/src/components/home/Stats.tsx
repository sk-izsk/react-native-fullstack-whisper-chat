import React from 'react'

export const Stats: React.FC = () => {
  return (
    <div className="flex items-center gap-10 mt-12">
      <div>
        <div className="font-mono text-2xl font-bold">10K+</div>
        <div className="mt-1 text-xs tracking-wider uppercase text-base-content/60">Users</div>
      </div>
      <div className="w-px h-10 bg-white/10" />
      <div>
        <div className="font-mono text-2xl font-bold">99.9%</div>
        <div className="mt-1 text-xs tracking-wider uppercase text-base-content/60">Uptime</div>
      </div>
      <div className="w-px h-10 bg-white/10" />
      <div>
        <div className="font-mono text-2xl font-bold">&lt;50ms</div>
        <div className="mt-1 text-xs tracking-wider uppercase text-base-content/60">Latency</div>
      </div>
    </div>
  )
}
