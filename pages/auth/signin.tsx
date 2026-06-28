import Link from 'next/link'

export default function SignIn(){
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h1 className="text-lg font-semibold mb-4">Sign in</h1>
        <form method="post" action="/api/auth/signin/email" className="space-y-3">
          <input name="csrfToken" type="hidden" />
          <label className="block text-sm">Email</label>
          <input name="email" type="email" className="w-full border p-2 rounded" />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Send magic link</button>
        </form>
        <div className="mt-3 text-sm text-gray-500">You will receive a magic link by email.</div>
        <div className="mt-4 text-right"><Link href="/"><a className="text-sm text-blue-600">Back</a></Link></div>
      </div>
    </main>
  )
}
