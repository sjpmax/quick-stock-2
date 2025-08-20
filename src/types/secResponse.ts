

export type SECResponse = {
    [key: string]: SECCompany;
}

 type SECCompany = {
    cik_str: number;
    ticker: string;
    title: string;
}