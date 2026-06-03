import React from 'react'

interface Props {
  sources: string[]
  alt: string
}

export const AvatarGroup: React.FC<Props> = ({ sources, alt }) => {
  return (
    <div className="-space-x-3 avatar-group">
      {sources.map((source, index) => (
        <div className="avatar" key={index}>
          <div className="w-10 border-2 rounded-full border-base-100">
            <img src={source} alt={alt} />
          </div>
        </div>
      ))}
    </div>
  )
}
