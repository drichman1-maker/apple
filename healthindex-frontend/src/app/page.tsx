import Hero from '@/components/Hero'
import EquipmentGrid from '@/components/EquipmentGrid'
import ComparisonSection from '@/components/ComparisonSection'
import Features from '@/components/Features'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white bg-grid">
      <Hero />
      <EquipmentGrid />
      <ComparisonSection />
      <Features />
    </main>
  )
}