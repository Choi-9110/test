import React, {useState} from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import {ko} from 'date-fns/esm/locale';
import "./Fullmember.css";
import moment from "moment";

function FullmemberData(){
    const [Start_Date, setStart_Date] = useState(null);
	const [End_Date, setEnd_Date] = useState(null);

	const [value, setValue] = useState("회원유형별보기");

	const [select, setSelect] = useState("선택");

	const [search, setSearch] = useState("");

	const handleSearch = () => {
        console.log("입력한 값:", search)
        console.log("회원유형별보기:", value)
        console.log('게시 시작일:', moment(Start_Date).format('YYYY/MM/DD'), '게시 종료일:', moment(End_Date).format("YYYY/MM/DD"))
        console.log("선택:", select)
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter') {
            handleSearch();
        }
    }


    return (
        <div className="contents">
			<section id="full-member_search">
				<div className="search-form">
					<ul>
						<li>
							<select onChange={e => setValue(e.target.value)}>
								<option value="회원유형별보기">회원유형별보기</option>
								<option value="일반회원">일반회원</option>
								<option value="패널회원">패널회원</option>
							</select>

							<div>
								<h4>가입기간</h4>
								<DatePicker
                                    className="w180 form-control start-date date"
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
					<select onChange={e => setSelect(e.target.value)}>
						<option value="선택">선택</option>
						<option value="제목">제목</option>
						<option value="내용">내용</option>
						<option value="제목+내용">제목+내용</option>
					</select>
					<input type="text" className="search-val" name="" placeholder="검색어를 입력해주세요." onChange={e => setSearch(e.target.value)} onKeyDown={handleKeyPress}/>
				</div>
			</section>

			<section id="full-member_list">
				<div className="search-result">
					<div className="sel-tpye">
						<p>전체:<span>3.543</span>건</p>
					</div>

					<div className="sel-number">
						<select>
							<option value="10개씩 보기">10개씩 보기</option>
							<option value="20개씩 보기">20개씩 보기</option>
							<option value="50개씩 보기">50개씩 보기</option>
							<option value="100개씩 보기">100개씩 보기</option>
						</select>
					</div>
				</div>

				<table>
					<colgroup>
						<col className="num" />
						<col className="state" />
						<col />
						<col className="state" />
						<col className="date" />
						<col className="date" />
						<col className="num" />
						<col className="management" />
					</colgroup>

					<thead>
						<tr>
							<th scope="col">NO.</th>
							<th scope="col">회원유형</th>
							<th scope="col">아이디</th>
							<th scope="col">닉네임</th>
							<th scope="col">회원가입일</th>
							<th scope="col">최근접속일</th>
							<th scope="col">포인트</th>
							<th scope="col">관리</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td className="num">50</td>
							<td className="state">일반회원</td>
							<td>id@naver.com</td>
							<td className="state">위시폴</td>
							<td className="date">2022.10.01</td>
							<td className="date">2022.10.01</td>
							<td className="num">500</td>
							<td className="management">
								<Link to="/member/memberinformation" className="btn btnCF">보기</Link>
								<a href="#" className="btn btnL">삭제</a>
							</td>
						</tr>
						<tr>
							<td className="num">49</td>
							<td className="state">일반회원</td>
							<td>id@naver.com</td>
							<td className="state">위시폴</td>
							<td className="date">2022.10.01</td>
							<td className="date">2022.10.01</td>
							<td className="num">12,000</td>
							<td className="management">
								<a href="#" className="btn btnCF">보기</a>
								<a href="#" className="btn btnL">삭제</a>
							</td>
						</tr>
						<tr>
							<td className="num">48</td>
							<td className="state">패널회원</td>
							<td>id@naver.com</td>
							<td className="state">위시폴</td>
							<td className="date">2022.10.01</td>
							<td className="date">2022.10.01</td>
							<td className="num">1,000</td>
							<td className="management">
								<a href="#" className="btn btnCF">보기</a>
								<a href="#" className="btn btnL">삭제</a>
							</td>
						</tr>
						<tr>
							<td className="num">47</td>
							<td className="state">패널회원</td>
							<td>id@naver.com</td>
							<td className="state">위시폴</td>
							<td className="date">2022.10.01</td>
							<td className="date">2022.10.01</td>
							<td className="num">5,000</td>
							<td className="management">
								<a href="#" className="btn btnCF">보기</a>
								<a href="#" className="btn btnL">삭제</a>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		</div>
    )
}

export default FullmemberData;