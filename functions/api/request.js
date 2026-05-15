const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
})

const required = ['name', 'email', 'flavor', 'quantity', 'area', 'message']

export async function onRequestPost({ request, env }) {
  let payload

  try {
    payload = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400)
  }

  const missing = required.filter(field => !String(payload[field] || '').trim())
  if (missing.length) return json({ ok: false, error: 'Missing required fields', missing }, 400)

  const submission = {
    ...payload,
    submittedAt: new Date().toISOString(),
    to: 'hello@puppywhippies.com',
  }

  if (!env.REQUEST_WEBHOOK_URL) return json({ ok: false, error: 'Request delivery is not configured' }, 503)

  const response = await fetch(env.REQUEST_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  })

  if (!response.ok) return json({ ok: false, error: 'Webhook rejected request' }, 502)

  return json({ ok: true })
}

export function onRequestGet() {
  return json({ ok: true, service: 'Puppy Whippies request endpoint' })
}
