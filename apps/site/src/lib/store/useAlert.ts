import { writable } from "svelte/store";
import type { Variant } from "$lib/components/ui/alert";

interface AlertProp {
  id?: string;
  title: string;
  description?: string;
  variant?: Variant;
}

export const alerts = writable<AlertProp[] | undefined>();

export const useAlert = () => {
  const show = ({ title, description, variant = "default" }: AlertProp) => {
    const id = crypto.randomUUID();
    const newAlert: AlertProp = {
      id,
      title,
      description,
      variant,
    };
    alerts.update((prev) => [...(prev ?? []), newAlert]);
  };
  return {
    show,
  };
};
