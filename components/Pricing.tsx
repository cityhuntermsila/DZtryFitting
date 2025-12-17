import React from 'react';

const Pricing: React.FC = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          From casual shoppers to professional fashion houses. Pay securely with CIB, Edahabia, or International Cards.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full uppercase tracking-wide">Starter</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-6">0 <span className="text-lg font-normal text-gray-500">DZD/mo</span></p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-gray-600"><i className="fa-solid fa-check text-green-500 mr-3"></i> 5 Try-ons per month</li>
            <li className="flex items-center text-gray-600"><i className="fa-solid fa-check text-green-500 mr-3"></i> Standard Quality (SD)</li>
            <li className="flex items-center text-gray-600"><i className="fa-solid fa-check text-green-500 mr-3"></i> 1 Virtual Model</li>
            <li className="flex items-center text-gray-400"><i className="fa-solid fa-xmark text-gray-300 mr-3"></i> No High-Res Downloads</li>
          </ul>
          <button className="w-full py-3 border border-brand-600 text-brand-600 font-semibold rounded-xl hover:bg-brand-50 transition-colors">
            Get Started
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-2xl p-8 border-2 border-brand-500 shadow-xl relative transform scale-105">
          <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
            POPULAR
          </div>
          <div className="mb-4">
            <span className="px-3 py-1 bg-brand-100 text-brand-700 text-xs font-semibold rounded-full uppercase tracking-wide">Fashionista</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-6">2500 <span className="text-lg font-normal text-gray-500">DZD/mo</span></p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-gray-700"><i className="fa-solid fa-check text-brand-500 mr-3"></i> Unlimited Try-ons</li>
            <li className="flex items-center text-gray-700"><i className="fa-solid fa-check text-brand-500 mr-3"></i> HD Quality Rendering</li>
            <li className="flex items-center text-gray-700"><i className="fa-solid fa-check text-brand-500 mr-3"></i> 10 Virtual Models</li>
            <li className="flex items-center text-gray-700"><i className="fa-solid fa-check text-brand-500 mr-3"></i> Download Results</li>
          </ul>
          <button className="w-full py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30">
            Subscribe Now
          </button>
        </div>

        {/* Business Plan */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded-full uppercase tracking-wide">Enterprise</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-6">Contact Us</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-gray-600"><i className="fa-solid fa-check text-purple-500 mr-3"></i> API Access</li>
            <li className="flex items-center text-gray-600"><i className="fa-solid fa-check text-purple-500 mr-3"></i> White-label Solution</li>
            <li className="flex items-center text-gray-600"><i className="fa-solid fa-check text-purple-500 mr-3"></i> 4K Ultra HD</li>
            <li className="flex items-center text-gray-600"><i className="fa-solid fa-check text-purple-500 mr-3"></i> Dedicated Support</li>
          </ul>
          <button className="w-full py-3 border border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
         {/* Payment Mock Logos */}
         <div className="flex items-center gap-2 font-bold text-gray-500"><i className="fa-regular fa-credit-card"></i> CIB</div>
         <div className="flex items-center gap-2 font-bold text-gray-500"><i className="fa-brands fa-cc-visa"></i> Visa</div>
         <div className="flex items-center gap-2 font-bold text-gray-500"><i className="fa-solid fa-money-bill-wave"></i> CCP</div>
      </div>
    </div>
  );
};

export default Pricing;