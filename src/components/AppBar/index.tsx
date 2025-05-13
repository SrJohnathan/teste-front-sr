

const AppBar = () => {


    return (

        <header className={"primary fixed no-round"}>
            <nav >
                <a className="transparent">
                    <img className="responsive" src="/aiqbranding.png"/>
                </a>

                <div className={"flex row max center-align"}>

                    <i className="fa-solid fa-location-dot  "></i>
                    <div className={"flex flex-col"}>
                        <span className={"bold"}>entregando em</span>
                        <h6 className={"bold small no-margin "}>Rua Mandaguari, 198</h6>
                    </div>

                </div>

                <a title={"tickets"} className={" l m  "}><i>shoppingmode</i></a>

                <button className="circle transparent">
                    <i className="fa-regular fa-user"></i>
                </button>



            </nav>

            <div className="field  prefix border small-round  background">
                <i>search</i>
                <input  placeholder={"busque pela loja ou culinária"} type="text"/>

            </div>

        </header>

    )

}

export default AppBar;