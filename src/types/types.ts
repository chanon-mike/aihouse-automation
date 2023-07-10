export type FormField = (
  | {
      label: string;
      description: null;
      type: string;
      id: string;
      required: boolean;
    }
  | {
      label: string;
      description: null;
      type?: undefined;
      id?: undefined;
      required?: undefined;
    }
)[];
