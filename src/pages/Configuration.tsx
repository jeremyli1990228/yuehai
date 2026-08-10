import { useState } from 'react'
import { Settings } from 'lucide-react'

export default function Configuration() {
  const [feeAmount, setFeeAmount] = useState('50.00')
  const [autoPrint, setAutoPrint] = useState(true)
  const [approvalType, setApprovalType] = useState('none')
  const [toleranceRange, setToleranceRange] = useState('500')

  const approvalOptions = [
    { value: 'none', label: '无需审批' },
    { value: 'manager', label: '主管审批' },
    { value: 'director', label: '主管/经理审批' },
    { value: 'multi', label: '多级审批' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">称重配置</h1>
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Settings size={16} />
          <span>修改</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">设置</h2>

        {/* 基础设置 */}
        <div className="mb-8">
          <h3 className="text-base font-medium text-gray-700 mb-4 border-l-3 border-blue-500 pl-3">
            基础设置
          </h3>
          <div className="space-y-6 pl-3">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-40">每次称重收费金额</label>
              <input
                type="text"
                value={feeAmount}
                onChange={(e) => setFeeAmount(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">元</span>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-40">自动打印</label>
              <button
                onClick={() => setAutoPrint(!autoPrint)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoPrint ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoPrint ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-500">
                {autoPrint ? '开启后，车辆称重完成则系统自动打印称重结果' : '关闭后，需手动打印称重结果'}
              </span>
            </div>
          </div>
        </div>

        {/* 打印申请流程设置 */}
        <div className="mb-8">
          <h3 className="text-base font-medium text-gray-700 mb-4 border-l-3 border-blue-500 pl-3">
            打印申请流程设置
          </h3>
          <div className="pl-3">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-40">审批流程</label>
              <select
                value={approvalType}
                onChange={(e) => setApprovalType(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {approvalOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 核验配置 */}
        <div>
          <h3 className="text-base font-medium text-gray-700 mb-4 border-l-3 border-blue-500 pl-3">
            核验配置
          </h3>
          <div className="pl-3">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-64">实际重量与预估重量差值范围</label>
              <span className="text-sm text-gray-400">±</span>
              <input
                type="text"
                value={toleranceRange}
                onChange={(e) => setToleranceRange(e.target.value.replace(/[^0-9.]/g, ''))}
                className="border border-gray-300 rounded px-3 py-1.5 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
