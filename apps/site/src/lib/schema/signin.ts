import {
    object,
    string,
    email,
    minLength,
    parse,
    type ValiError,
} from "valibot";

export const LoginSchema = object({
    email: string([email()]),
    password: string([minLength(8)]),
});

export const checkLoginFields = (fields: {
    email: string;
    password: string;
}) => {
    try {
        parse(LoginSchema, fields);
    } catch (err) {
        return err as ValiError;
    }
    return null;
};
