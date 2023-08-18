

export default function MessageBox(props) {
    const {error , seterror} = props

    return (
        <div className={error ? "d-block" : "d-none "}>

            <div className={`modal fade ${error ? "show" : ""}`} style={{display: error ?  "block" : "" , height:"40vh"}} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true">
                <div className="modal-dialog"  style={{zIndex:"10000"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Error</h5>
                        </div>
                        <div className="modal-body">
                            {error}
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => seterror("")} className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div onClick={() => seterror("")} style={{position:"fixed",transition:"all 0.3 ease-in-out", top:0, left:0, background:"#000", minWidth:"100%", minHeight:"100vh", zIndex:"1000", opacity:'0.5'}}>

            </div>
        </div>
    )
}