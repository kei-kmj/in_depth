import React, {CSSProperties, ReactNode, useState} from 'react'
import './App.css'

import {createContext, memo, useContext} from 'react';

type DarkModeContextType = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
};

type ButtonProps = {
    children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const DarkModeContext = createContext<DarkModeContextType | undefined>(
    undefined
);

function Button({children, ...rest}: ButtonProps) {
    const context = useContext(DarkModeContext);

    if (!context) {
        throw new Error("Button must be used within a DarkModeProvider");
    }

    const {isDarkMode} = context;

    const style: CSSProperties = {
        padding: "5px 10px",
        color: isDarkMode ? "white" : "black",
        backgroundColor: isDarkMode ? "black" : "white",
        border: "1px solid",
        borderRadius: "5px",
        cursor: "pointer",
    }
    return (
        <button style={style} {...rest}>
            {children}
        </button>
    )
}

function ToggleButton() {
    const context = useContext(DarkModeContext);

    if (!context) {
        throw new Error("ToggleButton must be used within a DarkModeProvider");
    }

    const {toggleDarkMode} = context
    return (
        <Button onClick={toggleDarkMode}>
            Toggle Dark Mode
        </Button>
    )
}

const Header = memo(function Header() {
    const style = {
        padding: "10px 5px",
        borderBottom: "1px solid",
        marginBottom: "1px solid",
        display: "flex",
        gap: "5px",
        justifyContent: "flex-end",
    }
    return (
        <header style={style}>
            <Button>Products</Button>
            <Button>Services</Button>
            <Button>Pricing</Button>
            <ToggleButton/>
        </header>
    )
})

const Main = memo(function Main() {
    const context = useContext(DarkModeContext);

    if (!context) {
        throw new Error("Main must be used within a DarkModeProvider");
    }

    const {isDarkMode} = context;

    const style: CSSProperties = {
        color: isDarkMode ? "white" : "black",
        backgroundColor: isDarkMode ? "black" : "white",
        margin: "-8px",
        minHeight: "100vh",
        boxSizing: "border-box",
    }
    return (
        <main style={style}>
            <Header/>
            <h1>well come</h1>
        </main>
    )
})


function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => setIsDarkMode((v) => !v);

    const contextValue = {isDarkMode, toggleDarkMode};

    return (
        <DarkModeContext.Provider value={contextValue}>
            <Main/>
        </DarkModeContext.Provider>
    )
}

export default App