import type { CollectionConfig } from 'payload'
import { adminOrOwner } from '@/access/adminOrOwner'

export const UserGroups: CollectionConfig = {
  slug: 'user-groups',

  access: {
    read: adminOrOwner, // any logged-in user can see groups
    create: ({ req }) =>
      req.user?.roles?.includes('admin') || req.user?.roles?.includes('editor') || false,
    update: ({ req }) =>
      req.user?.roles?.includes('admin') || req.user?.roles?.includes('editor') || false,
    delete: ({ req }) => req.user?.roles?.includes('admin') || false,
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'users', 'updatedAt'],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'users',
      label: 'Group Members',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      // filterOptions: () => ({
      //   roles: {
      //     in: ['admin', 'editor', 'user'],
      //   },
      // }),
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      defaultValue: ({ user }) => user?.id,
      admin: {
        position: 'sidebar',
        readOnly: true,
        allowEdit: false,
      },
      access: {
        create: () => false, // ✅ cannot be set manually via API
        update: () => false,
      },
    },
  ],

  timestamps: true,
}
