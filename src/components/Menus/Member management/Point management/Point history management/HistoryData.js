import React from "react";
import "./History.css";

function HistoryData(){
    return (
        <div className="contents">
			<h3 className="history_h">포인트 내역 관리</h3>

			<section id="history_write">
				<div className="item">
					<p className="title">일시</p>
					<div className="desc">2022-10-01 09:00:00</div>
				</div>
				<div className="item">
					<p className="title">거래유형</p>
					<div className="desc">
						<div><input type="text" value="수령/출금" disabled /></div>
					</div>
				</div>
				<div className="item">
					<p className="title">내역</p>
					<div className="desc">
						<div><input type="text" value="내역" /></div>
					</div>
				</div>
				<div className="item">
					<p className="title">거래 포인트</p>
					<div className="desc">
						<div><input type="text" value="3,000" /></div>
					</div>
				</div>
				<div className="item">
					<p className="title">수령 아이디</p>
					<div className="desc">abcdef@gmail.com</div>
				</div>
				<div className="item">
					<p className="title">이름</p>
					<div className="desc">홍길동</div>
				</div>
				<div className="item">
					<p className="title">닉네임</p>
					<div className="desc">김뾰로롱</div>
				</div>
				<div className="item">
					<p className="title">수령인 포인트 잔액</p>
					<div className="desc">
						<div><input type="text" value="2,000" disabled /></div>
					</div>
				</div>
			</section>

			<section id="history_btn-wrap">
				<a href="#" className="btn btnL">목록보기</a>
				<a href="#" className="btn btnCF">수정</a>
			</section>
		</div>
    )
}

export default HistoryData;