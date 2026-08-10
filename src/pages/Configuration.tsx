import { useState } from 'react'
import { Settings } from 'lucide-react'

export default function Configuration() {
  const [feeAmount, setFeeAmount] = useState('50.00')
  const [autoPrint, setAutoPrint] = useState(true)
  const [approvalType, setApprovalType] = useState('none')
  const [toleranceRange, setToleranceRange] = useState('500')
  const [departurePermission, setDeparturePermission] = useState('vehicle_exit')
  const [permissionDelivery, setPermissionDelivery] = useState('approval')

  const approvalOptions = [
    { value: 'none', label: '无需审批' },
    { value: 'manager', label: '主管审批' },
    { value: 'director', label: '主管/经理审批' },
    { value: 'multi', label: '多级审批' },
  ]

  const departurePermissionOptions = [
    { value: 'temp_vehicle', label: '园区临时车权限' },
    { value: 'carrier_truck', label: '承运商&客户货车' },
    { value: 'loading_unloading', label: '装卸货权限（能进不能出）' },
    { value: 'vehicle_entry', label: '车辆入园申请' },
    { value: 'vehicle_exit', label: '车辆出园申请' },
    { value: 'visitor', label: '默认访客权限' },
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
        <div className="mb-8">
          <h3 className="text-base font-medium text-gray-700 mb-4 border-l-3 border-blue-500 pl-3">
            核验配置
          </h3>
          <div className="pl-3">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-64">净重与预估重量差值范围</label>
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

        {/* 离园放行设置 */}
        <div>
          <h3 className="text-base font-medium text-gray-700 mb-4 border-l-3 border-blue-500 pl-3">
            离园放行设置
          </h3>
          <div className="space-y-6 pl-3">
            <div>
              <label className="text-sm text-gray-600 block mb-2">离园车辆通行权限设置</label>
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600 w-28">离园权限授权</label>
                <select
                  value={departurePermission}
                  onChange={(e) => setDeparturePermission(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <optgroup label="越海平湖园区">
                    {departurePermissionOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-2">权限下发方式</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="permissionDelivery"
                    value="approval"
                    checked={permissionDelivery === 'approval'}
                    onChange={() => setPermissionDelivery('approval')}
                    className="w-4 h-4 text-blue-600 accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">审核通过后下发</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="permissionDelivery"
                    value="time"
                    checked={permissionDelivery === 'time'}
                    onChange={() => setPermissionDelivery('time')}
                    className="w-4 h-4 text-blue-600 accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">出行时间后下发（需先审批通过）</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
