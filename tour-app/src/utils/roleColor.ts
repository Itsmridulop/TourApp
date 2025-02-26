export const roleColor = (role?: string) => {
    switch (role) {
        case "admin":
            return "bg-blue-100 text-blue-700";
        case "user":
            return "bg-gray-100 text-gray-700";
        case "guide":
            return "bg-green-100 text-green-700";
        case "lead-guide":
            return "bg-purple-100 text-purple-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};
