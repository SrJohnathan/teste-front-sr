'use client'

import ItemList from "@/components/Lists/ListIndex/ItemList";
import {Ecomence, FoodsResponse, Item} from "@/interfaces/Foods";
import {Fragment,  useEffect, useRef, useState} from "react";
import {QueryClientProvider, useQuery} from "@tanstack/react-query";
import {fetchFoods} from "@/data/foods";
import {useVirtualizer} from "@tanstack/react-virtual";
import {AnimatePresence} from "framer-motion";
import {QueryClient} from "@tanstack/query-core";



 export const ContentList = ({children}: { children: React.ReactNode}) => {

    return (
        <QueryClientProvider client={new QueryClient()}>
            {children}
        </QueryClientProvider>
    )

}


const ListIndex = () => {


    const [foods, setFoods] = useState<FoodsResponse>({ foods: []});

    const listRef = useRef<HTMLDivElement>(null);



    const {data= {foods :[]}} = useQuery<FoodsResponse>({
        queryKey: [`foods`,],
        queryFn: () => fetchFoods(),
    });


    useEffect(() => {
        setFoods(data);
    }, [data]);


    const rowVirtualizer = useVirtualizer({
        count: foods.foods.length,
        getScrollElement: () => listRef.current,
        estimateSize: () => 100,
        overscan: 20


    });



    const isEcomence = (val: Item | Ecomence): val is Ecomence => {
        return "ecomence" in val;
    };


    return (

        <div  className={" relative flex-1 "}>
            <div ref={listRef} className={"over-y absolute w-full h-full"}>



                <ul className="no-dots small-padding" style={{height: rowVirtualizer.getTotalSize(), position: "relative"}}>
                    <AnimatePresence initial={false}>

                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                                const food = foods.foods[virtualRow.index];


                            if (isEcomence(food.value))  {

                                return <Fragment key={virtualRow.index} >
                                    <div  className={"middle-align"} style={{height:"120px"}} >

                                        <h6 className={"bold primary-text "}>{ food.value.ecomence === "open"  ? "abertos" : "fechados" }</h6>

                                    </div>
                                </Fragment>
                            } else {

                                return (
                                    <ItemList
                                        food={food.value}
                                        key={virtualRow.index}
                                    />)
                            }


                        })

                        }


                    </AnimatePresence>

                </ul>


            </div>
        </div>



    )

}



export default ListIndex;


