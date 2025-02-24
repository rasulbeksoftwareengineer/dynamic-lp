'use server';
import { ContactFormValues } from "@/components/contact-form";
import { createClient } from "@/utils/supabase/server";

export async function sendContactForm(values: ContactFormValues) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_form").insert(values);
    if (error) {
        return {succsess: false ,error: error.message };
    }
    return {succsess: true};
}