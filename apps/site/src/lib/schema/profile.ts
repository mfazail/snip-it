import { object, string, type ValiError, parse } from "valibot";

export const ProfileSchema = object({
    username: string(),
    name: string(),
});

export const checkProfileFields = (fields: {
    username: string | null | undefined;
    name: string | null | undefined;
}) => {
    try {
        parse(ProfileSchema, fields);
    } catch (error) {
        return error as ValiError;
    }
    return null;
};
