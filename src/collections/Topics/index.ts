import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Topics: CollectionConfig = {
  slug: 'topics',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Topics name',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of the topic',
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      hasMany: true,
      relationTo: 'users',
      filterOptions: () => ({
        roles: {
          in: ['admin'], // only show admin role
        },
      }),
    },
  ],
  timestamps: true,
}
