import React from "react";
import Sidebar from "../../../sidebarmenu/Sidebar";
import Dateprofile from "../../../Dateprofile";
import {Link} from "react-router-dom";
import WithdrawalMembersData from "./WithdrawalMembersData";

function WithdrawalMembers(){
    return (
        <>
            <div id="nav">
                <h1 className="logo"><Link to="/dashboard">위시폴</Link></h1>
                <Sidebar/>
            </div>
            <div id="container2">
                <Dateprofile />
                <WithdrawalMembersData/>
            </div>
        </>
    )
}

export default WithdrawalMembers;