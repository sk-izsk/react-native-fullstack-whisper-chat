import { SendIcon } from 'lucide-react'

interface ChatInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void
  disabled: boolean
}

export const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSubmit, disabled }) => {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-base-300">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Type a message..."
          className="flex-1 input input-bordered rounded-xl bg-base-300/40 border-base-300 placeholder:text-base-content/60"
        />
        <button
          type="submit"
          disabled={disabled}
          className="border-none btn rounded-xl bg-linear-to-r from-amber-500 to-orange-500 disabled:btn-disabled"
        >
          <SendIcon className="size-5" />
        </button>
      </div>
    </form>
  )
}
