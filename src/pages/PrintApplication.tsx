import { useState } from 'react'
import { Search, RefreshCw, Download, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface PrintRecord {
  id: number
  applyTime: string
  plateNumber: string
  phoneNumber: string
  orderNumber: string
  reason: string
  status: string
}

const mockData: PrintRecord[] = [
  { id: 1, applyTime: '2025-04-20 17:18:39', plateNumber: '粤BCH7899', phoneNumber: '18676722791', orderNumber: '2503240011', reason: '1', status: '已打印' },
  { id: 2, applyTime: '2025-04-11 11:57:16', plateNumber: '粤BCH7899', phoneNumber: '18676722791', orderNumber: '2503240011', reason: '1', status: '已打印' },
  { id: 3, applyTime: '2025-04-11 11:14:47', plateNumber: '粤BCH7899', phoneNumber: '18676722791', orderNumber: '2503240011', reason: '1', status: '已打印' },
  { id: 4, applyTime: '2025-04-11 11:12:20', plateNumber: '粤BCH7899', phoneNumber: '18676722791', orderNumber: '2503240011', reason: '1', status: '已打印' },
  { id: 5, applyTime: '2025-04-11 11:11:35', plateNumber: '粤BCH7899', phoneNumber: '18676722791', orderNumber: '2503240011', reason: '测试', status: '已打印' },
  { id: 6, applyTime: '2025-04-03 11:45:45', plateNumber: '粤BCH7899', phoneNumber: '18676722791', orderNumber: '2503240011', reason: '测试', status: '已打印' },
  { id: 7, applyTime: '2025-04-03 11:44:59', plateNumber: '粤BCH7899', phoneNumber: '18676722791', orderNumber: '2503240011', reason: '测试', status: '已打印' },
  { id: 8, applyTime: '2025-03-25 14:56:06', plateNumber: '粤BCH7899', phoneNumber: '18676722791', orderNumber: '2503170016', reason: '1', status: '已打印' },
  { id: 9, applyTime: '2025-03-24 11:36:39', plateNumber: '粤BCH7899', phoneNumber: '18676722791', orderNumber: '2503240006', reason: '测试', status: '已打印' },
  { id: 10, applyTime: '2025-03-24 11:36:08', plateNumber: '粤BCH7899', phoneNumber: '18676722791', orderNumber: '2503240006', reason: '测试', status: '已打印' },
  { id: 11, applyTime: '2025-03-12 12:00:50', plateNumber: '粤BCH7899', phoneNumber: '18676722791', orderNumber: '2503120008', reason: '测试', status: '已打印' },
]

export default function PrintApplication() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [detailOpen, setDetailOpen] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<PrintRecord | null>(null)
  const [activeTab, setActiveTab] = useState<'apply' | 'approval'>('apply')
  const total = mockData.length

  const handleViewDetail = (record: PrintRecord) => {
    setCurrentRecord(record)
    setActiveTab('apply')
    setDetailOpen(true)
  }

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
                    <button
                      onClick={() => handleViewDetail(row)}
                      className="text-blue-500 hover:text-blue-600 text-sm"
                    >
                      详情
                    </button>
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

      {/* Detail Modal */}
      {detailOpen && currentRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-2xl w-[560px] max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">详情</h2>
              <button
                onClick={() => setDetailOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-6 border-b border-gray-200">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab('apply')}
                  className={`py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === 'apply'
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  申请信息
                </button>
                <button
                  onClick={() => setActiveTab('approval')}
                  className={`py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === 'approval'
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  审批信息
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="px-6 py-4">
              {activeTab === 'apply' ? (
                <div className="border border-gray-200 rounded">
                  <div className="grid grid-cols-1 divide-y divide-gray-200">
                    <div className="flex">
                      <div className="w-28 px-4 py-3 bg-gray-50 text-sm text-gray-600 flex items-center justify-end">
                        车牌号
                      </div>
                      <div className="flex-1 px-4 py-3 text-sm text-gray-800">
                        {currentRecord.plateNumber}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-28 px-4 py-3 bg-gray-50 text-sm text-gray-600 flex items-center justify-end">
                        手机号
                      </div>
                      <div className="flex-1 px-4 py-3 text-sm text-gray-800">
                        {currentRecord.phoneNumber}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-28 px-4 py-3 bg-gray-50 text-sm text-gray-600 flex items-center justify-end">
                        申请时间
                      </div>
                      <div className="flex-1 px-4 py-3 text-sm text-gray-800">
                        {currentRecord.applyTime}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-28 px-4 py-3 bg-gray-50 text-sm text-gray-600 flex items-center justify-end">
                        状态
                      </div>
                      <div className="flex-1 px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusClass(currentRecord.status)}`}>
                          {currentRecord.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-28 px-4 py-3 bg-gray-50 text-sm text-gray-600 flex items-center justify-end">
                        申请原因
                      </div>
                      <div className="flex-1 px-4 py-3 text-sm text-gray-800">
                        {currentRecord.reason}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-4">
                  <div className="relative pl-8">
                    {/* Timeline */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300" style={{ left: '11px' }}></div>

                    {/* Step 1: 已发起 */}
                    <div className="relative mb-8">
                      <div className="absolute -left-8 w-6 h-6 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200 flex items-center justify-center text-xs font-medium">
                        已发起
                      </div>
                      <div className="pt-1">
                        <div className="text-sm text-gray-500 mb-1">{currentRecord.phoneNumber}</div>
                        <div className="text-sm text-gray-600">发起</div>
                      </div>
                    </div>

                    {/* Step 2: 已结束 */}
                    <div className="relative">
                      <div className="absolute -left-8 w-6 h-6 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200 flex items-center justify-center text-xs font-medium">
                        已结束
                      </div>
                      <div className="pt-1"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
