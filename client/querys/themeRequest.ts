
export const getTheme = () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
        return theme;
    }
}
export const setTheme = (theme: string) => {
    return localStorage.setItem('theme', theme);
}
export const toggleTheme = () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        // return newTheme;
    }
    // return 'light';
}