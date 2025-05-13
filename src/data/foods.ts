'use server'

import {Foods, FoodsResponse, Item} from "@/interfaces/Foods";
import json from "../../db/foods.json"


export const fetchFoods = async (): Promise<FoodsResponse> => {
    const items = json as (Item & { open: boolean })[];

    const openItems = items.filter(item => item.open);
    const closedItems = items.filter(item => !item.open);

    const foods: Foods[] = [];

    if (openItems.length > 0) {
        foods.push({ value: { ecomence: "open" } });



            foods.push(...openItems.map(item => ({
                value: {
                    id: item.id,
                    name: item.name,
                    rank: item.rank,
                    freeOrPaid: item.freeOrPaid,
                    price: item.price,
                    image: item.image,
                    op: true

                }
            })));




    }

    if (closedItems.length > 0) {
        foods.push({ value: { ecomence: "close" } });



        foods.push(...closedItems.map(item => ({
            value: {
                id: item.id,
                name: item.name,
                rank: item.rank,
                freeOrPaid: item.freeOrPaid,
                price: item.price,
                image: item.image,
                op: false
            }
        })));
    }

    return { foods };
};

export const getFood = async (id:number) => {

   return  (json.filter(item => item.id === id)[0]) as unknown as Item;

}