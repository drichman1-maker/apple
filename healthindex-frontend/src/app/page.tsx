import Hero from '@/components/Hero'
import EquipmentGrid from '@/components/EquipmentGrid'
import ComparisonSection from '@/components/ComparisonSection'
import Features from '@/components/Features'
import NewsletterSignup from '@/components/NewsletterSignup'
import { equipment } from '@/data/equipment'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white bg-grid">
      <Hero />
      <EquipmentGrid initialEquipment={equipment} />
      <ComparisonSection />
      <Features />
      <NewsletterSignup />
    </main>
  )
}
