'use client'

import Link from 'next/link'
import {useState} from 'react'
import {House, Calendar, MessageCircle, Settings, Menu, X, Coffee, LogOut} from 'lucide-react'
import {usePathname} from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'
import '../../../styles/navbar.css'

export default function ElderNavbar(): React.ReactElement {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { user, logout } = useAuth()

  const toggleMenu = (): void => setMenuOpen(!menuOpen)
  const closeMenu = (): void => setMenuOpen(false)

  const handleLogout = () => {
    logout()
    closeMenu()
  }

  return (
    <nav className="navbar">
      <div className="navbar-title flex flex-row items-center text-2xl font-bold">
        <Coffee />Time<span className='text-(--secondary-color)'>Well</span>Spent
      </div>

      <button className="burger" onClick={toggleMenu}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link href="/elder/dashboard" onClick={closeMenu} className={pathname === '/elder/dashboard' ? 'disabled' : ''}>
            <House /> Mon tableau de bord
          </Link>
        </li>
        <li>
          <Link href="/elder/rencontres" onClick={closeMenu} className={pathname === '/elder/rencontres' ? 'disabled' : ''}>
            <Calendar /> Mes rencontres
          </Link>
        </li>
        <li>
          <Link href="/elder/messages" onClick={closeMenu} className={pathname === '/elder/messages' ? 'disabled' : ''}>
            <MessageCircle /> Messages
          </Link>
        </li>
        <li>
          <Link href="/elder/profil" onClick={closeMenu} className={pathname === '/elder/profil' ? 'disabled' : ''}>
            <Settings /> Mon profil
          </Link>
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
