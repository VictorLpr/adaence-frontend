import {Appointment} from '@/types'

interface AppointmentListProps {
  appointments: Appointment[]
  selectedAppointment: Appointment | null
  onSelectAppointment: (appointment: Appointment) => void
}

export function AppointmentList({appointments, selectedAppointment, onSelectAppointment}: AppointmentListProps) {
  return (
    <div className="h-full max-w-100">
      <ul className="flex flex-col gap-4 h-full">
        {appointments.map((appointment) => {
          const dateObj = new Date(appointment.date)
          const dateStr = dateObj.toLocaleDateString()
          const heureStr = dateObj.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
          const elderName = `${appointment.elder_detail.user.first_name} ${appointment.elder_detail.user.last_name}`

          return (
            <li
              key={appointment.id}
              className={`border rounded-lg p-4 shadow-sm bg-white cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedAppointment?.id === appointment.id ? 'ring-2 ring-(--btn-primary-hover-bg)' : ''
              }`}
              onClick={() => onSelectAppointment(appointment)}
            >
              <div className="font-semibold text-lg">{elderName}</div>
              <div className="text-gray-600">
                {dateStr} à {heureStr} pour {appointment.activity_detail.name}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
