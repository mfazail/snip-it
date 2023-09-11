import { writable } from "svelte/store";

interface AlertProp {
    id?: string;
    title: string;
    description?: string;
    variant?: "success" | "error" | "info";
}

export const alerts = writable<AlertProp[] | undefined>([]);

export const useAlert = () => {
    const show = ({ title, description, variant = "info" }: AlertProp) => {
        const id = crypto.randomUUID();
        const newAlert: AlertProp = {
            id,
            title,
            description,
            variant,
        };
        alerts.update((prev) => [...(prev ?? []), newAlert]);
        if (variant == "info" || variant == "success") {
            setTimeout(() => {
                alerts.update((prev) => prev?.filter((v) => v.id != id));
            }, 4000);
        }
    };
    const remove = (id: string) => {
        if (!id) return;
        alerts.update((prev) => prev?.filter((v) => v.id != id));
    };
    return {
        show,
        remove,
    };
};
