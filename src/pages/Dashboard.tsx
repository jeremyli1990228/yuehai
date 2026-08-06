import { useState } from 'react'
import ReactECharts from 'echarts-for-react'

const dateOptions = ['今天', '上周', '本周', '上月', '本月', '上年', '本年']

const trendData = {
  dates: [
    '2026-07-06 00', '2026-07-06 06', '2026-07-06 12', '2026-07-06 18',
    '2026-07-11 03', '2026-07-11 09', '2026-07-11 15', '2026-07-11 21',
    '2026-07-16 06', '2026-07-16 12', '2026-07-16 18', '2026-07-16 23',
    '2026-07-21 09', '2026-07-21 14', '2026-07-21 20', '2026-07-26 02',
    '2026-07-31 08', '2026-07-31 12', '2026-07-31 18', '2026-08-05 18',
  ],
  values: [
    2, 5, 8, 6, 10, 14, 12, 9, 7, 11, 13, 8, 6, 10, 12, 9, 5, 8, 11, 14
  ]
}

const pieData = [
  { name: '4栋小米国内收货', value: 13, percentage: '1.07%', color: '#3b82f6' },
  { name: '3栋可赛尔/华强北发货', value: 2, percentage: '0.17%', color: '#10b981' },
  { name: '4栋小米国内发货', value: 28, percentage: '2.31%', color: '#f59e0b' },
  { name: '4栋6楼海外备件仓', value: 35, percentage: '2.88%', color: '#8b5cf6' },
  { name: '跨越速运4栋1楼货台', value: 6, percentage: '0.49%', color: '#ec4899' },
  { name: '3栋恒温仓', value: 5, percentage: '0.41%', color: '#06b6d4' },
  { name: '3栋飞浦系收发货', value: 2, percentage: '0.16%', color: '#84cc16' },
  { name: '5栋收货', value: 11, percentage: '0.91%', color: '#f97316' },
  { name: '3栋昕诺飞收发货', value: 15, percentage: '1.24%', color: '#6366f1' },
  { name: '5栋发货', value: 1097, percentage: '90.36%', color: '#ef4444' },
]

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState('今天')

  const barChartOption = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    xAxis: {
      type: 'category',
      data: trendData.dates,
      axisLabel: {
        rotate: 45,
        fontSize: 10,
        color: '#9ca3af'
      },
      axisLine: { lineStyle: { color: '#e5e7eb' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#9ca3af' },
      splitLine: { lineStyle: { color: '#f3f4f6' } }
    },
    series: [
      {
        name: '车辆数',
        type: 'bar',
        data: trendData.values,
        itemStyle: {
          color: '#3b82f6',
          borderRadius: [2, 2, 0, 0]
        },
        barWidth: '60%'
      }
    ]
  }

  const pieChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      show: false
    },
    series: [
      {
        name: '到访园区占比',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            formatter: '车辆总数'
          }
        },
        labelLine: { show: false },
        data: pieData.map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: item.color }
        }))
      }
    ]
  }

  const realtimeData = {
    plate: '粤L78872',
    result: 12690,
    time: '-'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">称重看板</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>称重日期</span>
          <input
            type="text"
            defaultValue="2026-07-06"
            className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span>至</span>
          <input
            type="text"
            defaultValue="2026-08-06"
            className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-1">
          {dateOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedDate(opt)}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                selectedDate === opt
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* 称重统计 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">称重统计</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-gray-800">1255</div>
              <div className="text-sm text-gray-500 mt-1">称重车辆数</div>
              <div className="flex gap-2 mt-1 text-xs">
                <span className="text-blue-500 cursor-pointer hover:underline">同比</span>
                <span className="text-blue-500 cursor-pointer hover:underline">环比</span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">16215460</div>
              <div className="text-sm text-gray-500 mt-1">称重总重量 (KG)</div>
              <div className="flex gap-2 mt-1 text-xs">
                <span className="text-blue-500 cursor-pointer hover:underline">同比</span>
                <span className="text-blue-500 cursor-pointer hover:underline">环比</span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">62750</div>
              <div className="text-sm text-gray-500 mt-1">预计总收费 (元)</div>
              <div className="flex gap-2 mt-1 text-xs">
                <span className="text-blue-500 cursor-pointer hover:underline">同比</span>
                <span className="text-blue-500 cursor-pointer hover:underline">环比</span>
              </div>
            </div>
          </div>
        </div>

        {/* 打印统计 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">打印统计</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-gray-800">1326</div>
              <div className="text-sm text-gray-500 mt-1">打印总次数</div>
              <div className="flex gap-2 mt-1 text-xs">
                <span className="text-blue-500 cursor-pointer hover:underline">同比</span>
                <span className="text-blue-500 cursor-pointer hover:underline">环比</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-700">重新打印次数: 71</div>
              <div className="text-sm text-gray-500 mt-2">不打印车辆数: 0</div>
            </div>
          </div>
        </div>

        {/* 实时称重显示 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">实时称重显示</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">车牌号: </span>
              <span className="text-lg font-bold text-blue-600">{realtimeData.plate}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">称重结果: </span>
              <span className="text-lg font-semibold text-gray-800">{realtimeData.result}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">称重时间: </span>
              <span className="text-sm text-gray-600">{realtimeData.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* 称重趋势 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-800">称重趋势</h3>
            <button className="text-sm text-blue-500 hover:text-blue-600">更多</button>
          </div>
          <ReactECharts option={barChartOption} style={{ height: 350 }} />
        </div>

        {/* 到访园区占比 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-800">到访园区占比</h3>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <ReactECharts option={pieChartOption} style={{ height: 350 }} />
            </div>
          </div>
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></span>
                <span>{item.name}</span>
                <span className="text-gray-400">({item.percentage})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
