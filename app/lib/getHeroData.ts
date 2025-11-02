// app/lib/getHeroData.ts
import heroData from '../data/heroData.json'; // path to your JSON file

export async function getHeroData() {
  // Optional: simulate revalidate in server-side rendering
  return heroData;
}
