'use client'

import {useState, useEffect} from 'react'
import {useAuthGuard} from '../../../hooks/useAuthGuard'
import {Input} from '@/components/ui/input'

interface VolunteerProfile {
  id: number
  user: {
    email: string
    first_name: string
    last_name: string
    role: string
    password: string
  }
  city: {
    title: string
    zipcode: string
    lat: number
    lng: number
  }
  phone_number: string
  url_image: string
}

export default function VolunteerProfile() {
  const {user, isAuthorized, isLoading} = useAuthGuard('volunteer')
  const [profile, setProfile] = useState<VolunteerProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // État pour le formulaire
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    password: '',
    city_title: '',
    city_zipcode: '',
    phone_number: '',
    url_image: '',
  })

  // Charger le profil du volunteer
  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/volunteers/`, {
        method: 'GET',
        credentials: 'include', // Utilise automatiquement les cookies HTTP-only
      })

      if (!response.ok) {
        throw new Error('Erreur lors du chargement du profil')
      }

      let data = await response.json()
      data = data.results[0]
      console.log('Profil récupéré:', data)

      setProfile(data)

      // Pré-remplir le formulaire
      setFormData({
        first_name: data.user.first_name || '',
        last_name: data.user.last_name || '',
        password: '', // Ne pas pré-remplir le mot de passe pour la sécurité
        city_title: data.city?.title || '',
        city_zipcode: data.city?.zipcode || '',
        phone_number: data.phone_number || '',
        url_image: data.url_image || '',
      })
    } catch (err) {
      setError('Impossible de charger le profil')
      console.error('Erreur:', err)
    }
  }

  // Sauvegarder les modifications
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      if (!profile) return

      const response = await fetch(`http://localhost:8000/api/v1/volunteers/${profile.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Utilise automatiquement les cookies HTTP-only
        body: JSON.stringify({
          user: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            ...(formData.password && {password: formData.password}),
          },
          city: {
            title: formData.city_title,
            zipcode: formData.city_zipcode,
          },
          phone_number: formData.phone_number,
          url_image: formData.url_image,
        }),
      })

      const updatedData = await response.json()
      console.log('Profil mis à jour:', updatedData)

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde')
      }

      setProfile(updatedData)
      setIsEditing(false)
      setSuccess('Profil mis à jour avec succès !')
    } catch (err) {
      setError('Erreur lors de la sauvegarde')
      console.error('Erreur:', err)
    } finally {
      setSaving(false)
    }
  }

  // Gérer les changements du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
  }

  // Annuler les modifications
  const handleCancel = () => {
    if (profile) {
      setFormData({
        first_name: profile.user.first_name || '',
        last_name: profile.user.last_name || '',
        password: '', // Ne pas pré-remplir le mot de passe pour la sécurité
        city_title: profile.city?.title || '',
        city_zipcode: profile.city?.zipcode || '',
        phone_number: profile.phone_number || '',
        url_image: profile.url_image || '',
      })
    }
    setIsEditing(false)
    setError(null)
    setSuccess(null)
  }

  useEffect(() => {
    if (user && isAuthorized) {
      fetchProfile()
    }
  }, [user, isAuthorized])

  // Afficher un indicateur de chargement
  if (isLoading || !isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md">
        {/* En-tête */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Mon Profil Bénévole</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-(--secondary-color) text-white px-4 py-2 rounded-md hover:bg-(--btn-accent-bg) transition"
              >
                ✏️ Modifier
              </button>
            ) : (
              <div className="space-x-2">
                <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-(--btn-primary-hover-bg) transition">
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-(--secondary-color) text-white px-4 py-2 rounded-md hover:bg-(--btn-accent-bg) transition disabled:opacity-50"
                >
                  {isSaving ? 'Sauvegarde...' : '💾 Sauvegarder'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">{success}</p>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSave} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations personnelles */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Informations personnelles</h2>

              <Input label="Prénom" name="first_name" value={formData.first_name} onChange={handleInputChange} disabled={!isEditing} />

              <Input label="Nom" name="last_name" value={formData.last_name} onChange={handleInputChange} disabled={!isEditing} />

              <Input
                label="Email"
                name="email"
                type="email"
                value={profile.user.email}
                onChange={() => {}} // Email non modifiable
                disabled={true}
                helpText="L'email ne peut pas être modifié"
              />

              <Input
                label="Nouveau mot de passe"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={isEditing ? 'Laissez vide pour ne pas changer' : ''}
                helpText={isEditing ? 'Laissez vide si vous ne souhaitez pas changer le mot de passe' : undefined}
              />

              <Input label="Téléphone" name="phone_number" type="tel" value={formData.phone_number} onChange={handleInputChange} disabled={!isEditing} />
            </div>

            {/* Ville et photo */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Localisation et photo</h2>

              <Input label="Ville" name="city_title" value={formData.city_title} onChange={handleInputChange} disabled={!isEditing} />

              <Input label="Code postal" name="city_zipcode" value={formData.city_zipcode} onChange={handleInputChange} disabled={!isEditing} />

              <Input label="URL de la photo" name="url_image" type="url" value={formData.url_image} onChange={handleInputChange} disabled={!isEditing} />

              {/* Aperçu de la photo */}
              {formData.url_image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aperçu de la photo</label>
                  <img
                    src={formData.url_image}
                    alt="Photo de profil"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
