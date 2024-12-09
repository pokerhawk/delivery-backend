export type dateProps = 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'lastYear' | 'allTime';
type typeProps = 'gte' | 'lte';
export declare const transformDate: (date: string, type?: typeProps) => Date;
export declare const fixedDate: (date: dateProps, type: typeProps) => Date;
export {};
