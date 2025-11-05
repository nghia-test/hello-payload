import type { Access } from 'payload'

import { checkRole } from '@/access/utilities'

export const adminOrOwner: Access = ({ req: { user } }) => {
  if (user && checkRole(['admin'], user)) {
    return true
  }

  if (user?.id) {
    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}
