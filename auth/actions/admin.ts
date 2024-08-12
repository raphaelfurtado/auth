"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
    const role = await currentRole();

    if (role !== UserRole.ADMIN) {
        return { error: "Acesso negado!" }
    }

    return { sucess: "Acesso permitido!" }
} 