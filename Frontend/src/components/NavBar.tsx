import React from "react";
import { Link } from "react-router-dom";

type NavBarProps = {
    showStartOver?: boolean;
    onStartOver?: () => void;
};

export default function NavBar({ showStartOver, onStartOver }: NavBarProps) {
    return (
        <header className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                <Link to="/">
                    <div className="flex items-center gap-2">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xl font-medium tracking-tight">Influenso</span>
                    </div>
                </Link>

                <div className="loginButton flex gap-2">
                    <Link to="/influencer">
                        <button className="group px-7 py-3.5 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2">login as influencer</button>
                    </Link>
                    <Link to="/brand">
                        <button className="group px-7 py-3.5 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2">login as brand</button>
                    </Link>
                </div>

                {showStartOver && (
                    <button
                        onClick={onStartOver}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Start Over
                    </button>
                )}
            </div>
        </header>
    );
}
