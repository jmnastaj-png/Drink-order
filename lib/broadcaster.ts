// Simple in-memory broadcaster for demo purposes. Replace with Pusher/Supabase in production.

type Subscriber = (data: any) => void

const subscribers = new Set<Subscriber>()

export function subscribe(fn: Subscriber){
  subscribers.add(fn)
  return () => subscribers.delete(fn)
}

export function publish(data: any){
  for(const s of subscribers) s(data)
}
