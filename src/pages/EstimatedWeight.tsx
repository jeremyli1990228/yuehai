import { useState } from 'react'
import { Search, RefreshCw, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface EstimatedWeightRecord {
  id: number
  orderNo: string
  plateNumber: string
  estimatedWeight: number
  status: '已核验' | '未核验'
  submitTime: string
}

const mockData: EstimatedWeightRecord[] = [
  { id: 1, orderNo: 'EW260806001', plateNumber: '粤ZYS56港', estimatedWeight: 1200, status: '已核验', submitTime: '2026-08-06 08:30:00' },
  { id: 2, orderNo: 'EW260806002', plateNumber: '粤ZZD43港', estimatedWeight: 20000, status: '未核验', submitTime: '2026-08-06 09:15:00' },
  { id: 3, orderNo: 'EW260806003', plateNumber: '粤L78872', estimatedWeight: 15000, status: '已核验', submitTime: '2026-08-06 09:45:00' },
  { id: 4, orderNo: 'EW260806004', plateNumber: '粤BCS4856', estimatedWeight: 4500, status: '未核验', submitTime: '2026-08-06 10:20:00' },
  { id: 5, orderNo: 'EW260806005', plateNumber: '粤AC54673', estimatedWeight: 3800, status: '已核验', submitTime: '2026-08-06 10:50:00' },
  { id: 6, orderNo: 'EW260806006', plateNumber: '粤BQG940', estimatedWeight: 9500, status: '未核验', submitTime: '2026-08-06 11:30:00' },
  { id: 7, orderNo: 'EW260806007', plateNumber: '粤B55MW3', estimatedWeight: 4000, status: '已核验', submitTime: '2026-08-06 12:10:00' },
  { id: 8, orderNo: 'EW260806008', plateNumber: '粤BMT611', estimatedWeight: 10500, status: '未核验', submitTime: '2026-08-06 12:45:00' },
  { id: 9, orderNo: 'EW260806009', plateNumber: '粤BHQ324', estimatedWeight: 3500, status: '已核验', submitTime: '2026-08-06 13:20:00' },
  { id: 10, orderNo: 'EW260806010', plateNumber: '粤BDU730', estimatedWeight: 3000, status: '已核验', submitTime: '2026-08-06 14:00:00' },
  { id: 11, orderNo: 'EW260805011', plateNumber: '粤BGF010', estimatedWeight: 100, status: '已核验', submitTime: '2026-08-05 23:00:00' },
  { id: 12, orderNo: 'EW260805012', plateNumber: '粤BEC272', estimatedWeight: 6000, status: '已核验', submitTime: '2026-08-05 22:30:00' },
]

export default function EstimatedWeight() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total] = useState(156)
  const [plateFilter, setPlateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<EstimatedWeightRecord | null>(null)
  const [formPlateNumber, setFormPlateNumber] = useState('')
  const [formEstimatedWeight, setFormEstimatedWeight] = useState('')
  const [dataList, setDataList] = useState<EstimatedWeightRecord[]>(mockData)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  const getStatusClass = (status: string) => {
    switch (status) {
      case '已核验':
        return 'bg-green-50 text-green-600 border border-green-200'
      case '未核验':
        return 'bg-orange-50 text-orange-500 border border-orange-200'
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200'
    }
  }

  const handleAdd = () => {
    setEditingRecord(null)
    setFormPlateNumber('')
    setFormEstimatedWeight('')
    setModalOpen(true)
  }

  const handleEdit = (record: EstimatedWeightRecord) => {
    if (record.status === '已核验') {
      setMessage({ type: 'error', text: '该记录已核验，无法编辑' })
      setTimeout(() => setMessage(null), 3000)
      return
    }
    setEditingRecord(record)
    setFormPlateNumber(record.plateNumber)
    setFormEstimatedWeight(String(record.estimatedWeight))
    setModalOpen(true)
  }

  const handleConfirm = () => {
    if (!formPlateNumber.trim() || !formEstimatedWeight.trim()) {
      return
    }
    const weight = Number(formEstimatedWeight)
    if (editingRecord) {
      setDataList(prev =>
        prev.map(item =>
          item.id === editingRecord.id
            ? { ...item, plateNumber: formPlateNumber.trim(), estimatedWeight: weight }
            : item
        )
      )
    } else {
      const newId = Math.max(...dataList.map(d => d.id), 0) + 1
      const now = new Date()
      const pad = (n: number) => String(n).padStart(2, '0')
      const submitTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
      setDataList(prev => [
        {
          id: newId,
          orderNo: `EW${now.getFullYear().toString().slice(-2)}${pad(now.getMonth() + 1)}${pad(now.getDate())}${String(newId).padStart(3, '0')}`,
          plateNumber: formPlateNumber.trim(),
          estimatedWeight: weight,
          status: '未核验',
          submitTime,
        },
        ...prev,
      ])
    }
    setModalOpen(false)
  }

  const filteredList = dataList.filter(item => {
    if (plateFilter && !item.plateNumber.includes(plateFilter.trim())) return false
    if (statusFilter && item.status !== statusFilter) return false
    if (startDate) {
      const itemDate = item.submitTime.substring(0, 10)
      if (itemDate < startDate) return false
    }
    if (endDate) {
      const itemDate = item.submitTime.substring(0, 10)
      if (itemDate > endDate) return false
    }
    return true
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">预计重量</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          <span>新增</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">车牌号</label>
            <input
              type="text"
              value={plateFilter}
              onChange={(e) => setPlateFilter(e.target.value)}
              placeholder="请输入"
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">状态</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择</option>
              <option value="已核验">已核验</option>
              <option value="未核验">未核验</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">提交时间</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1.5 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-400">至</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1.5 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 flex justify-end gap-2">
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center gap-1">
              <Search size={14} />
              <span>查询</span>
            </button>
            <button
              onClick={() => { setPlateFilter(''); setStatusFilter(''); setStartDate(''); setEndDate('') }}
              className="px-4 py-1.5 bg-white border border-gray-300 text-gray-600 rounded text-sm hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              <RefreshCw size={14} />
              <span>重置</span>
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div className={`rounded-lg border px-4 py-3 mb-4 text-sm ${message.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-600'}`}>
          {message.text}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">序号</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">单号<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">车牌号<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">预估重量<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">状态<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">提交时间<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((row, idx) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.orderNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.plateNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.estimatedWeight.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-xs ${getStatusClass(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.submitTime}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(row)}
                      className={`text-sm ${row.status === '已核验' ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:text-blue-600'}`}
                    >
                      编辑
                    </button>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-400">
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <span className="text-sm text-gray-500">共 {total.toLocaleString()} 条</span>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled={currentPage === 1}>
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 bg-blue-600 text-white rounded text-sm">1</button>
            <button className="w-8 h-8 text-gray-600 rounded text-sm hover:bg-gray-100">2</button>
            <button className="w-8 h-8 text-gray-600 rounded text-sm hover:bg-gray-100">3</button>
            <button className="text-gray-400 text-sm">...</button>
            <button className="w-8 h-8 text-gray-600 rounded text-sm hover:bg-gray-100">8</button>
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-white rounded-lg shadow-lg w-[480px] max-w-[90vw]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-800">
                {editingRecord ? '编辑' : '新增'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-6 space-y-5">
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600 w-24 flex-shrink-0">
                  <span className="text-red-500 mr-1">*</span>车牌号
                </label>
                <input
                  type="text"
                  value={formPlateNumber}
                  onChange={(e) => setFormPlateNumber(e.target.value)}
                  placeholder="请输入车牌号"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600 w-24 flex-shrink-0">
                  <span className="text-red-500 mr-1">*</span>预估重量
                </label>
                <input
                  type="text"
                  value={formEstimatedWeight}
                  onChange={(e) => setFormEstimatedWeight(e.target.value.replace(/[^0-9.]/g, ''))}
                  placeholder="请输入预估重量"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-1.5 bg-white border border-gray-300 text-gray-600 rounded text-sm hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleConfirm}
                className="px-5 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
