'use client'

import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {useAuth} from '../../contexts/AuthContext'

export default function Login(): React.ReactElement {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const {login, logout, isAuthenticated, user} = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Veuillez remplir tous les champs.')
      return
    }

    try {
      setLoading(true)
      const body = {
        email: email,
        password: password,
      }
      const response = await fetch(`http://localhost:8000/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      })

      const datas = {status: response.status, logInfo: await response.json()}

      if (datas.status == 401) {
        setError('Combinaison Email mot de passe invalide')
      } else if (datas.status == 200) {
        const role = datas.logInfo.user.role
        const userType = role
        const userId = datas.logInfo.user.id || 'user-id'
        const userName = datas.logInfo.user.name || datas.logInfo.user.email

        login(userType, userId, userName)

        const url = role == 'elder' ? '/elder/dashboard' : '/volunteer/dashboard'
        router.push(url)
      }
    } catch {
      setError('Échec de la connexion. Veuillez réessayer.')
    }
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg text-center">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">Déjà connecté</h1>
          <p className="mb-4 text-gray-600">
            Vous êtes déjà connecté en tant que <strong>{user.name}</strong> ({user.type === 'volunteer' ? 'Bénévole' : 'Senior'})
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                const dashboardUrl = user.type === 'volunteer' ? '/volunteer/dashboard' : '/elder/dashboard'
                router.push(dashboardUrl)
              }}
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition"
            >
              Aller au tableau de bord
            </button>
            <button onClick={logout} className="w-full rounded-md bg-gray-600 px-4 py-2 font-semibold text-white hover:bg-gray-700 transition">
              Se déconnecter et se reconnecter
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Connexion</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" className="w-full rounded-md bg-(--secondary-color) px-4 py-2 font-semibold text-white hover:bg-(--accent-color) transition">
            Se connecter
          </button>
          {loading && <div>Chargement en cours..</div>}
        </form>
      </div>
    </div>
  )
}
