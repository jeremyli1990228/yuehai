import { useState } from 'react'
import { Search, RefreshCw, Download, ChevronLeft, ChevronRight } from 'lucide-react'

interface DateSummaryRecord {
  id: number
  date: string
  vehicleCount: number
  totalFee: number
  printCount: number
  reprintCount: number
  totalWeight: number
}

interface VehicleSummaryRecord {
  id: number
  plateNumber: string
  weighCount: number
  totalWeight: number
  totalFee: number
  printCount: number
  reprintCount: number
}

const dateSummaryData: DateSummaryRecord[] = [
  { id: 1, date: '2026-08-06', vehicleCount: 2, totalFee: 100, printCount: 2, reprintCount: 0, totalWeight: 25160 },
  { id: 2, date: '2026-08-05', vehicleCount: 38, totalFee: 1900, printCount: 38, reprintCount: 0, totalWeight: 441860 },
  { id: 3, date: '2026-08-04', vehicleCount: 37, totalFee: 1850, printCount: 41, reprintCount: 4, totalWeight: 500480 },
  { id: 4, date: '2026-08-03', vehicleCount: 34, totalFee: 1700, printCount: 37, reprintCount: 3, totalWeight: 461590 },
  { id: 5, date: '2026-08-02', vehicleCount: 7, totalFee: 350, printCount: 7, reprintCount: 0, totalWeight: 80490 },
  { id: 6, date: '2026-08-01', vehicleCount: 69, totalFee: 3450, printCount: 74, reprintCount: 5, totalWeight: 969060 },
  { id: 7, date: '2026-07-31', vehicleCount: 91, totalFee: 4550, printCount: 93, reprintCount: 2, totalWeight: 1243860 },
  { id: 8, date: '2026-07-30', vehicleCount: 80, totalFee: 4000, printCount: 84, reprintCount: 4, totalWeight: 1137780 },
  { id: 9, date: '2026-07-29', vehicleCount: 62, totalFee: 3100, printCount: 66, reprintCount: 4, totalWeight: 846580 },
  { id: 10, date: '2026-07-28', vehicleCount: 49, totalFee: 2450, printCount: 49, reprintCount: 0, totalWeight: 630860 },
  { id: 11, date: '2026-07-27', vehicleCount: 33, totalFee: 1650, printCount: 36, reprintCount: 3, totalWeight: 437380 },
  { id: 12, date: '2026-07-25', vehicleCount: 50, totalFee: 2500, printCount: 59, reprintCount: 9, totalWeight: 726430 },
  { id: 13, date: '2026-07-24', vehicleCount: 54, totalFee: 2700, printCount: 55, reprintCount: 1, totalWeight: 739400 },
  { id: 14, date: '2026-07-23', vehicleCount: 71, totalFee: 3550, printCount: 75, reprintCount: 4, totalWeight: 864730 },
  { id: 15, date: '2026-07-22', vehicleCount: 62, totalFee: 3100, printCount: 65, reprintCount: 3, totalWeight: 796890 },
  { id: 16, date: '2026-07-21', vehicleCount: 53, totalFee: 2650, printCount: 53, reprintCount: 0, totalWeight: 684880 },
]

const vehicleSummaryData: VehicleSummaryRecord[] = [
  { id: 1, plateNumber: '黑MD2269', weighCount: 1, totalWeight: 27930, totalFee: 50, printCount: 1, reprintCount: 0 },
  { id: 2, plateNumber: '黑DC73N6', weighCount: 1, totalWeight: 3970, totalFee: 50, printCount: 1, reprintCount: 0 },
  { id: 3, plateNumber: '黑AQ9X67', weighCount: 3, totalWeight: 14500, totalFee: 150, printCount: 4, reprintCount: 1 },
  { id: 4, plateNumber: '黑AN1V33', weighCount: 1, totalWeight: 4060, totalFee: 50, printCount: 1, reprintCount: 0 },
  { id: 5, plateNumber: '黑AM8G53', weighCount: 3, totalWeight: 14560, totalFee: 150, printCount: 3, reprintCount: 0 },
  { id: 6, plateNumber: '黑A3X98T', weighCount: 3, totalWeight: 14410, totalFee: 150, printCount: 3, reprintCount: 0 },
  { id: 7, plateNumber: '鲁YC7360', weighCount: 1, totalWeight: 23880, totalFee: 50, printCount: 1, reprintCount: 0 },
  { id: 8, plateNumber: '鲁WTV376', weighCount: 2, totalWeight: 11090, totalFee: 100, printCount: 2, reprintCount: 0 },
  { id: 9, plateNumber: '鲁WMQ299', weighCount: 1, totalWeight: 5240, totalFee: 50, printCount: 1, reprintCount: 0 },
  { id: 10, plateNumber: '鲁WJC532', weighCount: 1, totalWeight: 5700, totalFee: 50, printCount: 1, reprintCount: 0 },
  { id: 11, plateNumber: '鲁WC7877', weighCount: 1, totalWeight: 6480, totalFee: 50, printCount: 1, reprintCount: 0 },
  { id: 12, plateNumber: '鲁WBD669', weighCount: 2, totalWeight: 11690, totalFee: 100, printCount: 2, reprintCount: 0 },
  { id: 13, plateNumber: '鲁VW3C37', weighCount: 7, totalWeight: 35340, totalFee: 350, printCount: 7, reprintCount: 0 },
  { id: 14, plateNumber: '鲁VL8808', weighCount: 1, totalWeight: 27550, totalFee: 50, printCount: 1, reprintCount: 0 },
  { id: 15, plateNumber: '鲁VL6638', weighCount: 1, totalWeight: 16910, totalFee: 50, printCount: 0, reprintCount: 0 },
  { id: 16, plateNumber: '鲁VF1P77', weighCount: 1, totalWeight: 5100, totalFee: 50, printCount: 1, reprintCount: 0 },
]

export default function Summary() {
  const [activeTab, setActiveTab] = useState<'date' | 'vehicle'>('date')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const total = activeTab === 'date' ? 500 : 5689

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">称重汇总</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('date')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'date'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          按日期汇总
        </button>
        <button
          onClick={() => setActiveTab('vehicle')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'vehicle'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          按车辆汇总
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">{activeTab === 'date' ? '日期' : '日期'}</label>
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
          {activeTab === 'vehicle' && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">车牌号</label>
              <input
                type="text"
                placeholder="请输入"
                className="border border-gray-300 rounded px-3 py-1.5 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
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
          {activeTab === 'date' ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">序号</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">日期<span className="text-gray-400 text-xs">⇅</span></div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">称重车辆数<span className="text-gray-400 text-xs">⇅</span></div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">总收费<span className="text-gray-400 text-xs">⇅</span></div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">打印次数<span className="text-gray-400 text-xs">⇅</span></div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">重新打印申请次数<span className="text-gray-400 text-xs">⇅</span></div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">称重总重量<span className="text-gray-400 text-xs">⇅</span></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dateSummaryData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{row.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.vehicleCount}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.totalFee}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.printCount}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.reprintCount}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.totalWeight.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">序号</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">车牌号<span className="text-gray-400 text-xs">⇅</span></div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">称重次数<span className="text-gray-400 text-xs">⇅</span></div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">称重总重量<span className="text-gray-400 text-xs">⇅</span></div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">总收费<span className="text-gray-400 text-xs">⇅</span></div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">打印次数<span className="text-gray-400 text-xs">⇅</span></div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">重新打印申请次数<span className="text-gray-400 text-xs">⇅</span></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {vehicleSummaryData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{row.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.plateNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.weighCount}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.totalWeight.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.totalFee}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.printCount}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.reprintCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
            <button className="w-8 h-8 text-gray-600 rounded text-sm hover:bg-gray-100">{activeTab === 'vehicle' ? '285' : '25'}</button>
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
