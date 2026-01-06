declare module 'country-state-city' {
    export const Country: {
        getAllCountries: () => any[];
        getCountryByCode: (code: string) => any;
    };
    export const State: {
        getStatesOfCountry: (countryCode: string) => any[];
        getStateByCodeAndCountry: (stateCode: string, countryCode: string) => any;
    };
    export const City: {
        getCitiesOfState: (countryCode: string, stateCode: string) => any[];
    };
}
