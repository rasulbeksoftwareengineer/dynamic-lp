import { createClient } from "@/utils/supabase/server";
import AboutForm from "./form";

export default async function AboutPage() {
    const supabase = await createClient();
    const {data: aboutUs} = await supabase.from('about').select('*').single();
    return <AboutForm aboutUs={aboutUs} />;
}