import type { FieldAccess } from 'payload'

import { checkRole } from '@/access/utilities'

export const editorOnlyFieldAccess: FieldAccess = ({ req: { user } }) => {
  if (user) return checkRole(['editor'], user)

  return false
}
