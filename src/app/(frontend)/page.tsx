import { redirect } from 'next/navigation'

import { defaultLocale } from '@/locales'

export default function HomeRedirect() {
  redirect(`/${defaultLocale}`)
}
