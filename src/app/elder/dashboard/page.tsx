'use client'

import { useAuthGuard } from '../../../hooks/useAuthGuard'

export default function ElderDashboard() {
  const { user, isAuthorized, isLoading } = useAuthGuard('elder')

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Bonjour {user?.name} ! 👋
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mes prochaines rencontres</h2>
          <p className="text-gray-600">Vous n'avez pas de rencontres programmées pour le moment.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <p className="text-gray-600">Aucun nouveau message.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mon profil</h2>
          <p className="text-gray-600">Gérez vos informations personnelles.</p>
        </div>
      </div>
    </div>
  )
}