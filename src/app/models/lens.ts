export interface Lense {
    type: string,
    name: string,
    quality: number,
    manufacturingType: string;
    treatment: [string],
    staticCorrectionDetails: {
        prism: number,
        addition: {
            min: number,
            max: number
        }
    },
    indexData: {
        name: string,
        price: number,
        diameterStrengthBounds: {
            index: string,
            diameters: [Object]
        }[]
    }[],
    indexPrices: string
}