async function request<T>(url: string, data?: RequestInit): Promise<T> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  const res = await fetch(apiUrl, data);
  if (!res.ok) {
    throw await res.json();
  }
  try {
    return (await res.json()) as T;
  } catch (e) {
    return {} as T;
  }
}

export const api = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: Record<string, any>) =>
    request<T>(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
};
