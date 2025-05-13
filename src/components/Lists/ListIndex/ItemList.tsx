import {Item} from "@/interfaces/Foods";


const ItemList  = ({food}: { food: Item})  => {



    return (
        <article  className={`no-padding max  no-elevate  ${ food.op ?  null  : "grayscale"} `}>
            <a className={"w-full left-align"} href={`/contact/${food.id}`}>
            <div className="grid no-space  middle-align">
                <div className="s4 m4 l4">
                    <img style={{width:"100px" , height:"100px"}}   className="responsive no-round radios-left-bottom radios-left-top " src={food.image} alt={food.name}/>
                </div>
                <div className="s8 m8 l8">
                    <div className="left-padding flex flex-col ">
                        <h6 className={"bold  small"}>{food.name}</h6>

                        <div className={"flex row"}>

                            {food.freeOrPaid  ? (

                                <>
                                    <div style={{color: "#027A7A"}} className={"row"}> <i className="fa-solid fa-motorcycle"></i> <h6 className={"bold small"}>grátis</h6></div>
                                    <div className={"row"}><i style={{color:"#FFB300"}} className="fa-solid fa-star"></i> <h6 className={"bold small"}>{food.rank}</h6></div></>
                                ) :(


                                <>
                                    <div style={{color: "#7B1FA2"}} className={"row"}><i className="small"><img src="/aiq-a-icon-aiqentrega-verde.svg"/></i> <h6 className={"bold small"}>{ toMoney( food.price)}</h6></div>
                                    <div className={"row"}><i style={{color:"#FFB300"}} className="fa-solid fa-star"></i> <h6 className={"bold small"}>{food.rank}</h6></div></>
                            )}


                        </div>
                    </div>
                </div>
            </div> </a>
        </article>
    )

}


const toMoney = (s:number) => {
    return `R$ ${s.toFixed(2).replace('.', ',')}`

}

export default ItemList;