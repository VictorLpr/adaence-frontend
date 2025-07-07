'use client'

import Link from 'next/link'
import {useState} from 'react'
import {House, Accessibility, BookOpen, HandHelping, Menu, X} from 'lucide-react'
import {usePathname} from 'next/navigation'
import '../../../styles/navbar.css'

export default function VolunteerNavbar(): React.ReactElement {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const toggleMenu = (): void => setMenuOpen(!menuOpen)
  const closeMenu = (): void => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-title">
        🍵Time<span>Well</span>Spent
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
          <Link href="/volunteer/guide" onClick={closeMenu} className={pathname === '/volunteer/guide' ? 'disabled' : ''}>
            <BookOpen /> Guide du partage
          </Link>
        </li>
        <li className="don-mobile">
          <div className="don">
            <Link href="/don">Faire un don 🫶 </Link>
          </div>
        </li>
      </ul>

      <div className="don-desktop">
        <div className="don">
          <Link href="/don">Faire un don 🫶 </Link>
        </div>
      </div>
    </nav>
  )
}
