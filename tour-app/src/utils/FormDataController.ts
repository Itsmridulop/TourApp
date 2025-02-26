export function FormDataController<T extends object>(data: T): FormData {
    const formData = new FormData();

    const appendFormData = (key: string, value: object | []) => {
        if (value instanceof File) {
            formData.append(key, value);
        } else if (Array.isArray(value)) {
            value.forEach((item) => {
                formData.append(`${key}`, item)
            });
        } else if (typeof value === 'object' && value !== null) {
            Object.entries(value).forEach(([subKey, subValue]) => {
                formData.append(key, `{${subKey}: ${subValue}}`);
            });
        } else {
            formData.append(key, String(value ?? ''));
        }
    };

    Object.entries(data).forEach(([key, value]) => appendFormData(key, value));

    return formData;
}
