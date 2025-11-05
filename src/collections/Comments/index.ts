// collections/Comments.ts
import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    create: ({ req }) => !!req.user,
    read: () => true,
  },
  admin: {
    hidden: true,
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
  ],
  timestamps: true,
}
