import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {ko} from 'date-fns/esm/locale';
import "./NoticeEdit.css";
import client from "../../../../client";
import { Link } from "react-router-dom";

function NoticeEditData(){
    const [Start_Date, setStart_Date] = useState(null);
	const [End_Date, setEnd_Date] = useState(null);

	const [select, setSelect] = useState("");

	const [Title, setTitle] = useState("");
	const handleTitle = (e) => {
		setTitle(e.target.value);
	}
	
	const [Thumbnail_Image_Uri, setThumbnail_Image_Uri] = useState("")
	const [freeImage2, setfreeImage2] = useState('');
	const handlefreeImage2 = (fileBlob) => {       
		const reader = new FileReader();         
		reader.readAsDataURL(fileBlob);
		setThumbnail_Image_Uri(fileBlob.name);       
		return new Promise((resolve) => {        
			reader.onload = () => {         
				setfreeImage2(reader.result);      
				resolve();
			};
		});
	};

	const [Image_Uri, setImage_Uri] = useState("");
	
	const [Image, setImage] = useState("");
	const [freeImage, setfreeImage] = useState('');
	const handlefreeImage = (fileBlob) => {       
		const reader = new FileReader();         
		reader.readAsDataURL(fileBlob);
		setImage(fileBlob.name);
		setImage_Uri(fileBlob.name);    
		return new Promise((resolve) => {        
			reader.onload = () => {         
				setfreeImage(reader.result);    
				resolve();
			};
		});
	};

	const [Content, setContent] = useState("");
	const handleContents = (e) => {
		setContent(e.target.value);
	}

	const [endcheck, setEndcheck] = useState(false);

	const Hit = 0;

	const onSubmitHandler = async(e) => {
		e.preventDefault();
		if(select === 0){
			await client.post('notice-board/create', {
				Title,
				Image,
				Content,
				Hit
			})
		} else if(select === 1){
			await client.post('event-board/create', {
				Title,
				Content,
				Start_Date,
				End_Date,
				Thumbnail_Image_Uri,
				Image_Uri
			}).then(({data}) => console.log(data))	
		} else if(select !== 0 || 1){
			alert("분류를 선택해주세요.");
			return false	
		}
		alert("등록 되었습니다.");
		document.location.href="/noticeevent";
	}

    return (
        <div className="contents">
			<h3 className="notice-edit_h">공지사항/이벤트 작성/수정</h3>

			<section id="notice-edit_write">
				<div className="item">
					<p className="title">분류를 선택해주세요.</p>
					<div className="desc">
						<select onChange={(e) => setSelect(parseInt(e.target.value))}>
							<option value="선택">선택</option>
							<option value="0">공지사항</option>
							<option value="1">이벤트</option>
						</select>
					</div>
				</div>
				<div className="item">
					<p className="title">제목을 입력해주세요.</p>
					<div className="desc">
						<div><input type="text" onChange={handleTitle} maxLength="30"/></div>
						<p className="comment">30자 이내로 적어주세요.</p>
					</div>
				</div>
				<div className="item">
					<p className="title">이벤트 썸네일 이미지 첨부해주세요.</p>
					<div className="desc">
						<div className="img-photo">
							<label id='btnAtt'><input type='file' multiple={true} onChange={(e) => {handlefreeImage(e.target.files[0])}}/></label>
							<div id="photo-view">{freeImage && <img className="preview-img" src={freeImage} alt="preview-img"/>}</div>
						</div>
						<p className="comment">권장 크기 : 1000 x 500</p>
					</div>
				</div>
				<div className="item">
					<p className="title">내용을 입력해주세요.</p>
					<div className="desc">
						<div><textarea id="" name="" placeholder="" onChange={handleContents}></textarea></div>
					</div>
				</div>
				<div className="item">
					<p className="title">본문 이미지 첨부해주세요.</p>
					<div className="desc">
						<div className="img-photo">
							<label id='btnAtt'><input type='file' multiple={true} onChange={(e) => {handlefreeImage2(e.target.files[0])}}/></label>
							<div id="photo-view">{freeImage2 && <img className="preview-img" src={freeImage2} alt="preview-img"/>}</div>
						</div>
						<p className="comment">권장 크기 : 1000 x 500</p>
					</div>
				</div>
				<div className="item">
					<p className="title">게시 기간을 입력해주세요.</p>
					<div className="desc">
						<div className="input-group">
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
                                placeholderText="폴 시작일"
                                closeOnScroll={true}
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
							<div className={!endcheck ? "" : "no"}>
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
									placeholderText="폴 종료일"
									closeOnScroll={true}
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
						<p className="chkBox"><input type="checkbox" id="agr-chk" onClick={() => setEndcheck(!endcheck)}/><label htmlFor="agr-chk">종료일 없음</label></p>
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
			</section>

			<section id="notice-edit_btn-wrap">
				<Link to="/noticeevent" className="btn btnL">목록보기</Link>
				<form className="btn btnCF" onClick={onSubmitHandler}><a>등록/수정</a></form>
			</section>
		</div>
    )
}

export default NoticeEditData;