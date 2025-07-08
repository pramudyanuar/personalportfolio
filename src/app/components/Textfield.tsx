// Textfield.tsx
import React from 'react';
import styled from 'styled-components';

// Gabungkan tipe properti untuk input dan textarea agar komponen fleksibel
type TextfieldProps = 
  React.InputHTMLAttributes<HTMLInputElement> & 
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as?: 'input' | 'textarea'; // Prop untuk menentukan elemen yang dirender
  };

// Wrapper untuk styling garis bawah dan efek focus
const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 12px 0; // Sesuaikan margin agar cocok dengan layout form
  --accent-color: #06b6d4; // Warna cyan-500 untuk konsistensi

  /* Garis bawah tipis default */
  &:before {
    content: "";
    left: 0;
    right: 0;
    position: absolute;
    pointer-events: none;
    bottom: -1px;
    z-index: 4;
    width: 100%;
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid rgba(100, 116, 139, 0.7);
  }
  
  /* Garis bawah tebal saat focus */
  &:after {
    content: "";
    transform: scaleX(0);
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    will-change: transform;
    border-bottom: 2px solid var(--accent-color);
    left: 0;
    right: 0;
    position: absolute;
    pointer-events: none;
    bottom: -1px;
    z-index: 4;
    width: 100%;
  }

  &:focus-within:after {
    transform: scaleX(1);
  }
`;

// Styling untuk input dan textarea itu sendiri
const StyledInput = styled.input`
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0px 2px 5px rgb(35 35 35 / 30%);
  background-color: #252525;
  transition: background-color 200ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: #e8e8e8;
  font-size: 1rem;
  font-weight: 500;
  padding: 12px;
  width: 100%;
  border: none;
  resize: vertical; // Izinkan textarea di-resize vertikal

  &:focus,
  &:active {
    outline: none;
    background-color: #353535;
  }

  &::placeholder {
    transition: opacity 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    opacity: 1;
    user-select: none;
    color: rgba(255, 255, 255, 0.582);
  }
  
  &:focus::placeholder {
    opacity: 0;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    /* "Trik" untuk menimpa background-color.
       Gunakan box-shadow inset dengan warna yang sama dengan background Anda. */
    box-shadow: 0 0 0 30px #252525 inset !important;
    
    /* Ganti warna teks yang dipaksa oleh browser (biasanya hitam). */
    -webkit-text-fill-color: #e8e8e8 !important;
  }
`;

const Textfield: React.FC<TextfieldProps> = ({ ...props }) => {
  return (
    <StyledWrapper>
      {/* Menggunakan StyledInput dan melewatkan semua props.
        Prop 'as' dari styled-components akan secara dinamis mengubah
        elemen dari <input> menjadi <textarea> jika diperlukan.
      */}
      <StyledInput {...props} />
    </StyledWrapper>
  );
};

export default Textfield;