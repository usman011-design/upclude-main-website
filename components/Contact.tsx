'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', service: '', phone: '' });
  };

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Poppins' }}>
            Have Questions?{' '}
            <span className="text-green-500">Let's Talk.</span>
          </h2>
          <p className="text-gray-600 text-lg mt-4" style={{ fontFamily: 'Poppins' }}>
            We have got the answers to your questions.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2" style={{ fontFamily: 'Poppins' }}>
                Your name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
                style={{ fontFamily: 'Poppins' }}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2" style={{ fontFamily: 'Poppins' }}>
                Your email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
                style={{ fontFamily: 'Poppins' }}
                required
              />
            </div>

            {/* Service Select */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2" style={{ fontFamily: 'Poppins' }}>
                Select the service you need *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition appearance-none cursor-pointer"
                style={{ fontFamily: 'Poppins' }}
                required
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="mobile">Mobile Development</option>
                <option value="web">Web Development</option>
                <option value="design">UI/UX Design</option>
                <option value="backend">Backend Development</option>
                <option value="consulting">Consulting</option>
              </select>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2" style={{ fontFamily: 'Poppins' }}>
                Phone Number
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-semibold" style={{ fontFamily: 'Poppins' }}>
                  +92
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="XXX XXXX"
                  className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
                  style={{ fontFamily: 'Poppins' }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                style={{ fontFamily: 'Poppins' }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
