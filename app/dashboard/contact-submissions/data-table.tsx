'use client';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { ContactForm } from '@/shared/types/contact-form';
import { updateContactSubmission } from './actions';
import { toast } from '@/hooks/use-toast';

type ContactSubmissionsDataTableProps = {
    items: ContactForm[] | null;
};

export default function ContactDataTable({ items }: ContactSubmissionsDataTableProps) {

    const handleCheckedChange = async (id: string, is_contacted: boolean) => {
        const { success, error } = await updateContactSubmission(id, is_contacted);
        if (success) {
            toast({
                title: 'Success',
            })
        }
        else {
            toast({
                title: 'Error',
                variant: 'destructive'
            })
        }
    }
        return (
            <div className="rounded-md border mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>First</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Contacted</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items && items.length > 0 ? (
                            items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.first_name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.message}</TableCell>
                                    <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Switch checked={item.is_contact}
                                            onCheckedChange={() => handleCheckedChange(item.id, !item.is_contact)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell className='text-center' colSpan={6}>
                                    <p>No items found</p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        );
    }
