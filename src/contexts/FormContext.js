import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
    const [formState, setFormState] = useState({
        name: "",
        phone: "",
        email: "",
        employee: "",
        car: "",
        date: "",
        time: "",
        selectedServices: [],
        message: "",
        carNumber: "",
    });

    return (
        <FormContext.Provider value={{ formState, setFormState }}>
            {children}
        </FormContext.Provider>
    );
};
