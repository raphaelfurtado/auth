
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
    const { data, status } = useSession({ required: true });

    return data?.user;
}