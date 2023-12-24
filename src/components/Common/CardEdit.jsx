import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContexts";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { ReactComponent as ServiceIcon } from "../../assets/images/service.svg";
import { ReactComponent as UserSvg } from "../../assets/images/tag-user.svg";
import dayjs from "dayjs";
import { Switch } from "antd";
import Aside from "./Aside";
import Select from "./FormComponents/Select";

const CardEdit = ({
  general,
  title,
  switcher,
  children,
  cardCalendar,
  cardEdit,
  cardForm,
  cardClient,
  ButtonName,
  activeButton,
  onClientSelect,
  selectedServices,
  serviceEmployeeMap,
  onButtonClick,
}) => {
  const { users, setUsers } = useAuth();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/clients");
        const data = await response.json();
        setClients(data.clients);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleSelectClient = (client) => {
    onClientSelect(client);
    console.log("Выбран клиент:", client);
  };
  return (
    <>
      {cardCalendar && (
        <div className="ab-card eb-services-island">
          <h4 className="ab-sub-headline">{title}</h4>
          {selectedServices.map((service) => {
            console.log(`Услуга - ${service.id}: `, service);
            const employeeForService = serviceEmployeeMap.get(service.id);
            console.log(
              `Сотрудник для услуги ${service.id}: `,
              employeeForService?.first_name
            );
            console.log("Выбранные услуги: ", selectedServices);
            console.log("Карта сотрудников для услуг: ", serviceEmployeeMap);

            return (
              <div
                key={service.id}
                className="eb-services-island__item cursor-pointer">
                <div className="eb-services-island__service">
                  <div className="flex items-center w-full w-max-full">
                    <div
                      className="eb-island-icon mr-4 flex-shrink-0 rounded-lg"
                      style={{ width: "50px", height: "50px" }}>
                      <ServiceIcon className="ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text" />
                    </div>
                    <div className="flex-grow pr-4 overflow-hidden">
                      {service.name}
                      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs mt-1">
                        <div className="whitespace-no-wrap">
                          {service.startTime} - {service.endTime}
                        </div>
                        <div className="opacity-50 whitespace-no-wrap">
                          {service.duration} мин.
                        </div>
                        <div>
                          <div className="eb-user-avatar eb-user-avatar--single-row">
                            <span className="eb-user-avatar__title">
                              {employeeForService?.first_name || "Не выбран"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <strong className="whitespace-no-wrap">
                        {service.price_from} ₽
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <button
            onClick={() => onButtonClick("addService")}
            type="button"
            className="ab-button w-full mt-4 eb-button-dashed ab-button_md color-accent theme-outline">
            <span className="ab-button__overlay"></span>
            <span className="ab-button__content ab-button__content_md">
              <PlusOutlined style={{ color: "#ff7a00" }} />
              <span className="ab-button__text ml-1">{ButtonName}</span>
            </span>
          </button>
        </div>
      )}
      {cardClient && (
        <div className="ab-card">
          <div className="flex mb-4">
            <h4 className="ab-sub-headline mr-auto">{title}</h4>
            <button
              onClick={() => onButtonClick("addClient")}
              type="button"
              className="link-uppercase ml-4 link">
              {ButtonName}
            </button>
          </div>
          <Select
            options={clients}
            renderOption={(client) => (
              <>
                <span className="block whitespace-normal ml-3">
                  {client.first_name} {client.last_name}
                  <span className="block text-xs text-mono-400">
                    {client.phone}
                  </span>
                </span>
              </>
            )}
            getDisplayValue={(client) => client.first_name}
            filterFunction={(client, searchTerm) =>
              client.first_name.toLowerCase().includes(searchTerm.toLowerCase())
            }
            onSelect={handleSelectClient}
            prefixSvg={
              <UserSvg
                className="ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text"
                style={{ width: "30px", height: "30px" }}
              />
            }
            inputTitle={onClientSelect ? "Клиент" : "Не выбран (Анонимный)"}
            id="input-56"
          />
        </div>
      )}
      {cardEdit && (
        <section className="ab-card ab-island">
          <div role="button" className="ab-island__heading">
            <div className="ab-island__title-wrap">
              <h3 className="ab_headline ab-island__title">{general}</h3>
            </div>
            <div className="ab-island__arrow-wrap">
              <div className="whitespace-no-wrap leading-none relative inline-block rounded-lg text-xs">
                {switcher && (
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={switcher.checked}
                    onChange={switcher.onChange}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="ab-island__content-wrap">
            <div className="ab-island__content">
              <div className="grid grid-cols-1 gap-4 items-start">
                {children}
              </div>
            </div>
          </div>
        </section>
      )}
      {cardForm && (
        <section className="ab-card">
          <div className="ab-card__header ab-card__header--offset">
            <h3 className="ab_-sub-headline ab-card__title">{general}</h3>
          </div>
          {switcher && (
            <div className="ab-island__arrow-wrap">
              <div className="whitespace-no-wrap leading-none relative inline-block rounded-lg text-xs">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  checked={switcher.checked}
                  onChange={switcher.onChange}
                />
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 items-start">{children}</div>
        </section>
      )}
      {activeButton && (
        <Aside
          title={`Добавить ${
            activeButton === "addService" ? "услугу" : "клиента"
          }`}
          closeAside={() => onButtonClick(activeButton)}
          isAsideOpen={true} // Открываем Aside при активной кнопке
        />
      )}
    </>
  );
};

export default CardEdit;
