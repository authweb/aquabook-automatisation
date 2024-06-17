export const calculateServiceCost = (services) => {
    let hasOnlyFromPrice = false;

    const validServices = services.filter(
        service => service && service.duration != null,
    );

    const totalMinutes = validServices.reduce(
        (acc, service) => acc + (service.duration || 0),
        0,
    );

    const { totalMinPrice, totalMaxPrice } = validServices.reduce(
        (acc, service) => {
            const minPrice = parseFloat(service.price_from) || 0;
            const maxPrice = parseFloat(service.price_to) || 0;

            if (maxPrice === 0) {
                // Если maxPrice равен 0, то считаем это как "от"
                hasOnlyFromPrice = true;
            }

            return {
                totalMinPrice: acc.totalMinPrice + minPrice,
                totalMaxPrice:
                    maxPrice > 0
                        ? acc.totalMaxPrice + maxPrice
                        : acc.totalMaxPrice + minPrice,
            };
        },
        { totalMinPrice: 0, totalMaxPrice: 0 },
    );

    return {
        totalMinPrice,
        totalMaxPrice,
        totalMinutes,
        hasOnlyFromPrice,
    };
};

export const formatDuration = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours > 0 ? `${hours} ч. ` : ""}${minutes} мин.`;
};
