import React, { useRef, useEffect, useState, useContext } from 'react';
import { ReactComponent as Close } from '../../assets/images/close.svg';
import Select from './FormComponents/Select';
import { Link } from 'react-router-dom';
import Input from './FormComponents/Input';
import { ReactComponent as ServiceSvg } from '../../assets/images/service.svg';
import { ReactComponent as EmployeeSvg } from '../../assets/images/employee.svg';
import { CalendarContext } from '../../contexts/CalendarContexts';

const Aside = ({ title, closeAside, isAsideOpen, onAddService, onSelectEmployeeForService }) => {
  const asideRef = useRef();
  const { selectedEmployeeId } = useContext(CalendarContext);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [tempIdForSelectedService, setTempIdForSelectedService] = useState(null);
  const [initialValues, setInitialValues] = useState('');
  const [currentValues, setCurrentValues] = useState('');
  const generateTempId = () => {
    return Date.now();
  };

  useEffect(() => {
    // Функция для загрузки данных услуг
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/services');
        const data = await response.json();
        const servicesArray = Object.values(data.services).flat();
        setServices(servicesArray);
        setInitialValues({
          name: data.name,
          priceFrom: data.price_from,
          priceTo: data.price_to,
          duration: data.duration,
        });
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    // Функция для загрузки данных сотрудников
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/employees');
        const data = await response.json();
        setEmployees(data.employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const employeeData = employees.find((employee) => employee.id === selectedEmployeeId);
    setSelectedEmployee(employeeData);
    console.log(employeeData);
  }, [employees, selectedEmployeeId]);

  useEffect(() => {
    setInitialValues({
      name: services?.name || '',
      priceFrom: services?.price_from || '',
      priceTo: services?.price_to || '',
      duration: services?.duration || '',
    });
    setCurrentValues({
      name: services?.name || '',
      priceFrom: services?.price_from || '',
      priceTo: services?.price_to || '',
      duration: services?.duration || '',
    });
  }, [services]);

  const handleServiceSelect = (service) => {
    const tempId = generateTempId();
    setTempIdForSelectedService(tempId);
    setSelectedService(service);
  };

  const handleSelectEmployee = (employee) => {
    if (selectedService && tempIdForSelectedService) {
      onSelectEmployeeForService(tempIdForSelectedService, employee);
    }
  };

  const handleAddService = () => {
    if (selectedService && tempIdForSelectedService) {
      console.log(`handleAddServiceClick: generated tempId = ${tempIdForSelectedService}`);
      onAddService(selectedService, tempIdForSelectedService);
      closeAside();
      console.log('tempId', tempIdForSelectedService);
      //   console.log('onAddService', onAddService(currentValues, tempId));
    }
  };

  const handleClickOutside = (event) => {
    if (asideRef.current && !asideRef.current.contains(event.target)) {
      closeAside();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <aside
      ref={asideRef}
      role="dialog"
      aria-hidden={!isAsideOpen}
      aria-label="Добавить услугу"
      className={`ab-modal is-overlay-aside ${
        isAsideOpen
          ? 'modal-transition-overlay-aside-enter-active modal-transition-overlay-aside-enter-to'
          : 'modal-transition-overlay-aside-leave-active modal-transition-overlay-aside-leave-to'
      }`}>
      <div className="ab-modal__container">
        <div role="document" className="ab-modal__dialog">
          <div className="ab-modal__header flex justify-space">
            <div className="ab-modal__title ">{title}</div>
            <button
              type="button"
              title="Закрыть"
              aria-label="Закрыть"
              tabIndex="0"
              className="ab-button ab-button_md color-default theme-ghost ab-modal__close"
              onClick={closeAside}>
              <span className="ab-button__overlay"></span>
              <span tabIndex="-1" className="ab-button__content ab-button__content_md p-2">
                <Close className="ab-icon ab-icon--size-text" />
              </span>
            </button>
          </div>
          <div className="ab-modal__body">
            <div className="ab-modal__content ab-modal__content--buttons">
              <div className="grid grid-cols-1 gap-6 items-start">
                <div className="grid grid-cols-1 gap-6 items-start">
                  <Select
                    options={services}
                    renderOption={(service) => (
                      <>
                        <span className="block whitespace-normal ml-3">
                          {service.name}
                          <span className="block text-xs text-mono-400">
                            {service.duration} мин. • {service.price_from} ₽
                          </span>
                        </span>
                      </>
                    )}
                    getDisplayValue={(service) => service.name}
                    filterFunction={(service, searchTerm) =>
                      service.name.toLowerCase().includes(searchTerm.toLowerCase())
                    }
                    prefixSvg={
                      <ServiceSvg
                        className="ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text"
                        style={{ width: '30px', height: '30px' }}
                      />
                    }
                    onSelect={(service) => {
                      console.log('Выбрана услуга:', service);
                      handleServiceSelect(service);
                      setCurrentValues({
                        name: service.name,
                        priceFrom: service.price_from,
                        priceTo: service.price_to,
                        duration: service.duration,
                      });
                    }}
                    onChange={(service) =>
                      setCurrentValues({ ...currentValues, name: service.target.value })
                    }
                    description={
                      <>
                        Для создания и редактирования услуг перейдите в раздел «
                        <Link to="settings/services">Услуги</Link>».
                      </>
                    }
                    inputTitle="Услуга"
                  />
                </div>
                {selectedService && (
                  <>
                    <Input
                      type="tel"
                      name="priceFrom"
                      autoComplete="priceFrom"
                      value={currentValues.priceFrom}
                      onChange={(e) =>
                        setCurrentValues({ ...currentValues, priceFrom: e.target.value })
                      }
                      prefix="Цена"
                      id="input-45"
                    />
                    <Input
                      type="text"
                      name="duration"
                      autoComplete="duration"
                      value={currentValues.duration}
                      onChange={(e) =>
                        setCurrentValues({ ...currentValues, duration: e.target.value })
                      }
                      prefix="Длительность"
                      id="input-46"
                    />
                  </>
                )}
                <Select
                  options={employees}
                  renderOption={(employee) => (
                    <>
                      <span className="block whitespace-normal ml-3">
                        {employee.first_name}
                        <span className="block text-xs text-mono-400">{employee.position}</span>
                      </span>
                    </>
                  )}
                  prefixSvg={
                    <EmployeeSvg
                      className="ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text"
                      style={{ width: '30px', height: '30px' }}
                    />
                  }
                  getDisplayValue={(employee) => employee.first_name}
                  filterFunction={(employee, searchTerm) =>
                    employee.first_name.toLowerCase().includes(searchTerm.toLowerCase())
                  }
                  selectedValue={selectedEmployee}
                  onSelect={(employee) => {
                    const tempId = tempIdForSelectedService;
                    console.log(`Select onSelect: tempId = ${tempId}`);
                    setSelectedEmployee(employee);
                    handleSelectEmployee(tempId, employee);
                    // handleSelectEmployee(tempId, employee); а оно вызывается здесь
                  }}
                  inputTitle="Сотрудник"
                />
              </div>
            </div>
          </div>
          <div className="ab-modal__buttons ab-button-group">
            <div className="ab-modal-buttons ab-modal-buttons--desktop">
              <button
                type="button"
                onClick={handleAddService}
                className="eb-button ab-modal-buttons__button eb-button--custom-icon eb-button--color-accent flex-grow"
                style={{
                  '--btn-bg': 'var(--c-success-rgb)',
                  '--btn-fg': 'var(--c-on-accent-rgb)',
                  '--btn-size': '3.5rem',
                  '--btn-radius': '0.625rem',
                  '--btn-icon-bg': '0.15',
                }}>
                <span className="eb-button__text">Добавить</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
