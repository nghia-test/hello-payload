// collections/Likes.ts
import type { CollectionConfig } from 'payload'

export const Likes: CollectionConfig<'likes'> = {
  slug: 'likes',
  access: {
    // ✅ Anyone can read likes (e.g., for like counts)
    read: () => true,

    // ✅ Only logged-in users can create a like
    create: ({ req }) => {
      return !!req.user // user must be logged in
    },

    // ✅ Prevent anyone (even admin) from manually updating
    update: () => false,

    // ✅ Allow delete if you want users to "unlike"
    // or restrict this to their own likes only
    delete: ({ req }) => {
      if (!req.user) return false

      // Return a where clause that limits what they can delete
      return {
        user: {
          equals: req.user.id,
        },
      }
    },
  },
  admin: {
    defaultColumns: ['user', 'post'],
    hidden: true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create') {
          // prevent duplicate likes by same user
          const existing = await req.payload.find({
            collection: 'likes',
            where: {
              and: [{ user: { equals: data.user } }, { post: { equals: data.post } }],
            },
          })
          if (existing.totalDocs > 0) {
            throw new Error('You already liked this post.')
          }
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          const post = await req.payload.findByID({
            collection: 'posts',
            id: doc.post,
          })

          // Append the new like ID (avoid duplicates)
          const existingLikes = Array.isArray(post.likes) ? post.likes : []
          const updatedLikes = [...new Set([...existingLikes, doc.id])]

          // Update the post document
          await req.payload.update({
            collection: 'posts',
            id: doc.post,
            data: { likes: updatedLikes },
          })
        }
      },
    ],
  },
}
