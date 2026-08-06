import { useState } from 'react'
import { Search, RefreshCw, Download, ChevronLeft, ChevronRight } from 'lucide-react'

interface WeightRecord {
  id: number
  time: string
  plateNumber: string
  weightResult: number
  fee: number
  operator: string
}

const recordsData: WeightRecord[] = [
  { id: 1, time: '2026-08-06 14:32:18', plateNumber: '粤L78872', weightResult: 12690, fee: 50, operator: '张三' },
  { id: 2, time: '2026-08-06 13:15:42', plateNumber: '粤BCH7899', weightResult: 8520, fee: 50, operator: '李四' },
  { id: 3, time: '2026-08-06 11:28:06', plateNumber: '粤A12345', weightResult: 15340, fee: 50, operator: '王五' },
  { id: 4, time: '2026-08-06 10:05:33', plateNumber: '粤B67890', weightResult: 6780, fee: 50, operator: '张三' },
  { id: 5, time: '2026-08-06 09:18:47', plateNumber: '粤C24680', weightResult: 22100, fee: 50, operator: '李四' },
  { id: 6, time: '2026-08-05 17:42:15', plateNumber: '粤L78872', weightResult: 11250, fee: 50, operator: '王五' },
  { id: 7, time: '2026-08-05 16:30:22', plateNumber: '粤D13579', weightResult: 9340, fee: 50, operator: '张三' },
  { id: 8, time: '2026-08-05 15:12:08', plateNumber: '粤BCH7899', weightResult: 7890, fee: 50, operator: '李四' },
  { id: 9, time: '2026-08-05 14:22:36', plateNumber: '粤E86420', weightResult: 18560, fee: 50, operator: '王五' },
  { id: 10, time: '2026-08-05 13:45:19', plateNumber: '粤F24681', weightResult: 5670, fee: 50, operator: '张三' },
]

export default function Records() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const total = 1255

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">称重记录</h1>
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
            <label className="text-sm text-gray-600">称重时间</label>
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
            <label className="text-sm text-gray-600">操作员</label>
            <input
              type="text"
              placeholder="请输入"
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">序号</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    称重时间
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
                    称重结果 (KG)
                    <span className="text-gray-400 text-xs">⇅</span>
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    费用 (元)
                    <span className="text-gray-400 text-xs">⇅</span>
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    操作员
                    <span className="text-gray-400 text-xs">⇅</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {recordsData.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{row.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.time}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.plateNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.weightResult.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.fee}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.operator}</td>
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
            <button className="text-gray-400 text-sm">...</button>
            <button className="w-8 h-8 text-gray-600 rounded text-sm hover:bg-gray-100">63</button>
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
