export function fromTemplate(
    template: string,
    replacements: { [key: string]: string },
    _default = "",
): string {
    return template.replace(
        /\${(.*?)}/g,
        (_, key) => replacements[key] || _default,
    );
}
