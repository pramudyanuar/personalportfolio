import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ambil API key dari environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // Baca data dari body request
    const { name, email, message } = await request.json();

    // Validasi sederhana
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Semua field harus diisi." },
        { status: 400 }
      );
    }

    // Kirim email menggunakan Resend
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Alamat pengirim (wajib dari Resend untuk development)
      to: ["pramudyanuar@gmail.com"], // GANTI DENGAN EMAIL ANDA!
      subject: `Pesan Baru dari Portofolio - ${name}`,
      reply_to: email, // Agar saat Anda membalas, email langsung ditujukan ke pengirim
      html: `<p>You have a new message from your portfolio contact form:</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });

    return NextResponse.json({ message: "Email berhasil dikirim!", data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal mengirim email." },
      { status: 500 }
    );
  }
}
