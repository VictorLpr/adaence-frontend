export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: string
  password?: string
}

export interface City {
  id: number
  title: string
  zipcode: string
  lat: string
  lng: string
}

export interface Activity {
  id: number
  name: string
}

export interface Elder {
  id: number
  user: User
  job: string
  date_of_birth: string
  city: City
  description: string | null
  image_url: string | null
  phone_number: string
  age: number
}

export interface Appointment {
  id: number
  date: string
  elder_detail: Elder
  activity_detail: Activity
  volunteer_detail?: {
    id: number
    user: User
    city: City
    phone_number: string
    url_image: string
  }
}

export interface Volunteer {
  id: number
  user: User
  city: City
  phone_number: string
  url_image: string
}

export interface Message {
  type: 'success' | 'error' | 'info' | 'warning'
  text: string
}

export type TabType = 'future' | 'past'
export type LoadingSize = 'sm' | 'md' | 'lg'
export type MessageType = 'success' | 'error' | 'info' | 'warning'
