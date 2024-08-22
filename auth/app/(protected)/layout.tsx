import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
        from-sky-400 to-blue-800 p-4 md:p-8 lg:p-16">
            <Navbar />
            <div className="flex-grow w-full flex flex-col items-center justify-center gap-y-6 md:gap-y-8">
                {children}
            </div>
        </div>
    );
}

export default ProtectedLayout;
