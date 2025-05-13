import {MenuItem} from "@/interfaces/Product";

const DescriptonProduct = ({menu,idFood}: { menu: MenuItem[], idFood?: number}) => {




    return (
        <div className={"no-elevate no-round"}>
            <div className="flex flex-col">

                {menu?.map((m, index) =>


                    <div key={index} >
                        <details >
                            <summary className="row space-between medium-padding">
                                <div className={"max"}>


                                    <div className={"row space-between"}>

                                        <div>
                                            <strong>{m.name}</strong>
                                        </div>

                                        <i className="material-symbols-outlined">expand_more</i>
                                    </div>


                                    <p className="text-caption">{m.description}</p>
                                </div>

                            </summary>

                            <span><div className={"medium-padding"}>



                                {m.products.map((p, index2) =>


                                    <a href={`/requested/${index2}/${idFood}`} key={index2}  className={"left-padding middle-align top-padding flex wave"}>

                                        <div className={"flex-1 h72 "}>
                                            <strong>{p.name}</strong>
                                            <p className="text-caption no-margin">{p.description}</p>
                                        </div>

                                        <div className={"small-width right-align h72"}>
                                            {p.fromPrice && <p className="text-caption no-margin">a partir de</p>}

                                            { p.discount ? <>

                                                <p className="text-caption line-through no-margin overline">R$ 17,00</p>
                                                <p className="text-purple primary-text extra-bold green-text row no-space right-align no-margin">   <img style={{width:"13px",marginRight:"4px"}} src={"/dinheiro_simbol.svg"}/>  R$ 13,99</p>
                                            </> : <p className="text-purple primary-text extra-bold no-margin">R$ {p.price}</p> }


                                        </div>

                                    </a>


                                )}






                        </div></span>

                        </details>

                        { menu.length - 1 !== index && <div className={"divider"}></div> }

                    </div>

                )}




            </div>
        </div>
    )
}

export default DescriptonProduct;