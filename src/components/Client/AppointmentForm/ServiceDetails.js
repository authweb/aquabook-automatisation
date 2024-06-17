import React from "react";
import ServiceItem from "../../Common/ServiceItem";
import TotalCost from "../../Common/TotalCost";
import { PageCard, PageHorizontalLine, PageSubstrate, PageServicesList } from "../../UIComponents";

const ServiceDetails = ({ servicesWithMaxPrice, selectedServices }) => {
    return (
        <PageSubstrate className="substrate">
            <PageCard className="record-card">
                <div className="master-wrapper"></div>

                <div className="services">
                    <PageHorizontalLine />
                    <PageServicesList className="services__list">
                        {Array.isArray(servicesWithMaxPrice) &&
                            servicesWithMaxPrice.map((service, index) => (
                                <ServiceItem key={index} selectedServices={service} />
                            ))}
                        <PageHorizontalLine />
                    </PageServicesList>

                    <TotalCost selectedServices={selectedServices} />
                </div>
            </PageCard>
        </PageSubstrate>
    );
};

export default ServiceDetails;
