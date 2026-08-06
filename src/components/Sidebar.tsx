import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Home, 
  Scale, 
  Settings, 
  Shield, 
  ChevronDown, 
  ChevronRight,
  Building2,
  FileText,
  Printer,
  BarChart3,
  ClipboardList
} from 'lucide-react'

interface MenuItem {
  title: string
  icon: React.ReactNode
  path?: string
  children?: { title: string; path: string }[]
}

const menuItems: MenuItem[] = [
  {
    title: '首页',
    icon: <Home size={18} />,
    path: '/',
  },
  {
    title: '称重管理',
    icon: <Scale size={18} />,
    children: [
      { title: '称重看板', path: '/dashboard' },
      { title: '称重配置', path: '/configuration' },
      { title: '打印申请', path: '/print-application' },
      { title: '称重汇总', path: '/summary' },
      { title: '称重记录', path: '/records' },
    ],
  },
  {
    title: '组织权限',
    icon: <Shield size={18} />,
    children: [],
  },
  {
    title: '系统管理',
    icon: <Settings size={18} />,
    children: [],
  },
]

export default function Sidebar() {
  const [expandedMenu, setExpandedMenu] = useState<string | null>('称重管理')

  const toggleMenu = (title: string) => {
    setExpandedMenu(expandedMenu === title ? null : title)
  }

  const getMenuIcon = (title: string) => {
    switch (title) {
      case '称重看板': return <BarChart3 size={16} />
      case '称重配置': return <Settings size={16} />
      case '打印申请': return <Printer size={16} />
      case '称重汇总': return <FileText size={16} />
      case '称重记录': return <ClipboardList size={16} />
      default: return null
    }
  }

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <Building2 size={20} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-800 text-sm">YHGlobal</div>
            <div className="text-xs text-gray-500">越海全球供应链</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item) => (
          <div key={item.title}>
            {item.path ? (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            ) : (
              <div
                onClick={() => toggleMenu(item.title)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer text-gray-600 hover:bg-gray-50 ${
                  expandedMenu === item.title ? 'bg-gray-50' : ''
                }`}
              >
                {item.icon}
                <span className="flex-1">{item.title}</span>
                {item.children && item.children.length > 0 ? (
                  expandedMenu === item.title ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                ) : null}
              </div>
            )}
            {item.children && item.children.length > 0 && expandedMenu === item.title && (
              <div className="bg-gray-50">
                {item.children.map((child) => (
                  <NavLink
                    key={child.path}
                    to={child.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors cursor-pointer ${
                        isActive
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-500 hover:text-gray-700'
                      }`
                    }
                  >
                    {getMenuIcon(child.title)}
                    <span>{child.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
