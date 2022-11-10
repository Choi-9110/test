import React, {useState} from "react";
import "./PopupRegistration.css";
import DatePicker from "react-datepicker";
import {ko} from 'date-fns/esm/locale';
import client from "../../../../client";

function PopupRegistrationData(){
    const [Start_Date, setStart_Date] = useState(null);
	const [End_Date, setEnd_Date] = useState(null);

	const [select, setSelect] = useState(0);

	const [Title, setTitle] = useState();

	const [Image, setImage] = useState();

	const [freeImage, setfreeImage] = useState('');
	const handlefreeImage = (fileBlob) => {       
		const reader = new FileReader();         
		reader.readAsDataURL(fileBlob);
		setImage(fileBlob.name);       
		return new Promise((resolve) => {        
			reader.onload = () => {         
				setfreeImage(reader.result);          
				resolve();
			};
		});
	};

	const OnSubmithandler = async(e) => {
		e.preventDefault();
		if(select === 2){
			await client.post('/banner/create', {
				Title,
				Image
			})
			alert("등록 성공");
			document.location.href='/popuplist';
		} else{
			throw new Error('에러!');
		}
		
	}

    return (
        <div className="contents">
			<h3 className="registration_h">팝업/배너 등록/수정</h3>

			<section id="registration_write">
				<div className="item">
					<p className="title">분류를 선택해주세요.</p>
					<div className="desc" onChange={e => setSelect(parseInt(e.target.value))}>
						<select>
							<option value="0">선택</option>
							<option value="1">팝업</option>
							<option value="2">배너</option>
						</select>
					</div>
				</div>
				<div className="item">
					<p className="title">제목을 입력해주세요.</p>
					<div className="desc">
						<div><input type="text" onChange={(e) => setTitle(e.target.value)} maxLength="30"/></div>
						<p className="comment">30자 이내로 적어주세요.</p>
					</div>
				</div>
				<div className="item">
					<p className="title">등록일</p>
					<div className="desc">
						<div><input type="text" value="2022-10-01" disabled /></div>
					</div>
				</div>
				<div className="item">
					<p className="title">게시 기간을 입력해주세요.</p>
					<div className="desc">
						<div className="input-group">
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
                                placeholderText="폴 시작일"
                            />
							{/* <select>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
							</select>
							<span className="txt">시</span>
							<select>
								<option value="00">00</option>
								<option value="10">10</option>
								<option value="20">20</option>
								<option value="30">30</option>
								<option value="40">40</option>
								<option value="50">50</option>
								<option value="60">60</option>
							</select>
							<span className="txt">분</span> */}
							<span className="aa">~</span>
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
                                placeholderText="폴 종료일"
                            />
							{/* <select>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
							</select>
							<span className="txt">시</span>
							<select>
								<option value="00">00</option>
								<option value="10">10</option>
								<option value="20">20</option>
								<option value="30">30</option>
								<option value="40">40</option>
								<option value="50">50</option>
								<option value="60">60</option>
							</select>
							<span className="txt">분</span> */}
						</div>
					</div>
				</div>
				<div className="item">
					<p className="title">게시 상태를 체크해주세요.</p>
					<div className="desc">
						<span><input type="radio" id="type-1" name="type" /><label className="type2" htmlFor="type-1">게시 대기</label></span>
						<span><input type="radio" id="type-2" name="type" /><label className="type2" htmlFor="type-2">게시 중</label></span>
						<span><input type="radio" id="type-3" name="type" /><label className="type2" htmlFor="type-3">게시 중지</label></span>
					</div>
				</div>
				<div className="item">
					<p className="title">링크를 입력해주세요.</p>
					<div className="desc">
						<p>
							<span className="txt">앱 링크</span>
							<input type="text" className="w180" placeholder="Key" /> <input type="text" className="w180"  placeholder="Value" />
						</p>
						<p>
							<span className="txt">웹 링크</span>
							<input type="text" className="w80" placeholder="http://" />
						</p>
					</div>
				</div>
				<div className="item">
					<p className="title">팝업 이미지를 입력해주세요.</p>
					<div className="desc">
						<div className="img-photo">
							<label id='btnAtt'><input type='file' multiple={true} onChange={(e) => {handlefreeImage(e.target.files[0])}} /></label>
							<div id="photo-view">{freeImage && <img className="preview-img" src={freeImage} alt="preview-img"/>}</div>
						</div>
						<p className="comment">권장 크기 : 1000 x 500</p>
					</div>
				</div>
			</section>

			<section id="registration_btn-wrap">
				<a href="#" className="btn btnL">목록보기</a>
				<a className="btn btnCF" onClick={OnSubmithandler}>등록/수정</a>
			</section>
		</div>
    )
}

export default PopupRegistrationData;