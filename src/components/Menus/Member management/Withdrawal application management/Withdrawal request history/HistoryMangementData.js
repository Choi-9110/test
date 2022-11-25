import React from "react";
import "./HistoryManagement.css";

function HistoryMangementData(){
    return (
        <div className="contents">
			<h3 className="history-m_h">출금신청 내역 관리</h3>

			<section id="history-m_write">
				<div className="item">
					<p className="title">상태</p>
					<div className="desc">대기/완료</div>
				</div>
				<div className="item">
					<p className="title">신청 유형</p>
					<div className="desc">네이버페이/계좌 출금</div>
				</div>
				<div className="item">
					<p className="title">아이디</p>
					<div className="desc">
						<div><input type="text" value="abcd123@gmail.com" disabled /></div>
					</div>
				</div>
				<div className="item">
					<p className="title">이름</p>
					<div className="desc">
						<div><input type="text" value="홍길동" disabled /></div>
					</div>
				</div>
				<div className="item">
					<p className="title">휴대폰 번호</p>
					<div className="desc">
						<div><input type="text" value="010-1234-5678" disabled /></div>
					</div>
				</div>
				<div className="item">
					<p className="title">신청 날짜</p>
					<div className="desc">
						<div><input type="text" value="2022-10-01 09:00:00" disabled /></div>
					</div>
				</div>
				<div className="item">
					<p className="title">보유 포인트</p>
					<div className="desc">
						<div><input type="text" value="5,000" disabled /></div>
					</div>
				</div>
				<div className="item">
					<p className="title">신청 포인트</p>
					<div className="desc">
						<div><input type="text" value="3,000" disabled /></div>
					</div>
				</div>
				<div className="item">
					<p className="title">예정 지급액</p>
					<div className="desc">
						<div><input type="text" value="신청 포인트에서 12% 공제한 금액" disabled /></div>
					</div>
				</div>
				<div className="item">
					<p className="title">입금 은행</p>
					<div className="desc">
						<select disabled>
							<option value="은행">은행</option>
							<option value="KB은행">KB은행</option>
							<option value="기업은행">기업은행</option>
						</select>
					</div>
				</div>
				<div className="item">
					<p className="title">예금주/계좌번호</p>
					<div className="desc">
						<div>
							<input type="text" className="w100p" value="예금주" disabled />
							<input type="text" className="w80" value="123-456789-01-011" disabled />
						</div>
					</div>
				</div>
				<div className="item">
					<p className="title">신분증 사본<i></i></p>
					<div className="desc">
						<div className="img-photo">
							<label id='btnAtt'><input type='file' multiple='multiple' /></label>
							<div id="photo-view"></div>
						</div>
					</div>
				</div>
			</section>

			<section id="history-m_btn-wrap">
				<a href="#" className="btn btnL">목록보기</a>
			</section>
		</div>
    )
}

export default HistoryMangementData;