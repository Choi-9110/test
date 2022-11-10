import React, {useState} from "react";
import "./Popup.css";
import DatePicker from "react-datepicker";
import {ko} from 'date-fns/esm/locale';
import Pop from "./pop&banner/Pop";
import Banner from "./pop&banner/Banner";
import moment from "moment";

function PopupData(){
    const [Start_Date, setStart_Date] = useState(null);
	const [End_Date, setEnd_Date] = useState(null);

    const [value , setValue] = useState('분류');

    const [select, setSelect] = useState('제목')

    const [search, setSearch] = useState('');
    const handleSearch = () => {
        console.log("입력한 값:", search)
        console.log("분류:", value)
        console.log('게시 시작일:', moment(Start_Date).format('YYYY/MM/DD'), '게시 종료일:', moment(End_Date).format("YYYY/MM/DD"))
        console.log("제목:", select)
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <>
            <div className="contents">
                <section id="popup_search">
                    <div className="search-form">
                        <ul>
                            <li>
                                <select onChange={(e) => setValue(e.target.value)}>
                                    <option value="분류">분류</option>
                                    <option value="팝업">팝업</option>
                                    <option value="배너">배너</option>
                                </select>

                                <div>
                                    <h4>게시일</h4>
                                    <DatePicker
                                        className="form-control start-date date"
                                        selected={Start_Date}
                                        onChange={date => setStart_Date(date)}
                                        selectsStart
                                        startDate={Start_Date}
                                        endDate={End_Date}
                                        locale={ko}
                                        dateFormat="yyyy년 MM월 dd일 (eee)"
                                        minDate={new Date()}
                                        closeOnScroll={true}
                                    />
                                    <span>~</span>
                                    <DatePicker
                                        className="form-control end-date date"
                                        selected={End_Date}
                                        onChange={date => setEnd_Date(date)}
                                        selectsEnd
                                        startDate={Start_Date}
                                        endDate={End_Date}
                                        minDate={Start_Date}
                                        locale={ko}
                                        dateFormat="yyyy년 MM월 dd일 (eee)"
                                        closeOnScroll={true}
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="search-box">
                        <select>
                            <option value="제목" onChange={e => setSelect(e.target.value)}>제목</option>
                        </select>
                        <input type="text" className="search-val" placeholder="검색어를 입력해주세요." onChange={e => setSearch(e.target.value)} onKeyDown={handleKeyPress}/>
                    </div>
                </section>

                {value === "분류" || value === "팝업" ? <Pop/> : value === "배너" && <Banner/>}
            </div>
        </>
    )
}

export default PopupData;