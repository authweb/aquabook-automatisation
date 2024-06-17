import React from 'react';
import Input from '../Common/FormComponents/Input';
import Select from '../Common/FormComponents/Select';
import { useForm } from "../../contexts/FormContext";
import { NumberInput } from '..';

const CheckoutForm = () => {
    const { formState, setFormState } = useForm();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const carOptions = [
        { id: 1, name: 'Toyota' },
        { id: 2, name: 'Honda' },
        { id: 3, name: 'Ford' },
    ];

    const handleSelectChange = (option) => {
        setFormState(prevState => ({ ...prevState, carBrand: option.name }));
    };
    return (
        <>
            <Input type='text' name='first_name' value={formState.first_name} id='79' prefix='Имя' onChange={handleChange} />
            <Input type='text' name='last_name' value={formState.last_name} id='80' prefix='Фамилия' onChange={handleChange} />
            <NumberInput type="tel" name="phone" value={formState.phone} id="81" prefix="Телефон" onChange={handleChange} />
            <Input type='email' name='email' value={formState.email} prefix='Электронная почта' onChange={handleChange} />
            <Select
                options={carOptions} renderOption={(option) => <span>{option.name}</span>} getDisplayValue={(option) => option.name} filterFunction={(option, searchTerm) => option.name.toLowerCase().includes(searchTerm.toLowerCase())} inputTitle="Марка автомобиля" onSelect={handleSelectChange} selectedValue={formState.carBrand} id="carBrandSelect"
            />
            <Input type='text' name='carModel' value={formState.carModel} prefix='Модель' onChange={handleChange} />
            <Select
                options={[
                    { id: 1, name: 'Седан' },
                    { id: 2, name: 'SUV' },
                    { id: 3, name: 'Грузовик' }
                ]}
                renderOption={(option) => <span>{option.name}</span>} getDisplayValue={(option) => option.name} filterFunction={(option, searchTerm) => option.name.toLowerCase().includes(searchTerm.toLowerCase())} inputTitle="Тип автомобиля" onSelect={(option) => setFormState(prevState => ({ ...prevState, carType: option.name }))} selectedValue={formState.carType} id="carTypeSelect"
            />
            <Input type='text' name='carNumber' value={formState.carNumber} prefix='Номер автомобиля' mask='A000AA000' onChange={handleChange} />
            <Input type='text' name='comment' value={formState.comment} prefix='Комментарий' onChange={handleChange} />
        </>
    )
}

export default CheckoutForm