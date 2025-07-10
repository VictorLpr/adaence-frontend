'use client'
import {useEffect, useState} from 'react'
import {useAuthGuard} from '../../../hooks/useAuthGuard'
import {ElderCard, SearchBar, Message, AppointmentModal} from '@/components/ui'
import {Elder, Activity, Message as MessageType} from '@/types'

export default function VisitePage() {
  const [elders, setElders] = useState<Elder[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedElder, setSelectedElder] = useState<Elder | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const [message, setMessage] = useState<MessageType | null>(null)
  const [searchCity, setSearchCity] = useState('')

  const {user, isAuthorized} = useAuthGuard('volunteer')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eldersResponse = await fetch('http://localhost:8000/api/v1/elders/', {
          credentials: 'include',
        })
        const eldersData = await eldersResponse.json()
        setElders(eldersData.results)

        const activitiesResponse = await fetch('http://localhost:8000/api/v1/activities/', {
          credentials: 'include',
        })
        const activitiesData = await activitiesResponse.json()
        setActivities(activitiesData.results)

        if (activitiesData.results.length > 0) {
          setSelectedActivity(activitiesData.results[0].id)
        }

        setLoading(false)
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
        setLoading(false)
      }
    }

    if (isAuthorized) {
      fetchData()
    }
  }, [isAuthorized])

  const handleBookAppointment = async (elder: Elder) => {
    if (!selectedDate || !selectedActivity) {
      setMessage({type: 'error', text: 'Veuillez sélectionner une date et une activité'})
      return
    }

    setIsBooking(true)
    setMessage(null)

    try {
      const response = await fetch('http://localhost:8000/api/v1/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          date: new Date(selectedDate).toISOString(),
          activity: selectedActivity,
          elder: elder.id,
        }),
      })

      if (response.ok) {
        setMessage({type: 'success', text: `Rendez-vous pris avec ${elder.user.first_name} ${elder.user.last_name} !`})
        setSelectedElder(null)
        setSelectedDate('')
      } else {
        const errorData = await response.json()
        setMessage({type: 'error', text: 'Erreur lors de la prise de rendez-vous'})
      }
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({type: 'error', text: 'Erreur lors de la prise de rendez-vous'})
    } finally {
      setIsBooking(false)
    }
  }

  if (!isAuthorized || loading) {
    return <div>Chargement...</div>
  }

  return (
    <div className="p-6 flex items-center flex-col">
      <h1 className="text-3xl font-bold mb-6">Visites disponibles</h1>

      <SearchBar value={searchCity} onChange={setSearchCity} placeholder="Entrez le nom d'une ville..." label="Rechercher par ville" className="mb-6" />

      {message && (
        <Message type={message.type} className="mb-6">
          {message.text}
        </Message>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {elders
          .filter((elder) => elder.city.title.toLowerCase().includes(searchCity.toLowerCase()))
          .map((elder) => (
            <ElderCard key={elder.id} elder={elder} onTakeAppointment={setSelectedElder} />
          ))}
      </div>

      {selectedElder && (
        <AppointmentModal
          elder={selectedElder}
          activities={activities}
          selectedActivity={selectedActivity}
          selectedDate={selectedDate}
          isBooking={isBooking}
          onActivityChange={setSelectedActivity}
          onDateChange={setSelectedDate}
          onConfirm={() => handleBookAppointment(selectedElder)}
          onCancel={() => {
            setSelectedElder(null)
            setSelectedDate('')
            setMessage(null)
          }}
        />
      )}
    </div>
  )
}
