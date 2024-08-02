"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return { error: "Token não encontrado" }
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campo inválido!" }
    }

    const { password } = validatedFields.data;

    const existetingToken = await getPasswordResetTokenByToken(token);

    if (!existetingToken) {
        return { error: "Token inválido!" }
    }

    const hasExpired = new Date(existetingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token expirado!" }
    }

    const existingUser = await getUserByEmail(existetingToken.email);

    if (!existingUser) {
        return { error: "Email não existe!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword }
    });

    await db.passwordResetToken.delete({
        where: { id: existetingToken.id }
    });

    return { success: "Senha atualizada!" }
}