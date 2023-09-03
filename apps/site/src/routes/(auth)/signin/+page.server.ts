import { checkLoginFields } from "$lib/schema/signin";
import { fail, type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  signin: async ({ locals: { supabase }, request }) => {
    const data = await request.formData();
    const email = String(data.get("email"));
    const password = String(data.get("password"));
    const result = checkLoginFields({ email, password });
    if (result) {
      return fail(400, {
        email,
        error: result.message,
        cause: result.cause,
      });
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return fail(500, {
        email,
        error: error.message,
      });
    }
    throw redirect(302, "/");
  },
  signout: async ({ locals: { getSession, supabase } }) => {
    const session = await getSession();
    if (session) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return fail(500, {
          message: error.message,
        });
      }
      throw redirect(302, "/");
    }
  },
};
