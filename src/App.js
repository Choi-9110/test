import React from "react";
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import Login from "./components/Login";
import "./components/css/total.css";
import Dashboard from "./components/Menus/Basic management/Dashboard";
import Site from "./components/Menus/Basic management/Site Basic Information/Site";
import Popup from "./components/Menus/Basic management/Pop-up/Popup";
import Push from "./components/Menus/Basic management/Push Notification Management/Push";
import Notice from "./components/Menus/Basic management/Notice Event/Notice";
import ForbiddenWords from "./components/Menus/Basic management/forbidden word management/ForbiddenWords";
import Poll1 from "./components/Menus/poll/PollList/Poll1";
import Fullmember from "./components/Menus/Member management/Full member information/Fullmember";
import Log from "./components/Menus/Member management/Log management/Log";
import WithdrawalMembers from "./components/Menus/Member management/Manage withdrawal members/WithdrawalMembers";
import Point from "./components/Menus/Member management/Point management/Point";
import WithdrawalApplication from "./components/Menus/Member management/Withdrawal application management/WithdrawalApplication";
import ApplicationList from "./components/Menus/poll/application list/ApplicationList";
import ClosedList from "./components/Menus/poll/closed list/ClosedList";
import FullList from "./components/Menus/poll/full list/FullList";
import ProgressingList from "./components/Menus/poll/list in progress/ProgressingList";
import WaitingList from "./components/Menus/poll/waiting list/WaitingList";
import ClosedList2 from "./components/Menus/poll2/closed list2/ClosedList2";
import FullList2 from "./components/Menus/poll2/full list2/FullList2";
import ProgressingList2 from "./components/Menus/poll2/list in progress2/ProgressingList2";
import WaitingList2 from "./components/Menus/poll2/waiting list2/WaitingList2";
import NoticeEdit from "./components/Menus/Basic management/Notice Event/Notice Edit/NoticeEdit";
import PushReport from "./components/Menus/Basic management/Push Notification Management/pushReport/PushReport";
import CreateNewPoint from "./components/Menus/Member management/Point management/create new point/CreateNewPoint";
import History from "./components/Menus/Member management/Point management/Point history management/History";
import PushSending from "./components/Menus/Basic management/Push Notification Management/push sending/PushSending";
import Tabmenu from "./components/Menus/poll/PollList/TabMenu/Tabmenu";
import PopupRegistration from "./components/Menus/Basic management/Pop-up/popup registration/PopupRegistration";
import MemberInformation from "./components/Menus/Member management/Full member information/Member information management/MemberInformation";
import HistoryMangement from "./components/Menus/Member management/Withdrawal application management/Withdrawal request history/HistoryManagement";
import MemberInfo from "./components/Menus/Member management/Manage withdrawal members/Withdrawal Member Info/MemberInfo";
import MemberHistory from "./components/Menus/Member management/Manage withdrawal members/Withdrawal Member History/MemberHistory";


function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />}/>
                
                {/* 기본 관리 */}
                <Route path="dashboard" element={<Dashboard />}/>
                    <Route path="sitebasics" element={<Site/>}/>
                    <Route path="popuplist" element={<Popup/>}/>
                        <Route path="popuplist/popupregistration" element={<PopupRegistration/>}/>

                    <Route path="pushnotification" element={<Push/>}/>
                        <Route path="pushnotification/pushreport" element={<PushReport/>}/>
                        <Route path="pushnotification/pushsending" element={<PushSending/>}/>

                    <Route path="noticeevent" element={<Notice/>}/>
                        <Route path="noticeevent/noticeedit" element={<NoticeEdit/>}/>

                    <Route path="forbiddenwords" element={<ForbiddenWords/>}/>

                {/* 회원 관리*/}
                <Route path="member" element={<Fullmember/>}/>
                    <Route path="member/memberinformation" element={<MemberInformation/>}/>
                    <Route path="point" element={<Point/>}/>
                        <Route path="point/createnewpoint" element={<CreateNewPoint/>}/>
                        <Route path="point/history" element={<History/>}/>

                    <Route path="withdrawal" element={<WithdrawalApplication/>}/>
                        <Route path="withdrawal/withdrawalmanagement" element={<HistoryMangement/>}/>
                    <Route path="log" element={<Log/>}/>
                    <Route path="withdrawalmember" element={<WithdrawalMembers/>}/>
                        <Route path="withdrawalmember/memberinformation" element={<MemberInfo/>}/>
                        <Route path="withdrawalmember/memberinformation/memberhistory" element={<MemberHistory/>}/>

                {/* 1차 폴 */}
                <Route path="polltotallist" element={<Poll1/>}/>
                    <Route path="polltotallist/pollgamelist" element={<Tabmenu/>}/>

                <Route path="fulllist1" element={<FullList/>}/>
                <Route path="waitinglist1" element={<WaitingList/>}/>
                <Route path="inglist1" element={<ProgressingList/>}/>
                <Route path="closedlist1" element={<ClosedList/>}/>
                <Route path="applicationlist1" element={<ApplicationList/>}/>

                {/* 2차 폴 */}
                <Route path="fulllist2" element={<FullList2/>}/>
                <Route path="waitinglist2" element={<WaitingList2/>}/>
                <Route path="inglist2" element={<ProgressingList2/>}/>
                <Route path="closedlist2" element={<ClosedList2/>}/>

                <Route
                    path="*"
                    element={
                        <main style={{padding: "1rem"}}>
                            <p>There's nothing here!</p>
                        </main>}/>
            </Routes>
        </BrowserRouter>
    )
    
}

export default App;