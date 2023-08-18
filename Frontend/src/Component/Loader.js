export default function Loader(props) {

    const {isLoading} = props

    if(isLoading){
        return (
            <>
                <div className="d-flex flex-column justify-content-center align-items-center gap-2" style={{position:"absolute", left:0, top:0, width:"100%", height:"82.8vh", zIndex:"10", backgroundColor:"#fff"}}>
                    <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h3 className="text-info">Loading...</h3>
                </div>
            </>
        )
    }

    return ""
    
}