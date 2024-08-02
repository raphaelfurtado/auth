"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generatedVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos!" }
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Credenciais inválidas!" }
    }

    if (!existingUser.emailVerified) {
        const verificationToke = await generatedVerificationToken(
            existingUser.email
        )

        await sendVerificationEmail(
            verificationToke.email,
            verificationToke.token
        )

        return { success: "Confimação de email enviada!" }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CallbackRouteError" || "CredentialsSignin":
                    return { error: "Credencial inválida!" }
                default:
                    return { error: "Algo errado aconteceu!" }
            }
        }

        throw error;
    }
}