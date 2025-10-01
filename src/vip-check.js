export async function isVip(clientId) {
  const url = process.env.VIP_API_URL;
  if (!url) return false;
  try {
    const res = await fetch(`${url}?clientId=${clientId}`);
    if (!res.ok) return false;
    const data = await res.json();
    return !!data.vip;
  } catch {
    return false;
  }
}
