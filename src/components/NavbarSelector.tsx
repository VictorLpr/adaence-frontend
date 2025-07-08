'use client'

import { useAuth } from '../contexts/AuthContext'
import Navbar from './navbar'
import VolunteerNavbar from '../app/volunteer/components/volunteer_navbar'
import ElderNavbar from '../app/elder/components/elder_navbar'

export default function NavbarSelector(): React.ReactElement {
  const { user, isAuthenticated, isLoading } = useAuth()

  // Pendant le chargement, afficher la navbar standard pour éviter le flash
  if (isLoading) {
    return <Navbar />
  }

  // Si l'utilisateur n'est pas connecté, afficher la navbar standard
  if (!isAuthenticated || !user) {
    return <Navbar />
  }

  // Afficher la navbar selon le type d'utilisateur
  switch (user.type) {
    case 'volunteer':
      return <VolunteerNavbar />
    case 'elder':
      return <ElderNavbar />
    default:
      return <Navbar />
  }
}
