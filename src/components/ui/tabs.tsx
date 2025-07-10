import {TabType} from '@/types'

interface TabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function Tabs({activeTab, onTabChange}: TabsProps) {
  return (
    <div className="flex mb-6 border-b border-gray-200">
      <button
        onClick={() => onTabChange('future')}
        className={`px-4 py-2 font-medium ${activeTab === 'future' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
      >
        Prochains rendez-vous
      </button>
      <button
        onClick={() => onTabChange('past')}
        className={`px-4 py-2 font-medium ml-4 ${activeTab === 'past' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
      >
        Rendez-vous passés
      </button>
    </div>
  )
}
