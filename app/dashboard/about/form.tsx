"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { date, z } from "zod"

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
import { Textarea } from "@/components/ui/textarea"
import { updateAboutUs, uploadImage } from "./actions"
import { toast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import Image from "next/image"


const formSchema = z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(10).max(500),
    image_url: z.string().min(10).max(500).url(),
})

export type AboutFormValues = z.infer<typeof formSchema>

type AboutFormProps = {
    aboutUs: AboutFormValues;
}

export default function AboutForm({ aboutUs }: AboutFormProps) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: aboutUs || {
            title: '',
            description: '',
            image_url: '',
        },
    })

    async function onSubmit(values: AboutFormValues) {
        const { success, error } = await updateAboutUs(values);
        if (success) {
            toast({
                title: 'About Us Updated',
            })
        } else {
            toast({
                title: 'Error',
                description: error,
                variant: 'destructive'
            })
        }
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const {success, error, imageUrl} = await uploadImage(file);
            if (success) {
                toast({
                    title: 'Image Uploaded',
                })
                form.setValue('image_url', imageUrl!);
            }
            else {
                toast({
                    title: 'Error',
                    description: error,
                    variant: 'destructive'
                })
                
        }
    }
}

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
                                This is your public Title.
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
                                <Textarea placeholder="Description" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public description.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2">
                    <FormField
                        name="image_url"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="img url" {...field} disabled />
                                </FormControl>
                                <FormDescription>
                                    This is your public img url.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input id="picture" type="file" onChange={handleImageChange} />
                        <Image src={aboutUs.image_url} alt="About Us" width={400} height={400} className="rounded-lg object-cover" />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}