import QRCode from "qrcode.react"
function GenerateQR({ qrValue, divQr, handleExportQrClick }) {
    return (
        <div className="row  ">
            <div className="col-12 d-flex justify-content-center" 
            
            >
                <div
                    ref={divQr}
                >
                    <QRCode
                                        style={{width:"86px",height:"86px"}}
                    
                    value={`http://localhost:3001/card?employee_id=${qrValue}`} />
                </div>
            </div>
        

        </div>
    )
}

export default GenerateQR