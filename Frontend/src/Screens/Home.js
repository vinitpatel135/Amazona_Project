import { useEffect, useState } from "react"
import apihelper from "../Common/ApiHelper"
import ProductCard from "../Component/ProductCard"
import Loader from "../Component/Loader"
import MessageBox from "../Component/MessageBox"

export default function Home(props) {

    const [product, setProduct] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState("")
    let { Search } = props

    const Getproduct = async () => {
        try {
            setisLoading(true)
            const result = await apihelper.FatchProducts()
            if (result.status === 200) {
                setProduct(result.data.Product)
            }
            setisLoading(false)
        } catch (error) {
            setisLoading(false)
            if (error.response && error.response.data.message) {
                return setError(error.response.data.message)
            }

            setError(error.message)
        }
    }
    useEffect(() => { Getproduct() }, [])

    const FilterProduct = product.filter((x) => {
        return x.category.toLowerCase().includes(Search?.value?.toLowerCase())
    })

    return (
        <>
            <MessageBox error={error} seterror={setError} />
            <h3 className="text-center m-4">Products</h3>
            <div className="container d-flex flex-wrap justify-content-center gap-4">
                <Loader isLoading={isLoading} />

                {
                    Search.value === undefined ? ( product && product.map((x) => {
                        return <ProductCard Product={x} />
                    }) ) : (
                        FilterProduct.length === 0 ? <span className="text-danger fs-5">This Item is not Found : <b>"{Search.value}"</b> </span> :
                        FilterProduct && FilterProduct.map((x) => {
                                return <ProductCard Product={x} />
                            })
                    )

                    // Search.value === undefined ? product && product.map((x) => {
                    //     return <ProductCard Product={x} />
                    // }) : FilterProduct && FilterProduct.map((x) => {
                    //     return <ProductCard Product={x} />
                    // })

                }

                {/* {product && product.map((x) => {
                    return <ProductCard Product={x} />
                })} */}
            </div>
        </>
    )
}