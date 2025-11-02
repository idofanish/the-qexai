// app/lib/getFooterData.ts
import footerData from '../data/footerData.json'; // path to your JSON file
export async function getFooterData() {
  // Optional: simulate revalidate in server-side rendering
  return footerData;
}