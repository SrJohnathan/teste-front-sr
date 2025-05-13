

export interface Foods {
    value : Item | Ecomence
}


export interface Item {
    id: number;
    name: string;
    rank: number;
    freeOrPaid: boolean;
    price: number;
    image: string;
    op: boolean;
}

export interface Ecomence {
    ecomence: "open" | "close";
}

export interface FoodsResponse {
    foods: Foods[]   ;
}