import {useMemo} from 'react'
import {Appointment, TabType} from '@/types'

export function useAppointmentFiltering(appointments: Appointment[], activeTab: TabType) {
  return useMemo(() => {
    const today = new Date()

    const futureAppointments = appointments
      .filter((appointment) => new Date(appointment.date) > today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const pastAppointments = appointments
      .filter((appointment) => new Date(appointment.date) < today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return activeTab === 'future' ? futureAppointments : pastAppointments
  }, [appointments, activeTab])
}
