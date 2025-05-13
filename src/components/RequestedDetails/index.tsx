'use client'

import {useState} from "react";
import {Product} from "@/interfaces/Product";
import {useForm, Controller, useFieldArray} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import FooterButton from "@/components/FooterButton";
import Footer from "@/components/Footer";
import {router} from "next/client";
import {useRouter} from "next/navigation";


const schema = z.object({
    quantity: z.number().min(1, "Escolha pelo menos 1 unidade"),
    size: z.enum(["médio", "grande"], {required_error: "Escolha um tamanho"}),
    drinks: z
        .array(
            z.object({
                nome: z.string(),
                preco: z.number(),
                qtd: z.number().min(0),
            })
        ),
    utensil: z.enum(["hashi", "garfo e faca descartável"]).optional(),
    extras: z.array(z.string()).max(2, "Escolha até 2 extras").optional(),
    note: z.string().max(500).optional(),
    sideDishes: z
        .array(z.enum(["shoyu", "gengibre", "wasabi", "sem acompanhamentos"]))
        .min(1, "Escolha pelo menos 1")
        .max(2, "Escolha no máximo 2"),
});

const RequestedDetails = ({product,nameItem,contact}: { product: Product,nameItem:string ,contact:string}) => {


    const router = useRouter();


    const defaultDrinks = [
        {nome: "coca-cola", preco: 5.0, qtd: 0},
        {nome: "fanta laranja", preco: 5.0, qtd: 0},
        {nome: "guaraná antarctica", preco: 5.0, qtd: 0},
        {nome: "suco prats laranja", preco: 6.0, qtd: 0},
        {nome: "água sem gás", preco: 3.0, qtd: 0},
    ];


    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            quantity: 0,
            size: "grande",
            drinks: defaultDrinks,
            utensil: "hashi",
            extras: [],
            note: ""
        }
    });


    const {fields, update} = useFieldArray({
        control,
        name: "drinks",
    });


    const quantity = watch("quantity");
    const basePrice = 19.9;
    const total = (basePrice * quantity).toFixed(2).replace(".", ",");
    const [utensil, setUtensil] = useState<string | undefined>(undefined);


    const EXTRAS_PRECOS: Record<string, number> = {
        "biscoito da sorte": 2.00,
        "rolinho primavera": 8.00,
        "guioza": 6.00,
    };

    function calcularTotal({
                               basePrice,
                               quantity,
                               size,
                               drinks,
                               utensil,
                               extras,
                           }: {
        basePrice: number;
        quantity: number;
        size: "médio" | "grande";
        drinks: { nome: string; preco: number; qtd: number }[];
        utensil?: string;
        extras?: string[];
    }): number {
        let total = basePrice * quantity;

        if (size === "grande") {
            total += 9.00 * quantity;
        }

        for (const bebida of drinks) {
            total += bebida.preco * bebida.qtd;
        }

        if (utensil === "garfo e faca descartável") {
            total += 1.00;
        }

        if (extras) {
            for (const extra of extras) {
                total += EXTRAS_PRECOS[extra] ?? 0;
            }
        }

        return total;
    }


    return (
        <>
        <form className={"no-margin"}  onSubmit={handleSubmit((data) => {


           console.log("erros do formulário:", errors);

            const total = calcularTotal({
                basePrice,
                quantity: data.quantity,
                size: data.size,
                drinks: data.drinks,
                utensil: data.utensil,
                extras: data.extras,
            });

            console.log("Pedido:", contact);
            console.log("Total calculado: R$", total.toFixed(2));


            const ticket = {
                ...data,
                total,
                nameItem,
                contact,
                price: 19.90,
                menuName: product.name,
                createdAt: new Date().toISOString(),
                id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            };






            const stored = localStorage.getItem("tickets");
            const previousTickets = stored ? JSON.parse(stored) : [];
            const updatedTickets = [...previousTickets, ticket];
            localStorage.setItem("tickets", JSON.stringify(updatedTickets));
            router.push("/tickets");


        })
        }>
            <img className="w-full" src="/img.png"/>
            <div className="medium-padding">


                <div>
                    <h5 className="no-margin extra-bold">{product.name}</h5>

                    <div className="row">
                        <small className="gray-text bold">a partir de</small>
                        <h6 className="primary-text small extra-bold">
                            R$ {basePrice.toFixed(2).replace(".", ",")}
                        </h6>
                    </div>

                    <small className="gray-text">
                        salmão temperado com limão, cebola e pimenta
                    </small>

                    <div className="max row space-between flex top-margin">
                        <div>
                            <h6 className="extra-bold small no-padding">quantos?</h6>
                            <small className="row no-margin text-caption">
                                total<strong> R$ {total}</strong>
                            </small>
                            {errors.quantity && (
                                <p className="red-text small">{errors.quantity.message}</p>
                            )}
                        </div>

                        <Controller
                            control={control}
                            name="quantity"
                            render={({field}) => (
                                quantity > 0 ? (
                                    <div className="row">
                                        <button
                                            type="button"
                                            onClick={() => field.onChange(0)}
                                            className="transparent circle"
                                        >
                                            <i className="fa-regular fa-trash-can cyan-text large"></i>
                                        </button>
                                        <span className="bold">{quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => field.onChange(quantity + 1)}
                                            className="transparent circle"
                                        >
                                            <i style={{fontSize: "2rem"}} className="cyan-text large">
                                                add_circle
                                            </i>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        style={{backgroundColor: "#6D6F73"}}
                                        className="large small-round"
                                        onClick={() => field.onChange(quantity + 1)}
                                    >
                                        adicionar
                                    </button>
                                )
                            )}
                        />
                    </div>
                </div>


                <div className="large-space"></div>
                <div className="divider"></div>
                <div className="space"></div>


                <div>
                    <div className={"flex space-between"}>
                        <div>
                            <h6 className="extra-bold small">qual o tamanho?</h6>
                            <small className="gray-text">escolha 1</small>
                        </div>

                        <div className={"chip gray-super white-text"}>obrigatório</div>
                    </div>

                    <div className="space"></div>

                    <div className={"flex"}>
                        <Controller
                            control={control}
                            name="size"
                            render={({field}) => (
                                <div className={"flex flex-col  flex-1 gap-1"}>
                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="radio1_"
                                            value="médio"
                                            checked={field.value === "médio"}
                                            onChange={() => field.onChange("médio")}
                                        />
                                        <span className={"text-caption"}>médio</span>
                                    </label>

                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="radio1_"
                                            value="grande"
                                            checked={field.value === "grande"}
                                            onChange={() => field.onChange("grande")}
                                        />
                                        <span className={"text-caption"}>grande</span>
                                    </label>
                                </div>
                            )}
                        />

                        <div className={"flex flex-col gap-1"}>
                            <span className="green-text extra-bold right">R$ 19,90</span>
                            <span className="primary-text extra-bold right">R$ 28,90</span>
                        </div>
                    </div>

                    {errors.size && (
                        <p className="red-text small top-margin">{errors.size.message}</p>
                    )}
                </div>

                <div className="medium-space"></div>
                <div className="divider"></div>
                <div className="medium-space"></div>

                <div>


                    <div className={"flex space-between"}>
                        <div>
                            <h6 className="extra-bold small">acompanhamentos</h6>
                            <small className="gray-text">escolha de 1 a 2</small>
                        </div>

                        <div className={"chip gray-super white-text"}>obrigatório</div>
                    </div>


                    <div className="space"></div>
                    <Controller
                        control={control}
                        name="sideDishes"
                        render={({field}) => {
                            const values = field.value || [];
                            const toggle = (value: string) => {
                                if (values.includes(value as any)) {
                                    field.onChange(values.filter((v) => v !== value));
                                } else {
                                    if (values.length < 2) {
                                        field.onChange([...values, value]);
                                    }
                                }
                            };

                            return (
                                <div className={"flex flex-col gap-1 text-caption"}>
                                    {["shoyu", "gengibre", "wasabi", "sem acompanhamentos"].map((item) => (
                                        <label className="checkbox" key={item}>
                                            <input
                                                type="checkbox"
                                                checked={values.includes(item as never)}
                                                onChange={() => toggle(item)}
                                            />
                                            <span>
              <label className={"text-caption"}>{item}</label>
            </span>
                                        </label>
                                    ))}
                                </div>
                            );
                        }}
                    />

                    {errors.sideDishes && (
                        <p className="red-text small top-margin">{errors.sideDishes.message}</p>
                    )}
                </div>

                <div className="medium-space"></div>
                <div className="divider"></div>
                <div className="medium-space"></div>

                <div>
                    <h6 className="extra-bold small">vai querer bebida?</h6>
                    <p className="small-text text-caption no-margin">escolha quantos quiser</p>
                    <div className="large-space"></div>

                    <div>
                        {fields.map((item, index) => {
                            const qtd = watch(`drinks.${index}.qtd`);

                            return (
                                <div key={item.id} className="row flex space-between middle">
                                    <div className="row">
                                        <button
                                            style={{backgroundColor: "#EEF0F5"}}
                                            className="circle gray-text"
                                            disabled={qtd === 0}
                                            onClick={() =>
                                                update(index, {...item, qtd: Math.max(0, qtd - 1)})
                                            }
                                        >
                                            <i>remove</i>
                                        </button>

                                        <span className="extra-bold">{qtd}</span>

                                        <button
                                            style={{fontSize: "2rem"}}
                                            className="circle transparent cyan-text large"
                                            onClick={() => update(index, {...item, qtd: qtd + 1})}
                                        >
                                            <i>add_circle</i>
                                        </button>

                                        <span className="text-caption">{item.nome}</span>
                                    </div>

                                    <span className="right primary-text extra-bold">
              +R$ {item.preco.toFixed(2)}
            </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="medium-space"></div>
                <div className="divider"></div>
                <div className="medium-space"></div>

                <div>
                    <div className={"flex space-between"}>
                        <div>
                            <h6 className="extra-bold small">precisa de talher?</h6>
                            <small className="gray-text">escolha ate 1</small>
                        </div>


                    </div>

                    <div className="space"></div>
                    <div className={"flex"}>


                        <div className={"flex flex-col  flex-1 gap-1"}>
                            <label className="radio">
                                <input

                                    type="radio"
                                    value="hashi"
                                    {...register("utensil")}
                                />
                                <span><label className="text-caption">hashi</label></span>
                            </label>

                            <label className="radio">
                                <input

                                    type="radio"
                                    value="garfo e faca descartável"
                                    {...register("utensil")}
                                />
                                <span><label className="text-caption">garfo e faca descartável</label></span>
                            </label>


                        </div>

                        <div className={"flex flex-col gap-1"}>
                            <span className="green-text extra-bold right "><br/></span>
                            <span className="primary-text extra-bold right">+R$ 1,00</span>
                        </div>


                    </div>
                </div>

                <div className="medium-space"></div>
                <div className="divider"></div>
                <div className="medium-space"></div>

                <div>
                    <div className="flex space-between">
                        <div>
                            <h6 className="extra-bold small">mais alguma coisa?</h6>
                            <small className="gray-text">escolha até 2</small>
                        </div>
                    </div>

                    <div className="space"></div>

                    <div className="flex">
                        <div className="flex flex-col flex-1 gap-1 text-caption">
                            <label className="checkbox">
                                <input type="checkbox" value="biscoito da sorte" {...register("extras")} />
                                <span>biscoito da sorte</span>
                            </label>

                            <label className="checkbox">
                                <input type="checkbox" value="rolinho primavera" {...register("extras")} />
                                <span>rolinho primavera</span>
                            </label>

                            <label className="checkbox">
                                <input type="checkbox" value="guioza" {...register("extras")} />
                                <span>guioza</span>
                            </label>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="primary-text extra-bold right">+R$ 2,00</span>
                            <span className="primary-text extra-bold right">+R$ 8,00</span>
                            <span className="primary-text extra-bold right">+R$ 6,00</span>
                        </div>
                    </div>
                </div>




                <div className="medium-space"></div>
                <div className="divider"></div>
                <div className="medium-space"></div>

                <div>
                    <div className="field textarea  small-round border">
                        <textarea  {...register("note")} placeholder={"alguma observação do item? • opcional\n" +
                            "ex: tirar algum ingrediente, ponto do prato"}></textarea>
                    </div>
                </div>
            </div>






            {watch("quantity") > 0 ? <FooterButton /> : <Footer />}


        </form>

            </>
    );
};


export default RequestedDetails;