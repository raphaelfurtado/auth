"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RoleGateProps {
    children: React.ReactNode;
    allowerRole: UserRole;
}

export const RoleGate = ({
    children,
    allowerRole
}: RoleGateProps) => {

    const role = useCurrentRole();

    if (role !== allowerRole) {
        return (
            <FormError message="Você não tem permissão para ver este conteúdo!" />
        );
    }

    return (
        <>
            {children}
        </>
    )

}