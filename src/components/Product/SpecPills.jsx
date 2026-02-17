import React from 'react'
import { Cpu, HardDrive, Palette, Monitor, Battery, Wifi } from 'lucide-react'

const SpecPills = ({ specs }) => {
  const iconMap = {
    chip: Cpu,
    ram: HardDrive,
    storage: HardDrive,
    color: Palette,
    display: Monitor,
    battery: Battery,
    connectivity: Wifi
  }

  const labelMap = {
    chip: 'Processor',
    ram: 'RAM / Memory',
    storage: 'SSD Storage',
    color: 'Finish / Color',
    display: 'Display',
    battery: 'Battery',
    connectivity: 'Connectivity'
  }

  const specOrder = ['ram', 'storage', 'color', 'chip', 'display', 'battery']

  return (
    <div className="flex flex-wrap gap-3">
      {specOrder.map((key) => {
        if (!specs[key]) return null
        const Icon = iconMap[key] || HardDrive
        return (
          <div 
            key={key}
            className="bg-gray-700/50 rounded-lg px-4 py-3 min-w-[100px]"
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-3 h-3 text-gray-500" />
              <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                {labelMap[key] || key}
              </span>
            </div>
            <span className="text-sm font-semibold text-white">
              {specs[key]}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default SpecPills