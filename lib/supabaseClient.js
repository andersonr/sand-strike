import { createClient } from "@supabase/supabase-js";

class SupabaseClient {
	constructor() {
		if (SupabaseClient.instance) {
			// biome-ignore lint/correctness/noConstructorReturn: <explanation>
			return SupabaseClient.instance;
		}

		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

		this.client = createClient(supabaseUrl, supabaseAnonKey);
		SupabaseClient.instance = this;
	}

	getClient() {
		return this.client;
	}
}

export const supabase = new SupabaseClient().getClient();
