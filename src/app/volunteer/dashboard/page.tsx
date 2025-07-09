'use client'
import {useEffect, useState} from 'react'
import {useAuthGuard} from '../../../hooks/useAuthGuard'

interface RdvApi {
  id: number
  date: string
  elder_detail: {
    id: number
    age: number
    city: {
      id: number
      title: string
      zipcode: string
      lat: string
      lng: string
    }
    date_of_birth: string
    description: string | null
    image_url: string | null
    job: string
    phone_number: string
    user: {
      id: number
      email: string
      first_name: string
      last_name: string
      role: string
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
  const [activeTab, setActiveTab] = useState<'future' | 'past'>('future')
  const [selectedAppointment, setSelectedAppointment] = useState<RdvApi | null>(null)

  const {user, isAuthorized} = useAuthGuard('volunteer')

  if (!isAuthorized) {
    return <div>Chargement...</div>
  }

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
      <h1 className="text-2xl font-bold mb-4">Mes rendez-vous</h1>
      
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <>
          {/* Onglets */}
          <div className="flex mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('future')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'future'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Prochains rendez-vous
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 font-medium ml-4 ${
                activeTab === 'past'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Rendez-vous passés
            </button>
          </div>

          {/* Liste des rendez-vous */}
          {(() => {
            const today = new Date()
            const futureAppointments = appointments.filter((appointment) => new Date(appointment.date) > today)
            const pastAppointments = appointments.filter((appointment) => new Date(appointment.date) < today)
            const currentAppointments = activeTab === 'future' ? futureAppointments : pastAppointments

            if (currentAppointments.length === 0) {
              return (
                <div className="text-center mt-8">
                  <p className="mb-4">
                    {activeTab === 'future' ? 'Aucun rendez-vous à venir.' : 'Aucun rendez-vous passé.'}
                  </p>
                  {activeTab === 'future' && (
                    <a href="/volunteer/visite" className="text-blue-600 underline hover:text-blue-800">
                      Voir les visites disponibles
                    </a>
                  )}
                </div>
              )
            }

            return (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Liste des rendez-vous */}
                <div>
                  <ul className="flex flex-col gap-4">
                    {currentAppointments.map((appointment) => {
                      const dateObj = new Date(appointment.date)
                      const dateStr = dateObj.toLocaleDateString()
                      const heureStr = dateObj.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                      const elderName = `${appointment.elder_detail.user.first_name} ${appointment.elder_detail.user.last_name}`
                      
                      return (
                        <li 
                          key={appointment.id} 
                          className={`border rounded-lg p-4 shadow-sm bg-white cursor-pointer transition-colors hover:bg-gray-50 ${
                            selectedAppointment?.id === appointment.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => setSelectedAppointment(appointment)}
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

                {/* Détails de l'elder sélectionné */}
                <div>
                  {selectedAppointment ? (
                    <div className="border rounded-lg p-6 shadow-sm bg-white sticky top-6">
                      <h3 className="text-xl font-semibold mb-4">
                        Détails de {selectedAppointment.elder_detail.user.first_name} {selectedAppointment.elder_detail.user.last_name}
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-gray-700">Âge :</span>
                          <span className="ml-2">{selectedAppointment.elder_detail.age} ans</span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-700">Profession :</span>
                          <span className="ml-2">{selectedAppointment.elder_detail.job}</span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-700">Ville :</span>
                          <span className="ml-2">{selectedAppointment.elder_detail.city.title} ({selectedAppointment.elder_detail.city.zipcode})</span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-700">Téléphone :</span>
                          <span className="ml-2">{selectedAppointment.elder_detail.phone_number}</span>
                        </div>
                        
                        {selectedAppointment.elder_detail.description && (
                          <div>
                            <span className="font-medium text-gray-700">Description :</span>
                            <p className="mt-1 text-gray-600">{selectedAppointment.elder_detail.description}</p>
                          </div>
                        )}
                        
                        <div className="pt-4 border-t">
                          <span className="font-medium text-gray-700">Activité prévue :</span>
                          <span className="ml-2">{selectedAppointment.activity_detail.name}</span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-700">Date :</span>
                          <span className="ml-2">
                            {new Date(selectedAppointment.date).toLocaleDateString()} à {new Date(selectedAppointment.date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-6 shadow-sm bg-gray-50 text-center text-gray-500">
                      Cliquez sur un rendez-vous pour voir les détails de l'elder
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
        </>
      )}
    </div>
  )
}
