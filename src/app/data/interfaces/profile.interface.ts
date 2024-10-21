export interface Profile {
    id: number
    username: string
    avatarUrl: string | null
    subscribersAmount: string
    firstName: string
    lastName: string
    isActive: boolean
    stack: string[]
    city: string
    description: string
}

/*export interface Profile {
    id: number
    email: string
    password: string
    name: string
    role: string
    avatar: string | null
}*/

/*
  {
    "id": 1,
    "email": "john@mail.com",
    "password": "changeme",
    "name": "Jhon",
    "role": "customer",
    "avatar": "https://i.imgur.com/LDOO4Qs.jpg",
  },*/