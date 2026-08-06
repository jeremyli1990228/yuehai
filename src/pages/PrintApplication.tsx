import { useState } from 'react'
import { Search, RefreshCw, Download, ChevronLeft, ChevronRight } from 'lucide-react'

interface PrintRecord {
  id: number
  applyTime: string
  plateNumber: string
  orderNumber: string
  reason: string
  status: string
}

const mockData: PrintRecord[] = [
  { id: 1, applyTime: '2025-04-20 17:18:39', plateNumber: '粤BCH7899', orderNumber: '2503240011', reason: '1', status: '已打印' },
  { id: 2, applyTime: '2025-04-11 11:57:16', plateNumber: '粤BCH7899', orderNumber: '2503240011', reason: '1', status: '已打印' },
  { id: 3, applyTime: '2025-04-11 11:14:47', plateNumber: '粤BCH7899', orderNumber: '2503240011', reason: '1', status: '已打印' },
  { id: 4, applyTime: '2025-04-11 11:12:20', plateNumber: '粤BCH7899', orderNumber: '2503240011', reason: '1', status: '已打印' },
  { id: 5, applyTime: '2025-04-11 11:11:35', plateNumber: '粤BCH7899', orderNumber: '2503240011', reason: '测试', status: '已打印' },
  { id: 6, applyTime: '2025-04-03 11:45:45', plateNumber: '粤BCH7899', orderNumber: '2503240011', reason: '测试', status: '已打印' },
  { id: 7, applyTime: '2025-04-03 11:44:59', plateNumber: '粤BCH7899', orderNumber: '2503240011', reason: '测试', status: '已打印' },
  { id: 8, applyTime: '2025-03-25 14:56:06', plateNumber: '粤BCH7899', orderNumber: '2503170016', reason: '1', status: '已打印' },
  { id: 9, applyTime: '2025-03-24 11:36:39', plateNumber: '粤BCH7899', orderNumber: '2503240006', reason: '测试', status: '已打印' },
  { id: 10, applyTime: '2025-03-24 11:36:08', plateNumber: '粤BCH7899', orderNumber: '2503240006', reason: '测试', status: '已打印' },
  { id: 11, applyTime: '2025-03-12 12:00:50', plateNumber: '粤BCH7899', orderNumber: '2503120008', reason: '测试', status: '已打印' },
]

export default function PrintApplication() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const total = mockData.length

  const getStatusClass = (status: string) => {
    switch (status) {
      case '已打印':
        return 'bg-green-50 text-green-600 border border-green-200'
      case '待打印':
        return 'bg-yellow-50 text-yellow-600 border border-yellow-200'
      case '已拒绝':
        return 'bg-red-50 text-red-600 border border-red-200'
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">打印申请</h1>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">车牌号</label>
            <input
              type="text"
              placeholder="请输入"
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">状态</label>
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">请选择</option>
              <option value="printed">已打印</option>
              <option value="pending">待打印</option>
              <option value="rejected">已拒绝</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">申请时间</label>
            <input
              type="text"
              placeholder="开始日期"
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-400">-</span>
            <input
              type="text"
              placeholder="结束日期"
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">单号</label>
            <input
              type="text"
              placeholder="请输入"
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 flex justify-end gap-2">
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center gap-1">
              <Search size={14} />
              <span>查询</span>
            </button>
            <button className="px-4 py-1.5 bg-white border border-gray-300 text-gray-600 rounded text-sm hover:bg-gray-50 transition-colors flex items-center gap-1">
              <RefreshCw size={14} />
              <span>重置</span>
            </button>
            <button className="px-4 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors flex items-center gap-1">
              <Download size={14} />
              <span>导出</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">序号</div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    申请时间
                    <span className="text-gray-400 text-xs">⇅</span>
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    车牌号
                    <span className="text-gray-400 text-xs">⇅</span>
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    单号
                    <span className="text-gray-400 text-xs">⇅</span>
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    申请原因
                    <span className="text-gray-400 text-xs">⇅</span>
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    状态
                    <span className="text-gray-400 text-xs">⇅</span>
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{row.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.applyTime}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.plateNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.orderNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.reason}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusClass(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-blue-500 hover:text-blue-600 text-sm">详情</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <span className="text-sm text-gray-500">共 {total} 条</span>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled={currentPage === 1}>
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 bg-blue-600 text-white rounded text-sm">1</button>
            <button className="w-8 h-8 text-gray-600 rounded text-sm hover:bg-gray-100">2</button>
            <button className="w-8 h-8 text-gray-600 rounded text-sm hover:bg-gray-100">3</button>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ChevronRight size={16} />
            </button>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
