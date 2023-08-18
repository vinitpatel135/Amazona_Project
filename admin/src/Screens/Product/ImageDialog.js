import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import apihelper from '../../Common/ApiHelper';
import { useState } from 'react';


export default function ImageDialog(props) {
    const { images, showMedia, setfutereimg } = props
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [tempselectImg, settempselectImg] = useState({})
    // const isSelected = (image) => Border.some((x) => x._id === image._id);

    const handleClickOpen = async () => {
        setOpen(true)
        showMedia()
    };


    const handleClose = () => {
        settempselectImg({})
        setOpen(false);
    };

    // eslint-disable-next-line
    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    // eslint-disable-next-line
    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    const UploadMedia = async (file) => {
        try {
            const form = new FormData()
            form.append("file", file)
            const result = await apihelper.UploadMedia(form)
            if (result.status === 200) {
                handleClickOpen()
            }
        } catch (error) {
            console.log(error);
            return
        }
    }

    return (
        <>
            <React.Fragment>
                <Button variant="contained" className='w-100' onClick={handleClickOpen}>
                    ADD FEATURE IMAGE
                </Button>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                    sx={{ zIndex: "10000" }}
                >
                    <DialogTitle className='fw-bold'>Upload Image</DialogTitle>
                    <DialogContent className='row justify-content-center m-0'>

                        <label
                            htmlFor="file"
                            className="col-12 mb-3 col-sm-6 overflow-hidden col-md-6 d-flex align-items-center justify-content-center"
                            style={{
                                height: "15rem",
                                border: "2px dashed #1976d2",
                            }}
                        >
                            <>
                                <AddAPhotoIcon className="fs-1" color="primary" />
                                <input
                                    onChange={(e) => UploadMedia(e.target.files[0])}
                                    type="file"
                                    id="file"
                                    hidden
                                />
                            </>
                        </label>
                        {images.map((image, index) => (
                            <div className='col-12 mb-3 col-sm-6 overflow-hidden col-md-6' key={index} style={{ minWidth: "50%", flex: "0 0 auto" }}>
                                {image.mimetype === "image" ? (// eslint-disable-next-line
                                    <img key={index} src={image.url} alt={`Image ${index}`}
                                        style={{ width: "100%", height: "15rem", objectFit: "cover", border:`${tempselectImg._id === image._id ? "2px solid blue" : ""}` }}
                                        onClick={() => {
                                            if(tempselectImg._id !== image._id){
                                                settempselectImg(image)
                                            }else{
                                                settempselectImg({})
                                            }
                                        }}
                                        // onClick={() => {
                                        //     if (isSelected(image)) {
                                        //         setBorder(Border.filter(selected => selected._id !== image._id));
                                        //         setSelectImg(Border.filter(selected => selected._id !== image._id));
                                        //     } else {
                                        //         setBorder([...Border, image]);
                                        //         setSelectImg([...Border, image])
                                        //     }
                                        // }} 
                                        />
                                ) : (
                                    <video src={image.url} key={index} alt={`video ${index}`} muted={true} style={{ width: "100%", height: "15rem", objectFit: "cover" }} onMouseEnter={(e) => {
                                        e.target.play()
                                    }} onMouseLeave={(e) => {
                                        e.target.pause()
                                    }}></video>
                                )}
                            </div>
                        ))}

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={()=>{
                            handleClose()
                            if(!tempselectImg._id){
                                setfutereimg({})
                            }
                        }}>Close</Button>
                        <Button onClick={() => {
                            setOpen(false)
                            if(!tempselectImg._id){
                                return alert("please select image")
                            }
                            setfutereimg(tempselectImg)
                        }} >Save</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}