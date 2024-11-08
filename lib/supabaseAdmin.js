import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "node:path";

class SupabaseAdmin {
	constructor() {
		if (SupabaseAdmin.instance) {
			// biome-ignore lint/correctness/noConstructorReturn: <explanation>
			return SupabaseAdmin.instance;
		}

		dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

		if (!supabaseUrl || !supabaseServiceKey) {
			throw new Error("Supabase URL ou Service Key não definidas");
		}

		this.client = createClient(supabaseUrl, supabaseServiceKey);
		SupabaseAdmin.instance = this;
	}

	getClient() {
		return this.client;
	}
}

// Criamos e exportamos uma única instância
const supabaseAdmin = new SupabaseAdmin().getClient();

export { supabaseAdmin };
