// app/lib/getHeaderData.ts
import headerData from '../data/headerData.json'; // path to your JSON file

export async function getHeaderData() {
  // Optional: simulate revalidate in server-side rendering
  return headerData;
}
