import { NextResponse } from "next/server";
import { supabase } from "@backend/config/SupabaseServer";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if(code) {
    const supabase = await supabase();
    const {error} = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(
        `${request.origin}/login?error=auth_failed`
      );
    }

    return NextResponse.redirect(`${requestUrl.origin}/home`);
  }

  return NextResponse.redirect(`${requestUrl.origin}/login`);
}