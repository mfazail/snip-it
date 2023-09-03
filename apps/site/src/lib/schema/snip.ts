import {
    string,
    required,
    object,
    parse,
    type Input,
    type ValiError,
} from "valibot";

export const SnipSchema = required(
    object(
        {
            user_id: string("user id should be string"),
            prefix: string("prefix should be string"),
            body: string("body should be string"),
            description: string("description should be string"),
            lang: string("lang should be string"),
            library: string("library should be string"),
        },
        "snip should be object"
    ),
    "snip should be required"
);

export const validateSnip = (fields: Input<typeof SnipSchema>) => {
    try {
        parse(SnipSchema, fields);
    } catch (err) {
        return err as ValiError;
    }
};
