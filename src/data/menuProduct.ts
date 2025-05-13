'use server'


import  json  from '../../db/pratos.json';
import {MenuItem} from "@/interfaces/Product";

export const getMenuProduct  = async  () => {

    const c = json as MenuItem[]
    return c
}