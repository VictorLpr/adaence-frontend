import {Elder} from '@/types'

interface ElderCardProps {
  elder: Elder
  onTakeAppointment: (elder: Elder) => void
}

export function ElderCard({elder, onTakeAppointment}: ElderCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-sm bg-white flex flex-col justify-between">
      <div>
        <div className="flex justify-center mb-4">
          <img
            src={`http://localhost:3000${elder.image_url}`}
            alt={`${elder.user.first_name} ${elder.user.last_name}`}
            className="w-30 h-30 object-cover rounded-full border-2 border-gray-200"
          />
        </div>

        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold mb-2">
            {elder.user.first_name} {elder.user.last_name}
          </h3>
          <p className="text-gray-600 mb-1">{elder.job}</p>
          <p className="text-gray-500 text-sm">
            {elder.city.title} ({elder.city.zipcode})
          </p>
          <p className="text-gray-500 text-sm">{elder.age} ans</p>
        </div>

        {elder.description && (
          <div className="mb-4">
            <p className="text-gray-600 text-sm text-center italic">"{elder.description}"</p>
          </div>
        )}
      </div>

      <button
        onClick={() => onTakeAppointment(elder)}
        className="w-full bg-(--secondary-color) text-white py-2 px-4 rounded-lg hover:bg-(--btn-primary-hover-bg) transition"
      >
        Prendre rendez-vous
      </button>
    </div>
  )
}
