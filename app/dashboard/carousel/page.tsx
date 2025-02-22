import { Button } from '@/components/ui/button';
import DataTable from './data-table';
import { createClient } from '@/utils/supabase/server';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export default async function CoruselPage() {
  const supabase = await createClient();
  const { data: carouselItems } = await supabase.from('carousel_items').select('*').order('created_at', { ascending: true });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="mb-4 text-xl font-medium">Carousel managament</h3>
        <Link href="/dashboard/carousel/create">
          <Button>
            <PlusIcon />
            Add carousel item
          </Button>
        </Link>
      </div>
      <DataTable items={carouselItems} />
    </div>
  );
}
