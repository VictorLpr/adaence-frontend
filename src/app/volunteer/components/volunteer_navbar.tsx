'use client'

import Link from 'next/link'
import {useState} from 'react'
import {House, Accessibility, BookOpen, HandHelping, Menu, X, Coffee, HeartHandshake, LogOut, User} from 'lucide-react'
import {usePathname} from 'next/navigation'
import {useAuth} from '../../../contexts/AuthContext'
import '../../../styles/navbar.css'

export default function VolunteerNavbar(): React.ReactElement {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const {user, logout} = useAuth()

  const toggleMenu = (): void => setMenuOpen(!menuOpen)
  const closeMenu = (): void => setMenuOpen(false)

  const handleLogout = () => {
    logout()
    closeMenu()
  }

  return (
    <nav className="navbar">
      <div className="flex flex-row items-center text-2xl font-bold ">
        <Coffee />
        Time<span className="text-(--secondary-color)">Well</span>Spent
      </div>

      <button className="burger" onClick={toggleMenu}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link href="/volunteer/dashboard" onClick={closeMenu} className={pathname === '/volunteer/dashboard' ? 'disabled' : ''}>
            <House /> Dashboard
          </Link>
        </li>
        <li>
          <Link href="/volunteer/visite" onClick={closeMenu} className={pathname === '/volunteer/visite' ? 'disabled' : ''}>
            <Accessibility /> Je rends visite
          </Link>
        </li>
        <li>
          <Link href="/guide" onClick={closeMenu} className={pathname === '/guide' ? 'disabled' : ''}>
            <BookOpen /> Guide du partage
          </Link>
        </li>
        <li>
          <Link href="/volunteer/profile" onClick={closeMenu} className={pathname === '/volunteer/profile' ? 'disabled' : ''}>
            <User /> Mon profil
          </Link>
        </li>
        <li className="don-mobile">
          <div className="don">
            <Link href="/don">Faire un don 🫶 </Link>
          </div>
        </li>
        <li className="don-mobile">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut /> Se déconnecter
          </button>
        </li>
      </ul>

      <div className="don-desktop">
        <div className="user-info">
          <span>Bonjour, {user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut /> Se déconnecter
          </button>
        </div>
      </div>
    </nav>
  )
}
