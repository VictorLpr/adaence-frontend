import {TabType} from '@/types'

interface EmptyStateProps {
  activeTab: TabType
}

export function EmptyState({activeTab}: EmptyStateProps) {
  return (
    <div className="text-center mt-8">
      <p className="mb-4">{activeTab === 'future' ? 'Aucun rendez-vous à venir.' : 'Aucun rendez-vous passé.'}</p>
      {activeTab === 'future' && (
        <a href="/volunteer/visite" className="text-blue-600 underline hover:text-blue-800">
          Voir les visites disponibles
        </a>
      )}
    </div>
  )
}
