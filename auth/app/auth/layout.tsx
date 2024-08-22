const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return(
        <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
