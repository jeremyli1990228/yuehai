export default function Home() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekday = weekdays[now.getDay()]
  
  const hour = now.getHours()
  const greeting = hour < 6 ? '凌晨好' : hour < 9 ? '早上好' : hour < 12 ? '上午好' : hour < 14 ? '中午好' : hour < 18 ? '下午好' : '晚上好'

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          管理员，欢迎登录
        </h1>
        <p className="text-gray-500 text-lg">
          {greeting}，今天是{year}年，{month}月{day}日，{weekday}
        </p>
      </div>
    </div>
  )
}
