"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { SettingsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { generatedVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Não autorizado" }
    }

    const dbUser = await getUserById(user.id);

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email já cadastrado com outro usuário!" }
        }

        const verificationToken = await generatedVerificationToken(
            values.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return { success: "Verificação de email enviada!" }
    }

    if (values.password && values.newPassword && dbUser?.password) {
        const passwordsMatch = await bcrypt.compare(
            values.password,
            dbUser.password
        )

        if (!passwordsMatch) {
            return { error: "Senha incorreta!" }
        }

        const hashedPassword = await bcrypt.hash(
            values.newPassword,
            10
        );

        values.password = hashedPassword;
        values.newPassword = undefined;

    }

    if (!dbUser) {
        return { error: "Não autorizado" }
    }

    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values
        }
    });

    return { success: "Configurações atualizadas!" }
}