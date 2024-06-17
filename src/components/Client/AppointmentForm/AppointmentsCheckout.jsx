import React from 'react';
import { useForm } from "../../../contexts/FormContext";
import ServiceDetails from './ServiceDetails';
import ProfileButton from '../../Common/FormComponents/ProfileButton';
import { CheckoutForm, PageCard, PageHorizontalLine, PageServicesList, PageSubstrate } from '../../UIComponents';
import ServiceItem from '../../Common/ServiceItem';
import TotalCost from '../../Common/TotalCost';

const AppointmentsCheckout = ({
    selectedServices,
    totalMinPrice,
    totalMaxPrice,
    formatDuration,
}) => {
    const { formState } = useForm();
    // Фильтруем выбранные услуги, чтобы оставить только те, у которых есть максимальная цена или цена "от"
    const servicesWithMaxPrice = selectedServices.filter(
        service =>
            parseFloat(service.price_to) > 0 || parseFloat(service.price_to) === 0,
    );
    return (
        <>
            <PageSubstrate className="substrate record-info-block cut-top">
                <PageCard>
                    <div className="services">
                        <PageHorizontalLine />
                        <PageServicesList className="services__list">
                            {Array.isArray(servicesWithMaxPrice) &&
                                servicesWithMaxPrice.map((service, index) => (
                                    <ServiceItem key={index} selectedServices={service} />
                                ))}
                            <PageHorizontalLine />
                        </PageServicesList>

                        <TotalCost selectedServices={formState.selectedServices} />
                    </div>
                </PageCard>
            </PageSubstrate>
            <PageSubstrate className="substrate user-info-block">
                <PageCard>
                    <div className="user-info__form">
                        <div className="title">Ваши данные</div>
                        <PageHorizontalLine />
                        <PageServicesList className="user-info__list">
                            <CheckoutForm />
                            <PageHorizontalLine />
                        </PageServicesList>
                    </div>
                </PageCard>
            </PageSubstrate>
            <PageSubstrate className="substrate record-info-block cut-top">
                <PageCard>
                    <div className="services">
                        <PageHorizontalLine />
                        <PageServicesList className="services__list">
                            {Array.isArray(servicesWithMaxPrice) &&
                                servicesWithMaxPrice.map((service, index) => (
                                    <ServiceItem key={index} selectedServices={service} />
                                ))}
                            <PageHorizontalLine />
                        </PageServicesList>

                        <TotalCost selectedServices={formState.selectedServices} />
                    </div>
                </PageCard>
            </PageSubstrate>
            <ServiceDetails
                servicesWithMaxPrice={servicesWithMaxPrice}
                selectedServices={selectedServices}
            />
            <page-record-footer class="footer-block">
                <div className="page-record-footer">
                    <ProfileButton
                        title="Записаться"
                        locator="make_booking_btn"
                    />
                </div>

            </page-record-footer>

        </>
    )
}

export default AppointmentsCheckout;