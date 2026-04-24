import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { translations } from './translations'

export const useLang = create(
  persist(
    (set, get) => ({
      lang: 'es',
      t: translations.es,
      toggleLang: () => {
        const next = get().lang === 'es' ? 'en' : 'es'
        set({ lang: next, t: translations[next] })
      },
    }),
    {
      name: 'luffy-lang',
      // Only persist the language code — functions can't survive JSON serialization
      partialize: (state) => ({ lang: state.lang }),
      merge: (persisted, current) => ({
        ...current,
        lang: persisted.lang ?? 'es',
        t: translations[persisted.lang] ?? translations.es,
      }),
    }
  )
)
