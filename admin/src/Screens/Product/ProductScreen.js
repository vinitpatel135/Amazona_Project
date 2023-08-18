import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Editor } from '@tinymce/tinymce-react';
import ImageDialog from './ImageDialog';
import axios from 'axios';
import { useEffect } from 'react';
import apihelper from '../../Common/ApiHelper';
import { useState } from 'react';
import MultiImgDialog from './MultiImgDialog';
import Validation from '../../Common/Validation';

export default function ProductScreen() {

    const [images, setImages] = useState([])
    const [futereimg, setfutereimg] = useState({})
    const [relevantImg, setRelevantImg] = useState({})
    const [isSubmited, setIsSubmited] = useState(false)
    const [Error, setError] = useState([])
    const [product, setproduct] = useState({
        title: "",
        Brand: "",
        alias: "",
        price: 0,
        discription: "",
        countInStock: 0,
        discount: 0,
        totalPrice:0
    })

    const showMedia = async () => {
        try {
            const result = await apihelper.fetchMedia()
            if (result.status === 200) {
                setImages(result.data.result)
            }

        } catch (error) {
            console.log(error);
            return
        }
    }

    useEffect(() => {
        showMedia()
    }, [])


    const productHandler = async () => {
        try {
            product.featureImg = futereimg._id
            product.relevantImg = Object.values(relevantImg)
            product.totalPrice = product.price - (product.price * (product.discount / 100))
            console.log(product);

            const ValidationResult = Validation(product, "adminproduct")

            if(ValidationResult.length > 0){
                return setError(ValidationResult)
            }
 
            const result = await apihelper.AddProduct(product)

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }   


    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-7">
                    <h2>Add new Post</h2>
                </div>
                <div className="col-12 col-sm-6 col-md-3 d-flex">
                    <Switch />
                    <p className='mt-2'>Published</p>
                </div>
                <div className="col-12 col-sm-6 col-md-2">
                    <Button onClick={productHandler} variant="outlined">Add Product</Button>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12 col-md-4">
                    <p className='fw-bold mb-0'>Product Title</p>
                    <TextField id="outlined-basic" placeholder='Product Title' className='w-100' variant="outlined"
                        onChange={(e) => {
                            setproduct({ ...product, title: e.target.value })
                        }}
                    />
                </div>

                <div className="col-12 col-md-4">
                    <p className='fw-bold mb-0'>Brand</p>
                    <TextField id="outlined-basic" placeholder='Brand' className='w-100' variant="outlined"
                        onChange={(e) => {
                            setproduct({ ...product, Brand: e.target.value })
                        }}
                    />
                </div>

                <div className="col-12 col-md-4">
                    <p className='fw-bold mb-0'>Alias</p>
                    <TextField id="outlined-basic" placeholder='Alias' className='w-100' variant="outlined" 
                        onChange={(e) => {
                            setproduct({ ...product, alias: e.target.value })
                        }}
                    />
                </div>
            </div>

            <div className="container">
                <div className="row mt-3">
                    <div className="col-12 col-md-8">
                        <p className='fw-bold mb-1'>Description</p>
                        <Editor
                            // onInit={(evt, editor) => contentRef.current = editor}
                            // initialValue={postData.content}
                            onKeyUp={(content, editor) => {
                                setproduct({ ...product, discription: editor.getContent() })
                            }}
                            apiKey="0br1siz57qb0y7dwnxtzccahui7x0el1mj2ygoziavfnzohu"
                            init={{
                                selector: 'textarea',
                                height: 500,
                                mobile: {
                                    theme: 'mobile',
                                    plugins: 'autosave lists autolink',
                                    toolbar: 'undo bold italic styleselect'
                                },
                                menubar: true,
                                plugins: ['print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',],
                                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor code codesample | ltr rtl',
                                content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }',
                                images_upload_handler: async (blobInfo, success, failure, _) => {
                                    const file = blobInfo.blob()
                                    console.log(file);
                                    let formdata = new FormData()
                                    formdata.append("file", file)
                                    const body = formdata
                                    const data = await axios.post("http://localhost:5100/admin/upload", body)
                                    if (data.status === 200) {
                                        success(data.data.media.url)
                                    }
                                }
                            }}
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <p className='fw-bold mb-1'>Upload Media</p>
                        <div htmlFor='file' className='mb-2' style={{ width: "100%", height: "180px", border: "1px solid gray" }}>
                            {
                                futereimg._id && (//eslint-disable-next-line
                                    <img src={futereimg.url} width={"100%"} height={"100%"} ></img>
                                )
                            }
                        </div>
                        <ImageDialog showMedia={showMedia} images={images} setfutereimg={setfutereimg} />

                        <MultiImgDialog showMedia={showMedia} images={images} setRelevantImg={setRelevantImg} />

                        {/* <Button variant="contained" className='w-100'>ADD FEATURE IMAGE</Button> */}

                        <TextField id="outlined-basic" className='w-100 mt-3' label="Price" variant="outlined" 
                            onChange={(e) => {
                                setproduct({ ...product, price: e.target.value.toString() })
                            }}
                        />
                        <TextField id="outlined-basic" className='w-100 mt-3' label="Discount" variant="outlined" 
                            onChange={(e) => {
                                setproduct({ ...product, discount: e.target.value.toString() })
                            }}
                        />
                        <TextField id="outlined-basic" className='w-100 mt-3' label="countInstock" variant="outlined" 
                            onChange={(e) => {
                                setproduct({ ...product, countInStock: e.target.value.toString() })
                            }}
                        />

                    </div>
                </div>
            </div>

        </>
    )
}