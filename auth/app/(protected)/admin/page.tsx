"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {

    const onServerActionClick = () => {
        admin()
            .then((data) => {
                if (data.error) {
                    toast.error(data.error)
                }

                if (data.sucess) {
                    toast.success(data.sucess)
                }
            })
    }

    const onApiRouterClick = () => {
        fetch("/api/admin")
            .then((response) => {
                if (response.ok) {
                    toast.success("Com permissão para API");
                } else {
                    toast.success("Sem permissão para API");
                }
            })
    }


    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🔑 Admin
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowerRole={UserRole.ADMIN}>
                    <FormSuccess
                        message="Você tem permissão para ver este conteúdo!"
                    />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg boder p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only API Route
                    </p>
                    <Button onClick={onApiRouterClick}>
                        Clique aqui
                    </Button>
                </div>


                <div className="flex flex-row items-center justify-between rounded-lg boder p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only server Action
                    </p>
                    <Button onClick={onServerActionClick}>
                        Clique aqui
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminPage;