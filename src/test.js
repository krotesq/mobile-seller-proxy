const headers = {
  "Accept": "application/vnd.de.mobile.api+json",
  "Authorization": "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
};

async function getMobileSellerId() {
  const res = await fetch("https://services.mobile.de/seller-api/sellers", { headers });
  if (!res.ok) throw new Error(`Fehler beim Abrufen der Seller: ${res.status}`);
  const data = await res.json();

  if (!data.sellers || data.sellers.length === 0) {
    throw new Error("Kein Seller gefunden");
  }

  return data.sellers[0].mobileSellerId;
}

async function getAllAds(mobileSellerId) {
  const url = `https://services.mobile.de/seller-api/sellers/${mobileSellerId}/ads`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Fehler beim Abrufen der Inserate: ${res.status}`);
  return res.json();
}

(async () => {
  try {
    const sellerId = await getMobileSellerId();
    console.log("📦 MobileSellerId:", sellerId);

    // const adsData = await getAllAds(sellerId);
    // console.log("📢 Inserate:", JSON.stringify(adsData, null, 2));
  } catch (err) {
    console.error("❌ Fehler:", err.message);
  }
})();