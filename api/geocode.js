export default async function handler(req, res) {
  const { q } = req.query;
  const url = `https://geocoding.geo.census.gov/geocoder/locations/address?street=${encodeURIComponent(q)}&city=Philadelphia&state=PA&benchmark=Public_AR_Current&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(data);
}
