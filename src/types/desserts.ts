
export interface DessertImage {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
}

export interface Dessert {
    id: number;
    name: string;
    category: string;
    price: number;
    image: DessertImage;
}
