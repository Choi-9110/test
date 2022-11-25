import React, { useState } from "react";
import {Link} from "react-router-dom";
import "./Tabmenu.css";
import Sidebar from "../../sidebarmenu/Sidebar";
import Dateprofile from "../../Dateprofile";
import BalanceGameData from "./games/BalanceGame/BalanceGame";
import UpDownData from "./games/Up&Down/UpDown";
import MulitpleChoiceData from "./games/Multiple choice/MultipleChoice";
import ScopeData from "./games/Scope/Scope";
import ChooseScoreData from "./games/ChooseScore/ChooseScore";

function Tabmenu(){
    const [tabmenu, setTabmenu] = useState(0);

    return (
        <>
            <div id="nav">
                <h1 className="logo"><Link to="/dashboard">위시폴</Link></h1>
                <Sidebar/>
            </div>
            <div id="container2">
                <Dateprofile />
                <ul className="tab-menu">
                    <li className={parseInt(tabmenu) === 0 ? "on":""} onClick={() => setTabmenu(parseInt(0))}><a>밸런스 게임</a></li>
                    <li className={parseInt(tabmenu) === 1 ? "on":""} onClick={() => setTabmenu(parseInt(1))}><a>UP&DOWN</a></li>
                    <li className={parseInt(tabmenu) === 2 ? "on":""} onClick={() => setTabmenu(parseInt(2))}><a>객관식 선택</a></li>
                    <li className={parseInt(tabmenu) === 3 ? "on":""} onClick={() => setTabmenu(parseInt(3))}><a>별점 리뷰</a></li>
                    <li className={parseInt(tabmenu) === 4 ? "on":""} onClick={() => setTabmenu(parseInt(4))}><a>점수 선택</a></li>
                </ul>

                {tabmenu === 0 ? <BalanceGameData/> : tabmenu === 1 ? <UpDownData/> : tabmenu === 2 ? <MulitpleChoiceData/> : tabmenu === 3 ? <ScopeData/> : tabmenu === 4 && <ChooseScoreData/>}
            </div>
        </>
    )
}

export default Tabmenu;