'use client'
import {useEffect, useState} from 'react'
import {useAuthGuard} from '../../../hooks/useAuthGuard'
import {useAppointmentFiltering} from '../../../hooks/useAppointmentFiltering'
import {Appointment, TabType} from '@/types'
import {Tabs, AppointmentList, AppointmentDetails, EmptyState} from '@/components/ui'

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>('future')
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const {user, isAuthorized} = useAuthGuard('volunteer')
  const currentAppointments = useAppointmentFiltering(appointments, activeTab)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/v1/appointments/', {
        credentials: 'include',
      })
      const data = await response.json()
      setAppointments(data.results)
      setLoading(false)
      console.log(data.results)
    }

    if (isAuthorized) {
      fetchData()
    }
  }, [isAuthorized])

  if (!isAuthorized || loading) {
    return <div>Chargement...</div>
  }

  return (
    <div className="p-6 w-9/10">
      <h1 className="text-2xl font-bold mb-4">Mes rendez-vous</h1>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {currentAppointments.length === 0 ? (
        <EmptyState activeTab={activeTab} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          <div className="min-h-[400px]">
            <AppointmentList appointments={currentAppointments} selectedAppointment={selectedAppointment} onSelectAppointment={setSelectedAppointment} />
          </div>
          <div className="min-h-[400px]">
            <AppointmentDetails appointment={selectedAppointment} />
          </div>
        </div>
      )}
    </div>
  )
}
