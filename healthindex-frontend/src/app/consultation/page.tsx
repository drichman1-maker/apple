import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Consultation() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Request a Quote</span>
            </h1>
            <p className="text-xl text-gray-400">
              Tell us about your facility and we will connect you with the right equipment
            </p>
          </div>

          <form className="glass-card p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company/Facility</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
                placeholder="Your business name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Equipment Interest</label>
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00e5ff] transition-colors">
                <option value="">Select equipment type</option>
                <option value="cryotherapy">Cryotherapy</option>
                <option value="hyperbaric">Hyperbaric Oxygen</option>
                <option value="redlight">Red Light Therapy</option>
                <option value="compression">Compression Therapy</option>
                <option value="multiple">Multiple Types</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00e5ff] transition-colors resize-none"
                placeholder="Tell us about your needs..."
              />
            </div>

            <button 
              type="submit"
              className="w-full btn-neon py-4 text-lg"
            >
              Submit Request
            </button>

            <p className="text-center text-sm text-gray-500">
              We will get back to you within 24 hours
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
