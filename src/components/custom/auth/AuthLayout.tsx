interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container border border-orange-200 rounded-xl relative min-h-[60vh] flex-col items-center justify-center grid w-[70vw] lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-gray-600 lg:flex dark:border-r">
        <div className="absolute inset-0 bg-orange-500/20" />
        <div
          className="absolute rounded-xl inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://img.freepik.com/premium-vector/asian-food-traditional-restaurants-cooking-menu-vector-illustration_629712-293.jpg?semt=ais_hybrid)`,
            backgroundPosition: "center 40%",
            width: "100%",
            height: "100%",
          }}
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
          Recipe Share
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Cooking is like love. It should be entered into with abandon or
              not at all."
            </p>
            <footer className="text-sm">Harriet Van Horne</footer>
          </blockquote>
        </div>
      </div>
      <div className=" w-full h-full">
        <div className=" flex w-full h-full flex-col justify-center  ">
          {children}
        </div>
      </div>
    </div>
  );
}
