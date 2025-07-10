import {Activity, Elder} from '@/types'

interface AppointmentModalProps {
  elder: Elder
  activities: Activity[]
  selectedActivity: number | null
  selectedDate: string
  isBooking: boolean
  onActivityChange: (activityId: number) => void
  onDateChange: (date: string) => void
  onConfirm: () => void
  onCancel: () => void
}

export function AppointmentModal({
  elder,
  activities,
  selectedActivity,
  selectedDate,
  isBooking,
  onActivityChange,
  onDateChange,
  onConfirm,
  onCancel,
}: AppointmentModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">
          Prendre rendez-vous avec {elder.user.first_name} {elder.user.last_name}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activité</label>
            <select
              value={selectedActivity || ''}
              onChange={(e) => onActivityChange(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date et heure</label>
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition">
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={isBooking || !selectedDate || !selectedActivity}
            className="flex-1 bg-(--secondary-color) text-white py-2 px-4 rounded-lg hover:bg-(--btn-accent-bg) transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBooking ? 'Réservation...' : 'Confirmer'}
          </button>
        </div>
      </div>
    </div>
  )
}
