import React from "react";
import { ReactComponent as ServiceIcon } from "../../assets/images/service.svg";

const ServicesItem = ({ service }) => {
    const employeeName = service.employee ? service.employee.first_name : "Не выбран";
    return (
        <div key={service.id} className='eb-services-island__item cursor-pointer'>
            <div className='eb-services-island__service'>
                <div className='flex items-center w-full w-max-full'>
                    <div
                        className='eb-island-icon mr-4 flex-shrink-0 rounded-lg'
                        style={{ width: "50px", height: "50px" }}
                    >
                        <ServiceIcon className='ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text' />
                    </div>
                    <div className='flex-grow pr-4 overflow-hidden'>
                        {service.name}
                        <div className='flex items-center flex-wrap gap-x-4 gap-y-2 text-xs mt-1'>
                            <div className='whitespace-no-wrap'>
                                {service.startTime} - {service.endTime}
                            </div>
                            <div className='opacity-50 whitespace-no-wrap'>
                                {service.duration} мин.
                            </div>
                            <div>
                                <div className='eb-user-avatar eb-user-avatar--single-row'>
                                    <span className='eb-user-avatar__title'>
                                        {employeeName}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-shrink-0'>
                        <strong className='whitespace-no-wrap'>
                            {service.price_from} ₽
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesItem;