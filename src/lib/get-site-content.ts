import { cache } from "react";
import { supabase } from "@/lib/supabase";
import { SITE_CONTENT_FIELDS } from "@/lib/site-content-fields";

// Hero, Visit, and other components on the same page each need this — cache()
// scopes the memoization to a single request so it's one query, not one per caller.
export const getSiteContent = cache(async (): Promise<Record<string, string>> => {
  const { data } = await supabase.from("SiteContent").select("key, value");
  const map = new Map((data ?? []).map((row) => [row.key as string, row.value as string]));

  const result: Record<string, string> = {};
  for (const field of SITE_CONTENT_FIELDS) {
    result[field.key] = map.get(field.key) ?? field.defaultValue;
  }
  return result;
});
