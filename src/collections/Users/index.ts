import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: () => true,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      access: {
        create: adminOnlyFieldAccess,
        read: adminOnlyFieldAccess,
        update: adminOnlyFieldAccess,
      },
      defaultValue: ['user'],
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'editor',
          value: 'editor',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
    },
  ],
  hooks: {
    afterLogin: [
      async ({ user, req, token }) => {
        // You can access:
        // user → the logged-in user document
        // req  → the request object
        // token → the JWT access token
        // await sendEmail({
        //   to: user.email,
        //   subject: 'Welcome back!',
        //   text: `Hi ${user.firstName || ''}, you just logged in successfully.`,
        // })
      },
    ],
  },
  timestamps: true,
}
