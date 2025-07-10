import {MessageType} from '@/types'

interface MessageProps {
  type: MessageType
  children: React.ReactNode
  className?: string
}

export function Message({type, children, className = ''}: MessageProps) {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border border-green-200'
      case 'error':
        return 'bg-red-50 text-red-800 border border-red-200'
      case 'info':
        return 'bg-blue-50 text-blue-800 border border-blue-200'
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border border-yellow-200'
      default:
        return 'bg-gray-50 text-gray-800 border border-gray-200'
    }
  }

  return <div className={`p-4 rounded-lg ${getStyles()} ${className}`}>{children}</div>
}
