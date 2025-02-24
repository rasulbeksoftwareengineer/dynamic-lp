'use client';

import { ContactForm, ContactFormValues } from "@/components/contact-form";
import { sendContactForm } from "./actions";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = async (values: ContactFormValues) => {
        const {succsess, error} = await sendContactForm(values);
        if (succsess) {
            toast({
                title: "Message sent",
            })
            setSubmitted(true);
        } else {
            toast({
                title: "Error",
                description: error,
                variant: 'destructive',
            })
        }
    }
    return <ContactForm onSubmit={handleSubmit} submitted={submitted} />;
}