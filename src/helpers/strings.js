const len = 95

export const truncate = (string) => {
    if (!string) return "";
    if (string.length >= len)
        return string.substring(0, len) + "..."
    else
        return string
}