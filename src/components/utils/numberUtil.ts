const parseAmount = (amount: string | number): number => {
    if (typeof amount === 'string') {
        const cleanAmount = amount.replace(/[$,]/g, '');
        return Number(cleanAmount);
    }
    return amount;
};

export const formatMoney = (amount: string | number): string => {
    const numericAmount = parseAmount(amount);

    if (isNaN(numericAmount)) {
        return '$0.00';
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numericAmount);
};
