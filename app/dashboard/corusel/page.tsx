import DataTable from "./data-table";
import { createClient } from '@/utils/supabase/server';

export default async function CoruselPage() {
  const supabase = await createClient();
  const { data: carouselItems } = await supabase.from('carousel_items').select('*');

  return (
    <div>
      <h3 className="text-xl font-medium mb-4">Carousel managament</h3>
      <DataTable items={carouselItems} />
    </div>
  );
}
