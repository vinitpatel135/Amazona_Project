import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Rating from "../Component/Rating"
// import Loder from "../Component/Loder"
import MessageBox from "../Component/MessageBox"
// import ImageZoomExample from "../Component/ReactZoom"
import ReactImageMagnify from 'react-image-magnify';
import Loader from "../Component/Loader"
import apihelper from "../Common/ApiHelper"




export default function ProductScreen(props) {
    const [Product, SetProduct] = useState([])
    const [error, SetError] = useState("")
    const { id } = useParams()
    let [qty, setqty] = useState(1)
    const { SetCartItmes } = props
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [image, setimage] = useState()

    const ImageHandle = (e) => {
        setimage(e)

    }


    const GETProductById = async () => {
        try {
            setIsLoading(true)
            const result = await apihelper.FatchProductById(id)
            if (result.status === 200) {
                SetProduct(result.data.product)
                setimage(result.data.product.image)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
            if (error.response && error.response.data) {
                return SetError(error.response.data.message)
            }
            SetError(error.message)

        }
    }

    useEffect(() => { GETProductById() }, [])

    useEffect(() => {
        setqty(Product.countInStock && Product.countInStock > 0 ? 1 : 0)
    }, [Product])

    const AddTOCart = async () => {
        try {


            const cart = await JSON.parse(localStorage.getItem("cartItems")) || []

            const findIndex = cart.findIndex((x) => x.product === id)

            if (findIndex > -1) {
                cart[findIndex].qty = qty
            } else {
                cart.push({ product: id, qty: qty })
            }

            localStorage.setItem("cartItems", JSON.stringify(cart))

            SetCartItmes(cart)

            navigate("/cart")

        } catch (error) {

            console.log(error);

            SetError(error.message)

            return
        }

    }



    return (
        // <!-- content -->/
        <section className="py-5">
            <Loader isLoding={isLoading} />
            <MessageBox error={error} seterror={SetError} />
            <div className="container">
                <div className="row gx-5">
                    <aside className="col-lg-6">
                        <div className="border rounded-4 mb-3 d-flex justify-content-center">
                            {/* <a  data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp"> */}
                            {/* <img style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }} className="rounded-4 fit"src={image}   alt="" /> */}
                            {/* <InnerImageZoom src={image} zoomSrc={image} /> */}

                            <ReactImageMagnify {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: image
                                },
                                largeImage: {
                                    src: image,
                                    width: 1200,
                                    height: 1800
                                }
                            }} />



                            {/* </a> */}
                        </div>
                        <div className="d-flex justify-content-center mb-3">
                            <a data-fslightbox="mygalley" className="border mx-1   item-thumb rounded-2" data-type="image" onClick={() => ImageHandle(Product.image)}  >
                                <img width="60" height="60" className="rounded-2" src={Product.image} alt="" />
                            </a>
                            <a data-fslightbox="mygalley" className="border mx-1   item-thumb rounded-2" onClick={() => ImageHandle(Product.image_1)} target="_blank" data-type="image"  >
                                <img width="60" height="60" className="rounded-2" src={Product.image_1} alt="" />
                            </a>
                            <a data-fslightbox="mygalley" className="border mx-1   item-thumb rounded-2" onClick={() => ImageHandle(Product.image_2)} target="_blank" data-type="image"  >
                                <img width="60" height="60" className="rounded-2" src={Product.image_2} alt="" />
                            </a>
                            <a data-fslightbox="mygalley" className="border mx-1   item-thumb rounded-2" onClick={() => ImageHandle(Product.image_3)} target="_blank" data-type="image"  >
                                <img width="60" height="60" className="rounded-2" src={Product.image_3} alt="" />
                            </a>
                            <a data-fslightbox="mygalley" className="border mx-1  item-thumb  rounded-2" onClick={() => ImageHandle(Product.image_4)} target="_blank" data-type="image" >
                                <img width="60" height="60" className="rounded-2" src={Product.image_4} alt="" />
                            </a>
                        </div>
                        {/* <!-- thumbs-wrap.// --> */}
                        {/* <!-- gallery-wrap .end// --> */}
                    </aside>
                    <main className="col-lg-6">
                        <div className="ps-lg-3">
                            <h4 className="title text-dark">
                                Quality Men's Hoodie for Winter, Men's Fashion <br />
                                Casual Hoodie
                            </h4>
                            <div className="d-flex flex-row my-3">
                                <div className="text-warning mb-1 me-2">
                                    <Rating rating={Product.rating} />
                                    <span className="ms-1">
                                        {Product.rating}
                                    </span>
                                </div>
                                <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>154 orders</span>
                                <span className="text-success ms-2">In stock</span>
                            </div>

                            <div className="mb-3">
                                <span className="h5">₹ {Product.price} </span>
                                <span className="text-muted"> /per Item</span>
                            </div>

                            <p>
                                Modern look and quality demo item is a streetwear-inspired collection that continues to break away from the conventions of mainstream fashion. Made in Italy, these black and brown clothing low-top shirts for
                                men.
                            </p>

                            <div className="row">
                                <dt className="col-3">Type:</dt>
                                <dd className="col-9">Regular</dd>

                                <dt className="col-3">Color</dt>
                                <dd className="col-9">Brown</dd>

                                <dt className="col-3">Material</dt>
                                <dd className="col-9">Cotton, Jeans</dd>

                                <dt className="col-3">Brand</dt>
                                <dd className="col-9">{Product.brand}</dd>
                            </div>

                            <br></br>
                            <div className="row mb-4">
                                <div className="col-md-4 col-6">
                                    <label className="mb-2">Size</label>
                                    <select className="form-select border border-secondary" style={{ height: "35px" }}>
                                        <option>Small</option>
                                        <option>Medium</option>
                                        <option>Large</option>
                                    </select>
                                </div>
                                {/* <!-- col.// --> */}
                                <div className="col-md-4 col-6 mb-3">
                                    <label className="mb-2 d-block">Quantity</label>
                                    <div className="d-flex mb-3" style={{ width: "170px"  }} >
                                        <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark" disabled={qty <= 0} onClick={() => setqty(qty - 1)}>
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <input type="text" value={qty} className="form-control text-center border border-secondary" placeholder="14" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                        <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark" disabled={Product.countInStock <= 0 || Product.countInStock <= qty} onClick={() => setqty(qty + 1)}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" onClick={AddTOCart} disabled={qty <= 0} className="btn btn-primary shadow-0 mx-3 my-2"> <i className="me-1 fa fa-shopping-basket"></i> Add to cart </button>
                            <a href="##" className="btn btn-light border mx-3 my-2 border-secondary py-2 icon-hover px-3"> <i className="me-1 fa fa-heart fa-lg"></i> Save </a>
                        </div>
                    </main>
                </div>
            </div>
        </section>

    )
}








// import { useNavigate, useParams } from "react-router-dom"
// import apiHelper from "../Common/ApiHelper"
// import { useEffect, useState } from "react"
// import Rating from "../Component/Rating"
// // import MessageBox from "../Component/MessageBox"
// import Loader from "../Component/Loader"
// import MessageBox from "../Component/MessageBox"
// // import ImageZoomExample from "../Component/ReactZoom"

// export default function ProductScreen(props) {
//     const [Product, SetProduct] = useState([])
//     const [error, SetError] = useState("")
//     const { id } = useParams()
//     let [qty, setqty] = useState(1)
//     const { SetCartItmes } = props
//     const navigate = useNavigate()
//     const [isLoading, setIsLoading] = useState(false)
//     const [image, setimage] = useState()

//     const ImageHandle = (e) => {
//         setimage(e)

//     }


//     const GETProductById = async () => {
//         try {
//             setIsLoading(true)
//             const result = await apiHelper.FatchProductById(id)
//             if (result.status === 200) {
//                 SetProduct(result.data.product)
//                 setimage(result.data.product.image)
//             }
//             setIsLoading(false)
//         } catch (error) {
//             setIsLoading(false)
//             console.log(error);
//             if (error.response && error.response.data) {
//                 return SetError(error.response.data.message)
//             }
//             SetError(error.message)

//         }
//     }

//     useEffect(() => { 
//         GETProductById() 
//         // eslint-disable-next-line
//     }, [])

//     useEffect(() => {
//         setqty(Product.countInStock && Product.countInStock > 0 ? 1 : 0)
//     }, [Product])

//     const AddTOCart = async () => {
//         try {


//             const cart = await JSON.parse(localStorage.getItem("cartItems")) || []

//             const findIndex = cart.findIndex((x) => x.product === id)

//             if (findIndex > -1) {
//                 cart[findIndex].qty = qty
//             } else {
//                 cart.push({ product: id, qty: qty })
//             }

//             localStorage.setItem("cartItems", JSON.stringify(cart))

//             SetCartItmes(cart)

//             navigate("/cart")

//         } catch (error) {

//             console.log(error);

//             SetError(error.message)

//             return
//         }

//     }



//     return (
//         // <!-- content -->/
//         <section className="py-5">
//             <Loader isLoding={isLoading} />
//             <MessageBox error={error} seterror={SetError} />
//             <div className="container">
//                 <div className="row gx-5">
//                     <aside className="col-lg-6">
//                         <div className="border rounded-4 mb-3 d-flex justify-content-center">
//                             {/* <a  data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp"> */}
//                             <img style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }} className="rounded-4 fit"src={image}   alt="" />
//                             {/* </a> */}
//                         </div>
//                         <div className="d-flex justify-content-center mb-3">
//                             {/* eslint-disable-next-line */}    
//                             <a data-fslightbox="mygalley" className="border mx-1   item-thumb rounded-2" target="_blank" data-type="image" href={image} >
//                                 <img  width="60" height="60" className="rounded-2" src={Product.image}  alt="" />
//                             </a>
//                             {/* eslint-disable-next-line */}
//                             <a data-fslightbox="mygalley" className="border mx-1 item-thumb rounded-2"  onClick={() => ImageHandle(Product.image_1)} target="_blank" data-type="image"  >
//                                 <img width="60" height="60" className="rounded-2"  src={Product.image_1} alt="" />
//                             </a>
//                             {/* eslint-disable-next-line */}
//                             <a data-fslightbox="mygalley" className="border mx-1   item-thumb rounded-2"  onClick={() => ImageHandle(Product.image_2)} target="_blank" data-type="image"  >
//                                 <img width="60" height="60" className="rounded-2"  src={Product.image_2} alt="" />
//                             </a>
//                             {/* eslint-disable-next-line */}
//                             <a data-fslightbox="mygalley" className="border mx-1   item-thumb rounded-2"  onClick={() => ImageHandle(Product.image_3)} target="_blank" data-type="image"  >
//                                 <img width="60" height="60" className="rounded-2"  src={Product.image_3} alt="" />
//                             </a>
//                             {/* eslint-disable-next-line */}
//                             <a data-fslightbox="mygalley" className="border mx-1  item-thumb  rounded-2"  onClick={() => ImageHandle(Product.image_4)} target="_blank" data-type="image" >
//                                 <img width="60" height="60" className="rounded-2"  src={Product.image_4} alt="" />
//                             </a>
//                         </div>
//                         {/* <!-- thumbs-wrap.// --> */}
//                         {/* <!-- gallery-wrap .end// --> */}
//                     </aside>
//                     <main className="col-lg-6">
//                         <div className="ps-lg-3">
//                             <h4 className="title text-dark">
//                                 Quality Men's Hoodie for Winter, Men's Fashion <br />
//                                 Casual Hoodie
//                             </h4>
//                             <div className="d-flex flex-row my-3">
//                                 <div className="text-warning mb-1 me-2">
//                                     <Rating rating={Product.rating} />
//                                     <span className="ms-1">
//                                         {Product.rating}
//                                     </span>
//                                 </div>
//                                 <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>154 orders</span>
//                                 <span className="text-success ms-2">In stock</span>
//                             </div>

//                             <div className="mb-3">
//                                 <span className="h5">₹ {Product.price} </span>
//                                 <span className="text-muted"> /per Item</span>
//                             </div>

//                             <p>
//                                 Modern look and quality demo item is a streetwear-inspired collection that continues to break away from the conventions of mainstream fashion. Made in Italy, these black and brown clothing low-top shirts for
//                                 men.
//                             </p>

//                             <div className="row">
//                                 <dt className="col-3">Type:</dt>
//                                 <dd className="col-9">Regular</dd>

//                                 <dt className="col-3">Color</dt>
//                                 <dd className="col-9">Brown</dd>

//                                 <dt className="col-3">Material</dt>
//                                 <dd className="col-9">Cotton, Jeans</dd>

//                                 <dt className="col-3">Brand</dt>
//                                 <dd className="col-9">{Product.brand}</dd>
//                             </div>

//                             <hr />

//                             <div className="row mb-4">
//                                 <div className="col-md-4 col-6">
//                                     <label className="mb-2">Size</label>
//                                     <select className="form-select border border-secondary" style={{ height: "35px" }}>
//                                         <option>Small</option>
//                                         <option>Medium</option>
//                                         <option>Large</option>
//                                     </select>
//                                 </div>
//                                 {/* <!-- col.// --> */}
//                                 <div className="col-md-4 col-6 mb-3">
//                                     <label className="mb-2 d-block">Quantity</label>
//                                     <div className="input-group mb-3" style={{ width: "170px" }}>
//                                         <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark" disabled={qty <= 1} onClick={() => setqty(qty - 1)}>
//                                             <i className="fas fa-minus"></i>
//                                         </button>
//                                         <input type="text" value={qty} className="form-control text-center border border-secondary" placeholder="14" aria-label="Example text with button addon" aria-describedby="button-addon1" />
//                                         <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark" disabled={Product.countInStock <= 0 || Product.countInStock <= qty} onClick={() => setqty(qty + 1)}>
//                                             <i className="fas fa-plus"></i>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                             <button type="button" onClick={AddTOCart} disabled={qty <= 0} className="btn btn-primary shadow-0 mx-3 my-2"> <i className="me-1 fa fa-shopping-basket"></i> Add to cart </button>
//                             <a href="##" className="btn btn-light border mx-3 my-2 border-secondary py-2 icon-hover px-3"> <i className="me-1 fa fa-heart fa-lg"></i> Save </a>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </section>

//     )
// }