import React from 'react';
import { calculateServiceCost } from '../../utils/calculateServiceCost';

const TotalCost = ({ selectedServices }) => {
    const { totalMinPrice, totalMaxPrice, hasOnlyFromPrice } = calculateServiceCost(selectedServices);

    // Форматируем вывод ценового диапазона или "от"
    const priceText = hasOnlyFromPrice
        ? `от ${totalMinPrice} ₽`
        : `${totalMinPrice} - ${totalMaxPrice} ₽`;

    return (
        <div className='services__total-cost single'>
            <div className="item item__total">
                <span className="item__title">Итого</span>
                <span className="item__cost">{priceText}</span>
            </div>
        </div>
    )
}

export default TotalCost