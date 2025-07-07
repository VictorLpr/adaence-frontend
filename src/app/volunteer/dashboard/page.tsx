'use client'
import {useEffect, useState} from 'react'

interface RdvApi {
  id: number
  date: string
  elder_detail: {
    id: number
    user: {
      first_name: string
      last_name: string
    }
  }
  activity_detail: {
    id: number
    name: string
  }
}

export default function Dashboard() {
  const [appointments, setAppointments] = useState<RdvApi[]>([])
  const [loading, setLoading] = useState(true)

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
    fetchData()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes prochains rendez-vous</h1>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        (() => {
          const nextAppointments = appointments.filter((appointment) => new Date(appointment.date) > new Date())
          if (nextAppointments.length === 0) {
            return (
              <div className="text-center mt-8">
                <p className="mb-4">Aucun rendez-vous à venir.</p>
                <a href="/volunteer/visite" className="text-blue-600 underline hover:text-blue-800">
                  Voir les visites disponibles
                </a>
              </div>
            )
          }
          return (
            <ul className="flex flex-col gap-6">
              {nextAppointments.map((appointment) => {
                const dateObj = new Date(appointment.date)
                const dateStr = dateObj.toLocaleDateString()
                const heureStr = dateObj.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                const elderName = `${appointment.elder_detail.user.first_name} ${appointment.elder_detail.user.last_name}`
                return (
                  <li key={appointment.id} className="border rounded-lg p-4 shadow-sm bg-white">
                    <div className="font-semibold text-lg">{elderName}</div>
                    <div className="text-gray-600">
                      {dateStr} à {heureStr} pour {appointment.activity_detail.name}
                    </div>
                  </li>
                )
              })}
            </ul>
          )
        })()
      )}
    </div>
  )
}
