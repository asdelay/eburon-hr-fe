export function monthsToMonthYears(months: number | string): string {
    const monthsNumber = Number(months);;
    const years = Math.floor(monthsNumber / 12)
    if(!monthsNumber) return 'No experience'
    const remainder = monthsNumber % 12;
    return `${years} year${years === 1 ? '' : 's'} ${remainder ? `and ${remainder} months` : ''}`
}