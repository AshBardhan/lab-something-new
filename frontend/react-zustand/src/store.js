import { create } from "zustand";
import { nanoid } from "nanoid";

export const usePersonStore = create((set) => ({
  person: {
    firstName: "John",
    lastName: "Doe",
  },
  setFirstName: (firstName) =>
    set((state) => ({
      person: { ...state.person, firstName },
    })),
  setLastName: (lastName) =>
    set((state) => ({
      person: { ...state.person, lastName },
    })),
}));

export const useFormStore = create((set) => ({
  form: {
    title: "Untitled Form",
    theme: "light",
    fields: [],
  },

  updateForm: (key, value) => {
    set((state) => ({
      form: {
        ...state.form,
        [key]: value,
      },
    }));
  },

  addField: () => {
    const id = nanoid();
    const newField = { id, label: "New Field" };

    set((state) => ({
      form: {
        ...state.form,
        fields: [...state.form.fields, newField],
      },
    }));
  },

  updateFieldLabel: (id, label) => {
    set((state) => ({
      form: {
        ...state.form,
        fields: state.form.fields.map((f) =>
          f.id === id ? { ...f, label } : f,
        ),
      },
    }));
  },
}));
