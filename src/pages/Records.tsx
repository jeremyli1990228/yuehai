import { useState, useRef } from 'react'
import { Search, RefreshCw, Download, Upload, ChevronLeft, ChevronRight, X, AlertCircle } from 'lucide-react'

interface WeightRecord {
  id: number
  orderNo: string
  date: string
  area: string
  inTime: string
  outTime: string
  plateNumber: string
  status: '待复称' | '已打印'
  fee: number
  grossWeight: number | null
  emptyWeight: number | null
  netWeight: number | null
  estimatedWeight: number | null
  printCount: number
  lastPrintTime: string | null
}

const recordsData: WeightRecord[] = [
  { id: 1, orderNo: '2608060012', date: '2026-08-06', area: '5栋发货', inTime: '13:26:18', outTime: '-', plateNumber: '粤ZYS56港', status: '待复称', fee: 50, grossWeight: 9890, emptyWeight: 0, netWeight: 0, estimatedWeight: 1200, printCount: 0, lastPrintTime: null },
  { id: 2, orderNo: '2608060011', date: '2026-08-06', area: '5栋发货', inTime: '13:17:22', outTime: '-', plateNumber: '粤ZZD43港', status: '待复称', fee: 50, grossWeight: 20300, emptyWeight: 0, netWeight: 0, estimatedWeight: 20000, printCount: 0, lastPrintTime: null },
  { id: 3, orderNo: '2608060010', date: '2026-08-06', area: '3栋昕诺飞...', inTime: '13:14:35', outTime: '-', plateNumber: '粤L78872', status: '待复称', fee: 50, grossWeight: 15190, emptyWeight: 0, netWeight: 0, estimatedWeight: 15000, printCount: 0, lastPrintTime: null },
  { id: 4, orderNo: '2608060008', date: '2026-08-06', area: '3栋昕诺飞...', inTime: '12:58:19', outTime: '13:12:27', plateNumber: '粤L78872', status: '已打印', fee: 50, grossWeight: 15190, emptyWeight: 14410, netWeight: 780, estimatedWeight: 15000, printCount: 3, lastPrintTime: '2026-08-06 13:16:32' },
  { id: 5, orderNo: '2608060009', date: '2026-08-06', area: '5栋发货', inTime: '12:59:17', outTime: '-', plateNumber: '粤BCS4856', status: '待复称', fee: 50, grossWeight: 4430, emptyWeight: 0, netWeight: 0, estimatedWeight: 4500, printCount: 0, lastPrintTime: null },
  { id: 6, orderNo: '2608060005', date: '2026-08-06', area: '3栋昕诺飞...', inTime: '11:56:06', outTime: '12:55:33', plateNumber: '粤L78872', status: '已打印', fee: 50, grossWeight: 14410, emptyWeight: 12690, netWeight: 1720, estimatedWeight: 15000, printCount: 2, lastPrintTime: '2026-08-06 12:58:14' },
  { id: 7, orderNo: '2608060007', date: '2026-08-06', area: '5栋发货', inTime: '12:45:56', outTime: '-', plateNumber: '粤AC54673', status: '待复称', fee: 50, grossWeight: 3780, emptyWeight: 0, netWeight: 0, estimatedWeight: 3800, printCount: 0, lastPrintTime: null },
  { id: 8, orderNo: '2608060006', date: '2026-08-06', area: '5栋发货', inTime: '12:31:52', outTime: '-', plateNumber: '粤BQG940', status: '待复称', fee: 50, grossWeight: 9300, emptyWeight: 0, netWeight: 0, estimatedWeight: 9500, printCount: 0, lastPrintTime: null },
  { id: 9, orderNo: '2608060004', date: '2026-08-06', area: '5栋发货', inTime: '11:33:50', outTime: '-', plateNumber: '粤B55MW3', status: '待复称', fee: 50, grossWeight: 4110, emptyWeight: 0, netWeight: 0, estimatedWeight: 4000, printCount: 0, lastPrintTime: null },
  { id: 10, orderNo: '2608060003', date: '2026-08-06', area: '5栋发货', inTime: '11:27:02', outTime: '-', plateNumber: '粤BMT611', status: '待复称', fee: 50, grossWeight: 10350, emptyWeight: 0, netWeight: 0, estimatedWeight: 10500, printCount: 0, lastPrintTime: null },
  { id: 11, orderNo: '2608060002', date: '2026-08-06', area: '5栋发货', inTime: '09:56:06', outTime: '10:12:05', plateNumber: '粤BHQ324', status: '已打印', fee: 50, grossWeight: 14340, emptyWeight: 10880, netWeight: 3460, estimatedWeight: 3500, printCount: 1, lastPrintTime: '2026-08-06 10:13:00' },
  { id: 12, orderNo: '2608060001', date: '2026-08-06', area: '5栋发货', inTime: '07:54:14', outTime: '08:56:16', plateNumber: '粤BDU730', status: '已打印', fee: 50, grossWeight: 10820, emptyWeight: 7810, netWeight: 3010, estimatedWeight: 3000, printCount: 1, lastPrintTime: '2026-08-06 08:57:20' },
  { id: 13, orderNo: '2608050040', date: '2026-08-05', area: '5栋发货', inTime: '23:44:56', outTime: '23:58:58', plateNumber: '粤BGF010', status: '已打印', fee: 50, grossWeight: 9670, emptyWeight: 9630, netWeight: 40, estimatedWeight: 100, printCount: 1, lastPrintTime: '2026-08-05 23:59:00' },
  { id: 14, orderNo: '2608050039', date: '2026-08-05', area: '5栋发货', inTime: '21:36:17', outTime: '23:10:20', plateNumber: '粤BEC272', status: '已打印', fee: 50, grossWeight: 22630, emptyWeight: 16610, netWeight: 6020, estimatedWeight: 6000, printCount: 1, lastPrintTime: '2026-08-05 23:11:00' },
  { id: 15, orderNo: '2608050038', date: '2026-08-05', area: '5栋发货', inTime: '20:23:20', outTime: '21:20:06', plateNumber: '粤ZZ80港', status: '已打印', fee: 50, grossWeight: 12560, emptyWeight: 10250, netWeight: 2310, estimatedWeight: 2300, printCount: 1, lastPrintTime: '2026-08-05 21:21:00' },
  { id: 16, orderNo: '2608050034', date: '2026-08-05', area: '5栋发货', inTime: '19:12:04', outTime: '20:50:19', plateNumber: '粤ZYS56港', status: '已打印', fee: 50, grossWeight: 15190, emptyWeight: 13980, netWeight: 1210, estimatedWeight: 1200, printCount: 1, lastPrintTime: '2026-08-05 20:51:00' },
  { id: 17, orderNo: '2608050037', date: '2026-08-05', area: '5栋发货', inTime: '20:21:03', outTime: '20:49:34', plateNumber: '粤BW861D', status: '已打印', fee: 50, grossWeight: 4870, emptyWeight: 3880, netWeight: 990, estimatedWeight: 990, printCount: 1, lastPrintTime: '2026-08-05 20:50:00' },
  { id: 18, orderNo: '2608050033', date: '2026-08-05', area: '5栋发货', inTime: '19:08:53', outTime: '20:44:57', plateNumber: '粤ZYN78港', status: '已打印', fee: 50, grossWeight: 10500, emptyWeight: 9970, netWeight: 530, estimatedWeight: 500, printCount: 1, lastPrintTime: '2026-08-05 20:45:00' },
]

export default function Records() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [printModalOpen, setPrintModalOpen] = useState(false)
  const [currentPrintRecord, setCurrentPrintRecord] = useState<WeightRecord | null>(null)
  const total = 26578
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  const handlePrintClick = (record: WeightRecord) => {
    setCurrentPrintRecord(record)
    setPrintModalOpen(true)
  }

  const handlePrintConfirm = () => {
    // TODO: 实际打印逻辑
    setMessage({ type: 'success', text: `单号 ${currentPrintRecord?.orderNo} 打印成功` })
    setTimeout(() => setMessage(null), 3000)
    setPrintModalOpen(false)
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case '已打印':
        return 'bg-green-50 text-green-600 border border-green-200'
      case '待复称':
        return 'bg-orange-50 text-orange-500 border border-orange-200'
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200'
    }
  }

  const handleExport = () => {
    const headers = ['序号', '单号', '日期', '到访区域', '入厂时间', '出厂时间', '车牌号', '状态', '收费', '总重', '空重', '净重', '预估重量', '差值', '打印次数', '最后一次打印时间']
    const csvContent = [
      headers.join(','),
      ...recordsData.map((row) => {
        const diff = (row.netWeight != null && row.estimatedWeight != null) ? row.netWeight - row.estimatedWeight : ''
        return [row.id, row.orderNo, row.date, row.area, row.inTime, row.outTime, row.plateNumber, row.status, row.fee, row.grossWeight ?? '', row.emptyWeight ?? '', row.netWeight ?? '', row.estimatedWeight ?? '', diff, row.printCount, row.lastPrintTime ?? ''].join(',')
      }),
    ].join('\n')
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `称重记录_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setMessage({ type: 'success', text: `成功导出 ${recordsData.length} 条数据` })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = (event.target?.result as string) || ''
        const cleanText = text.replace(/^\uFEFF/, '')
        const lines = cleanText.split(/\r?\n/).filter(line => line.trim())
        if (lines.length <= 1) {
          setMessage({ type: 'error', text: '文件内容为空或格式不正确' })
          setTimeout(() => setMessage(null), 3000)
          return
        }
        setMessage({ type: 'success', text: `成功导入 ${lines.length - 1} 条数据` })
        setTimeout(() => setMessage(null), 3000)
      } catch {
        setMessage({ type: 'error', text: '文件解析失败，请检查文件格式' })
        setTimeout(() => setMessage(null), 3000)
      }
    }
    reader.readAsText(file, 'UTF-8')
    e.target.value = ''
  }

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
            <label className="text-sm text-gray-600">状态</label>
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">请选择</option>
              <option value="printed">已打印</option>
              <option value="pending">待复称</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">到访区域</label>
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">请选择</option>
              <option value="5">5栋发货</option>
              <option value="3">3栋昕诺飞</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">日期</label>
            <input
              type="text"
              placeholder="开始日期"
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-400">-</span>
            <input
              type="text"
              placeholder="结束日期"
              className="border border-gray-300 rounded px-3 py-1.5 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <button
              onClick={handleImport}
              className="px-4 py-1.5 bg-white border border-gray-300 text-gray-600 rounded text-sm hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              <Upload size={14} />
              <span>导入</span>
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
            >
              <Download size={14} />
              <span>导出</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
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
          <table className="w-full min-w-[1600px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">序号</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">单号<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">日期<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">到访区域</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">入厂时间<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">出厂时间<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">车牌号<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">状态<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">收费<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">总重<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">空重<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">净重<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">预估重量<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">差值<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">打印次数<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">最后一次打印时间<span className="text-gray-400 text-xs">⇅</span></div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {recordsData.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.orderNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.area}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.inTime}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.outTime}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.plateNumber}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-xs ${getStatusClass(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.fee}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.grossWeight?.toLocaleString() ?? '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.emptyWeight ?? '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.netWeight ?? '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.estimatedWeight?.toLocaleString() ?? '-'}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    {(() => {
                      if (row.netWeight == null || row.estimatedWeight == null) return <span className="text-gray-600">-</span>
                      const diff = row.netWeight - row.estimatedWeight
                      const colorClass = diff > 0 ? 'text-red-500' : diff < 0 ? 'text-green-500' : 'text-gray-600'
                      const prefix = diff > 0 ? '+' : ''
                      return <span className={colorClass}>{prefix}{diff.toLocaleString()}</span>
                    })()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.printCount}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.lastPrintTime ?? '-'}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <button
                      onClick={() => handlePrintClick(row)}
                      className="text-blue-500 hover:text-blue-600 text-sm"
                    >
                      打印
                    </button>
                  </td>
                </tr>
              ))}
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
            <button className="w-8 h-8 text-gray-600 rounded text-sm hover:bg-gray-100">4</button>
            <button className="w-8 h-8 text-gray-600 rounded text-sm hover:bg-gray-100">5</button>
            <button className="w-8 h-8 text-gray-600 rounded text-sm hover:bg-gray-100">6</button>
            <button className="text-gray-400 text-sm">...</button>
            <button className="w-8 h-8 text-gray-600 rounded text-sm hover:bg-gray-100">1329</button>
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

      {/* Print Confirm Modal */}
      {printModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[9999]"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
        >
          <div className="bg-white rounded-lg shadow-2xl w-[420px] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-medium text-gray-800">提示</h2>
              <button
                onClick={() => setPrintModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-8">
              <div className="flex flex-col items-center text-center">
                {/* Alert Icon */}
                <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                  <AlertCircle size={32} className="text-red-400" strokeWidth={2} />
                </div>
                <p className="text-sm text-gray-600">请确认是否打印？</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setPrintModalOpen(false)}
                className="px-5 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handlePrintConfirm}
                className="px-5 py-1.5 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
