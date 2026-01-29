

export type Theme = "light" | "dark";

export type ThemeState = {
    theme: Theme;
    initTheme: () => void;
    setTheme: (t: Theme) => void;
    toggleTheme: () => void;
}

// export const useThemeStore = create<ThemeState>((set) => ({
//     theme: "light",

//     initTheme: () => {
//         const saved = (localStorage.get("theme") as Theme | null) ?? "light";
//         const root = document.documentElement;

//         if (saved === "dark") root.classList.add("dark");
//         else root.classList.remove("dark");

//         set({theme: saved});
//     },

//     setTheme: (t:Theme) => {
//         const root = document.documentElement;

//         if (t === "dark") root.classList.add("dark");
//         else root.classList.remove("dark");

//         localStorage.setItem("theme", t);
//         set({theme: t});
//     },

//     toggleTheme: () => {
//         const root = document.documentElement;
//         const isDark = root.classList.toggle("dark");
//         const next: Theme = isDark ? "dark" : "light";

//         localStorage.setItem("theme", next);
//         set({theme: next})
//     },
// }))