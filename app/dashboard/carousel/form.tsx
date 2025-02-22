"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(200),
    cta_text: z.string().min(2).max(50),
    cta_link: z.string().url().url(),
})

export type CarouselFormValues = z.infer<typeof formSchema>;

type CarouselFormProps = {
    onSubmit: (values: CarouselFormValues) => void;
    defaultValues?: CarouselFormValues;
    isEdit?: boolean;
}

export default function CarouselForm({ onSubmit, defaultValues, isEdit }: CarouselFormProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {
            title: '',
            description: '',
            cta_text: '',
            cta_link: '',
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormDescription>
                                The is the title of the carousel item.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Description" {...field} />
                            </FormControl>
                            <FormDescription>
                                The is the description of the carousel item.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        name="cta_text"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cta text</FormLabel>
                                <FormControl>
                                    <Input placeholder="Description" {...field} />
                                </FormControl>
                                <FormDescription>
                                    The is the cta text of the carousel item.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="cta_link"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cta Link</FormLabel>
                                <FormControl>
                                    <Input placeholder="cta Link" {...field} />
                                </FormControl>
                                <FormDescription>
                                    The is the cta link of the carousel item.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button type="button" variant='outline' onClick={() => router.push('/dashboard/carousel')}>Cancel</Button>
                    <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
                </div>
            </form>
        </Form>
    )
}