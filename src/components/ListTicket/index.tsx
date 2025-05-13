'use client'

import {useEffect, useState} from "react";
import {getFood} from "@/data/foods";



const ListTicket = () => {


    const [tickets, setTickets] = useState<any[]>([]);
    const [foods, setFoods] = useState<any[]>([]);



    useEffect(() => {


        const  req = async () => {


            const stored = localStorage.getItem("tickets");
            const previousTickets:any[] = stored ? JSON.parse(stored) : [];

            setTickets(previousTickets)


            let foods:{name:string, image:string, id:number}[] = []
            const idf =  previousTickets.map((ticket:any) => ticket.contact)


            for (let i = 1; i < idf.length; i++) {
                const element = idf[i];
                const  foot = await getFood( parseInt(element) )
                foods.push(foot)
            }
            setFoods(foods)

        }




        req()


    },[])


    return (
        <div  className="flex medium round padding   flex-col no-margin no-padding  ">


            {foods.map((food, index) =>
                <>

                <div key={index} className={"flex  flex-col padding "}>

                    <div className={"row"}>

                    <img src={food?.image || ""} className="small small-round"/>

                    <div>
                        <span className={"text-caption extra-bold"}>seus itens em</span>
                        <h5 className="no-margin extra-bold">{food?.name}</h5>
                    </div>
                    </div>
                    <div className={"space"}></div>

                    <div className={"flex flex-col"}>

                    {tickets.filter( (ticket:any) => parseInt(ticket.contact) === food?.id ).map((ticket:any) =>


                        <div key={ticket}>
                            <div className={"flex space-between"}>
                                <h6 className="extra-bold small">{ticket.menuName}</h6>
                             <span className="purple-text extra-bold right">R${(ticket.total || 19.9).toFixed(2)}</span>
                            </div>


                            <div className="row right-align">

                                <button className={"cyan-text transparent small-round  extra-bold"}><i>edit</i>editar</button>

                                <button
                                    type="button"
                                    onClick={() => {}}
                                    className="transparent circle"
                                >
                                    <i style={{fontSize: "2rem"}} className="cyan-text large  ">
                                        do_not_disturb_on</i>
                                </button>
                                <span className="bold">{0}</span>
                                <button
                                    type="button"
                                    onClick={() => {}}
                                    className="transparent circle"
                                >
                                    <i style={{fontSize: "2rem"}} className="cyan-text large">
                                        add_circle
                                    </i>
                                </button>
                            </div>


                            <div className={"text-caption "}>
                                <ul className="flex flex-col gap-1 padding">
                                    <li>
                                        <div className="flex flex-col">
                                            <b>Quantidade:</b>
                                            {ticket.quantity}
                                        </div>
                                    </li>

                                    <li>
                                        <div className="flex flex-col">
                                            <b>Tamanho:</b>
                                            {ticket.size}
                                        </div>
                                    </li>

                                    {Array.from(ticket.drinks).filter((value:any) =>  value.qtd > 0 ).length  > 0 && (
                                        <li>
                                            <div className="flex flex-col">
                                                <b>vai querer bebida?</b>
                                                {Array.from(ticket.drinks).filter((value:any) =>  value.qtd > 0 ).map((d: any) =>  <div key={d} className={"row"}> <span>{ `${d.nome} (${d.qtd}x)`} </span>  <span className={"green-text extra-bold"}> +{(  d.qtd * d.preco || 0).toFixed(2)}  </span> <br/></div> )  }
                                            </div>
                                        </li>
                                    )}

                                    {ticket.extras?.length > 0 && (
                                        <li>
                                            <div className="flex flex-col">
                                                <b>Extras:</b>
                                                {ticket.extras.join(", ")}
                                            </div>
                                        </li>
                                    )}

                                    {ticket.sideDishes?.length > 0 && (
                                        <li>
                                            <div className="flex flex-col">
                                                <b>Acompanhamentos:</b>
                                                {ticket.sideDishes.join(", ")}
                                            </div>
                                        </li>
                                    )}

                                    {ticket.utensil && (
                                        <li>
                                            <div className="flex flex-col">
                                                <b>Utensílio:</b>
                                                {ticket.utensil}
                                            </div>
                                        </li>
                                    )}


                                </ul>
                                {ticket.note && (
                                    <div>
                                        <div className="flex small-round margin padding fill">
                                            <b>Obs:</b>
                                            {ticket.note}
                                        </div>
                                    </div>
                                )}

                            </div>


                            <div className="medium-space"></div>
                            <div className="divider"></div>
                            <div className="medium-space"></div>


                        </div>


                    )}

                    </div>

                </div>


                </>

            )}




            <div className="space"></div>

            <div className="bottom fixed w-full">
                <article className="flex space-between row">
                    <div>
                        <h6 className="extra-bold small">subtotal</h6>

                        <h6 className={"extra-bold primary-text"}> R$ {tickets.reduce((sum, value) => sum + (value.total || 0), 0).toFixed(2).replace('.', ',')}</h6>
                    </div>

                    <button className="extra-bold small-round large">ir para pagamento</button>
                </article>
            </div>

        </div>
    )

}

export  default ListTicket;