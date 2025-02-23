'use server';

import { createClient } from "@/utils/supabase/server";
import { AboutFormValues } from "./form";
import { log } from "console";

export async function updateAboutUs(aboutUs: AboutFormValues) {
    const supabase = await createClient();
    const {error} = await supabase.from('about').upsert({id: 1, ...aboutUs});
    if (error) {
        return {succsess: false ,error: error.message};
    }
    return {success: true};
}

export async function uploadImage(file: File) {
    const supabase = await createClient();
    const {data, error} = await supabase.storage.from('images').upload(`about_us${Date.now()}.png`, file);
    console.log(data, error);
    
    if (error) {
        return {success: false, error: error.message};
    }
    const {data: imageUrl} = supabase.storage.from('images').getPublicUrl(`${data.path}`);
    console.log(imageUrl);
    
    return {success: true, imageUrl: imageUrl.publicUrl};
}