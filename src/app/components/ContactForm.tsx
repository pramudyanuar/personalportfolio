'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Definisikan tipe data untuk state form
interface FormDataState {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Event handler untuk perubahan input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Event handler untuk submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Mohon lengkapi semua field.');
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Mengirim pesan...');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Pesan berhasil terkirim!', { id: toastId });
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal mengirim pesan.');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error('Terjadi kesalahan yang tidak diketahui.', { id: toastId });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Section utama dengan padding vertikal
    <section id="contact" className="w-full mx-auto py-20 sm:py-24 px-4">
      {/* Container untuk membatasi lebar form dan memusatkannya */}
      <div className="max-w-2xl mx-auto">
        <Toaster position="top-center" reverseOrder={false} />

        {/* Judul dengan teks gradien yang menarik perhatian */}
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-b from-slate-200 to-slate-400 bg-clip-text text-transparent">
          Hubungi Saya
        </h2>
        <p className="text-center text-slate-400 mb-12">
          Punya proyek atau pertanyaan? Jangan ragu untuk mengirim pesan.
        </p>
        
        {/* "Kartu" yang membungkus form dengan background dan shadow */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-2xl shadow-slate-900/60">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                Nama
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-md py-3 px-4 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-0 focus:outline-none transition-colors duration-300"
                placeholder="Nama lengkap Anda"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-md py-3 px-4 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-0 focus:outline-none transition-colors duration-300"
                placeholder="email@anda.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                Pesan
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-md py-3 px-4 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-0 focus:outline-none transition-colors duration-300"
                placeholder="Tulis pesan Anda di sini..."
                required
              ></textarea>
            </div>
            <div className="text-center pt-4">
              {/* Tombol dengan gradien dan efek hover yang lebih modern */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-10 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40"
              >
                {isLoading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;