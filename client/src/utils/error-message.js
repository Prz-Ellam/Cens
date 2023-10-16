export const errorMessage = (message) => {
    let text = '';
    if (typeof message === 'object') {
        for (const value of Object.values(message)) {
            text += `${value}<br>`;
        }
    } else if (typeof message === 'string') {
        text = message;
    }
    return text;
}