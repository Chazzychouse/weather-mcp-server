export async function makeNwsRequest<T>(url: string): Promise<T | null> {
  const headers = {
    "User-Agent": "weather-app/1.0",
    Accept: "application/geo+json",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error fetching data from NWS:", error);
    return null;
  }
}
