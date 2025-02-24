import { createClient } from "@/utils/supabase/server";
import ContactSubmissionsDataTable from "./data-table";

export default async function ContactSubmissions() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('contact_form').select('*').order('created_at', { ascending: true });
    return (
        <div>
            <h1>Contact Submissions</h1>
            <ContactSubmissionsDataTable items={data} />
        </div>
    )
}
