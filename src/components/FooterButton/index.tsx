

interface Props {
    onClick?:() => void
}

const FooterButton = ({onClick}:Props) => {


    return(
        <footer className={"no-padding"}>

            <div className={"flex max flex-col row center-align padding primary-text"}>

                <label className={"bold"}>
                    feito com 💜 em maringá-PR
                </label>

                <div className={"max w-full padding row "}>
                    <button type={"submit"}  className={"small-round max responsive "}>ver ticket</button></div>

            </div>

        </footer>
    )

}

export default FooterButton;