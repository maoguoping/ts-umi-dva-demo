export function setLocalStorage (key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string): any{
    let content = localStorage.getItem(key);
    if (!content) {
        return null;
    } else {
        return JSON.parse(content);
    }
}
