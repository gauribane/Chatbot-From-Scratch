import React,{Fragment} from "react";
import "./style.css"

const Msg=(props)=>{
    return(
        <Fragment>
        {/* Incoming Message */}
        {props.incomingMsg && (
            <div className="msgContainerBot">
            <div className="botAvtar">
                <p className="botText">
                    B
                </p>
            </div>
        <div className="incomingMsgBox">
            <h1 className="incomingMsgText">{props.Message}</h1>
        </div>
        </div>
        )}
        {/* Sent Message */}
        {props.sentMsg && (
            <div className="msgContainerUser">
         <div className="userAvtar">
                <p className="botText">
                    U
                </p>
            </div>   
        <div className="sentMsgBox">
            <h1 className="sentMsgText">{props.Message}</h1>
        </div>
        
        </div>
        )}
        </Fragment>
    )
}

export default Msg;