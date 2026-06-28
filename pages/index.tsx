import Link from 'next/link'
import QRCode from 'react-qr-code'

export default function Home() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const tableUrl = `${base}/table/T1` // example table code T1

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Drink Order — Demo</h1>
        <p className="text-sm text-gray-600 mb-4">Scan this QR code at the table or open the link below on your phone.</p>
        <div className="flex justify-center mb-4">
          <div className="bg-white p-2 rounded">
            <QRCode value={tableUrl} size={128} />
          </div>
        </div>
        <div className="space-y-2">
          <a className="block text-center text-blue-600" href={tableUrl}>Open table T1 (demo)</a>
          <Link href="/admin"><a className="block text-center text-sm text-gray-500">Staff / Kitchen Dashboard</a></Link>
        </div>
      </div>
    </main>
  )
}
