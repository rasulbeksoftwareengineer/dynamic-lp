'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import Link from 'next/link';
import { Pencil, Trash } from 'lucide-react';
import { CarouselItem } from '@/shared/types/carousel-item.type';

import { deleteCarouselItem } from './actions';
import { useState } from 'react';

type DataTableProps = {
  items: CarouselItem[] | null;
};

export default function DataTable({ items }: DataTableProps) {
    const [deleteItem, setDeleteItem] = useState<CarouselItem | null>(null);

    const handleDelete = async () => {
      if (!deleteItem) return;
  
      const { success, error } = await deleteCarouselItem(deleteItem.id);
      if (success) {
        setDeleteItem(null);
      } else {
        console.error('Error deleting carousel item', error);
      }
    };
    return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>CTA</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items && items.length > 0 ? (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description.slice(0, 50)}...</TableCell>
                <TableCell>
                  <Link
                    href={item.cta_link}
                    target="_blank"
                    className="text-blue-500 underline hover:no-underline"
                  >
                    {item.cta_text}
                  </Link>
                </TableCell>
                <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Link href={`/dashboard/carousel/${item.id}/edit`}>
                        <Pencil />
                      </Link>
                    </Button>
                    <Button variant="destructive" onClick={() => setDeleteItem(item)}>
                      <Trash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <Table>
              <TableCell>
                <p>No items found</p>
              </TableCell>
            </Table>
          )}
        </TableBody>
      </Table>
      <AlertDialog open={Boolean(deleteItem)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your carousel item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteItem(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
