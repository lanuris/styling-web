import type { Access } from 'payload'

/** Administrative payment and catalogue data is only visible to designated users. */
export const adminOnly: Access = ({ req }) => Boolean((req.user as { isAdmin?: boolean } | null)?.isAdmin)
