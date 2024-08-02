"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generatedVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos!" }
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email já está em uso!" }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const verificationToken = await generatedVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: "Usuário criado com sucesso!" }
}