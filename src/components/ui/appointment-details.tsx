import {Appointment} from '@/types'

interface AppointmentDetailsProps {
  appointment: Appointment | null
}

export function AppointmentDetails({appointment}: AppointmentDetailsProps) {
  if (!appointment) {
    return (
      <></>
      // <div className="border rounded-lg p-6 shadow-sm bg-gray-50 text-center text-gray-500 h-full flex items-center justify-center">
      //   Cliquez sur un rendez-vous pour voir les détails
      // </div>
    )
  }

  return (
    <div className="border rounded-lg p-6 shadow-sm bg-white h-full">
      <h3 className="text-xl font-semibold mb-4">
        Détails de {appointment.elder_detail.user.first_name} {appointment.elder_detail.user.last_name}
      </h3>

      <div className="space-y-3">
        <div>
          <span className="font-medium text-gray-700">Âge :</span>
          <span className="ml-2">{appointment.elder_detail.age} ans</span>
        </div>

        <div>
          <span className="font-medium text-gray-700">Profession :</span>
          <span className="ml-2">{appointment.elder_detail.job}</span>
        </div>

        <div>
          <span className="font-medium text-gray-700">Ville :</span>
          <span className="ml-2">
            {appointment.elder_detail.city.title} ({appointment.elder_detail.city.zipcode})
          </span>
        </div>

        <div>
          <span className="font-medium text-gray-700">Téléphone :</span>
          <span className="ml-2">{appointment.elder_detail.phone_number}</span>
        </div>

        {appointment.elder_detail.description && (
          <div>
            <span className="font-medium text-gray-700">Description :</span>
            <p className="mt-1 text-gray-600">{appointment.elder_detail.description}</p>
          </div>
        )}

        {appointment.elder_detail.image_url && (
          <div className="flex justify-center">
            <img src={`http://localhost:3000${appointment.elder_detail.image_url}`} className="w-32 h-32 object-cover rounded-lg" alt="Photo de profil" />
          </div>
        )}

        <div className="pt-4 border-t">
          <span className="font-medium text-gray-700">Activité prévue :</span>
          <span className="ml-2">{appointment.activity_detail.name}</span>
        </div>

        <div>
          <span className="font-medium text-gray-700">Date :</span>
          <span className="ml-2">
            {new Date(appointment.date).toLocaleDateString()} à {new Date(appointment.date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
          </span>
        </div>
      </div>
    </div>
  )
}
