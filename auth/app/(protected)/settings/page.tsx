"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {

    const onClick = () => {
        //logoutManual();
    }

    return (
        <div className="bg-white p-10 rounded-xl">
            <button onClick={onClick} type="submit">
                Sign Out
            </button>
        </div>
    );
}

export default SettingsPage;