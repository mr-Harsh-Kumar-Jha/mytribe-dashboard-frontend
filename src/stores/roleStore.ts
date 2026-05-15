import { create } from 'zustand'

export type UserRole = 'sponsor' | 'organizer'

const ROLE_STORAGE_KEY = 'mytribe-active-role'

interface RoleState {
  role: UserRole
  setRole: (role: UserRole) => void
}

export const useRoleStore = create<RoleState>()((set) => {
  const stored = localStorage.getItem(ROLE_STORAGE_KEY)
  const initialRole: UserRole =
    stored === 'sponsor' || stored === 'organizer' ? stored : 'organizer'

  return {
    role: initialRole,
    setRole: (role) => {
      localStorage.setItem(ROLE_STORAGE_KEY, role)
      set({ role })
    },
  }
})
