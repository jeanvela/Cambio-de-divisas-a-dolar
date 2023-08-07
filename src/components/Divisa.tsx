import axios from 'axios'
import { useEffect, useState } from 'react'
import style from "../styles/Divisa.module.css"

interface Divisa {
    [name: string] : number
}

interface DivisaValor {
    [name : string] : number | string
}

interface UsdValor {
    valorDolar: number | string
}

const DivisaContai = () => {

    const [allDivisas, setAllDivisas] = useState<Divisa>({})
    const [divisaValue, setDivisaValue] = useState<DivisaValor>({
        valor1: ""
    })

    const [valorUsd, setValorUsd] = useState<UsdValor>({
        valorDolar: 1
    })

    const [convertirDivisa, setConvertirDivisa] = useState<string | number>("")

    const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.currentTarget
        setDivisaValue({...divisaValue,[name]: value})
    }

    const handleChangeUsd = (event: React.FormEvent<HTMLInputElement>) => {
        setValorUsd({valorDolar : event.currentTarget.value})
    }

    const handleClick = () => {
        const valor = Number(valorUsd.valorDolar) * Number(divisaValue.valor1)
        setConvertirDivisa(Number(valor.toFixed(2)))
    }

    useEffect(() => {
        const fectApi = async () => {
            try {
                const response = await axios.get('https://openexchangerates.org/api/latest.json?app_id=93a9143a5ed045be9ed354fe767f2ebb')
                setAllDivisas(response.data.rates)
                const val: number = Number(Object.values(response.data.rates)[0])
                setDivisaValue({valor1: Number(val.toFixed(2))})
            } catch (error) {
                console.log(error)
            }
        }
        fectApi()
    }, [])

    return (
        <div className={style.container}>
            <div className={style.contaiUsd}>
                <span className={style.span}>USD</span>
                <input className={style.input} type="text" name='valorDolar' value={valorUsd.valorDolar} onChange={handleChangeUsd} />
            </div>
            <div className={style.contaiDivisas}>
                <select className={style.select} name="valor1" onChange={handleChange}>
                    {
                        Object.entries(allDivisas).map(([name, value]) => {
                            return (
                                <option key={name} value={value.toFixed(2)}>{name}</option>
                            )
                        })
                    }
                </select>
                <input className={style.input} type="text" value={divisaValue.valor1} name='valor1' onChange={handleChange}/>
            </div>
            <button className={style.btn} onClick={handleClick}>Convertir</button>
            <div className={style.contaiResult}>
                {
                    convertirDivisa === "" ? "" : <p className={style.p}>{convertirDivisa}</p>
                }
            </div>
        </div>
    )
}

export default DivisaContai