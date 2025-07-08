// ContactForm.tsx
'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Textfield from './Textfield'; // Impor komponen Textfield
import Button from './Button';       // <-- IMPOR KOMPONEN BUTTON BARU

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Mohon lengkapi semua field.');
      return;
    }
    setIsLoading(true);
    const toastId = toast.loading('Mengirim pesan...');
    
    try {
      // ===== UBAH BAGIAN INI =====
      // Hapus kode simulasi dan ganti dengan fetch
      const response = await fetch('/api/send', { // Asumsi API route Anda ada di /api/send
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Ambil data JSON dari respons
      const result = await response.json(); 

      if (response.ok) {
        toast.success('Pesan berhasil terkirim!', { id: toastId });
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        // Tampilkan pesan error dari API jika ada
        toast.error(result.error || 'Gagal mengirim pesan.', { id: toastId });
      }
      // ===== AKHIR PERUBAHAN =====

    } catch (error) {
      toast.error('Terjadi kesalahan saat mengirim pesan.', { id: toastId });
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <Textfield
            type="text"
            name="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Textfield
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <Textfield
          as="textarea"
          name="message"
          placeholder="Pesan"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
        />

        {/* Tombol Kirim diganti dengan komponen Button baru */}
        <div className="flex justify-center pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending..' : 'Send'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;