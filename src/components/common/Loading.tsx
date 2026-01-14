/**
 * 로딩 스피너 컴포넌트
 */

import './Loading.css'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
}

export const Loading = ({ size = 'medium', text }: LoadingProps) => {
  return (
    <div className="loading-container">
      <div className={`loading-spinner loading-spinner--${size}`} />
      {text && <p className="loading-text">{text}</p>}
    </div>
  )
}
