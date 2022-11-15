import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from 'date-fns/esm/locale';
import client from "../../../../client";
import "./BalanceGame.css";
import InputEmoji from "react-input-emoji";

function BalanceGame(){
	// 파일 업로드를 위한  폼데이터 
	const formData = new FormData();

	const [Start_Date, setStart_Date] = useState(null);
	const [End_Date, setEnd_Date] = useState(null);
	
	

	const [Title, setTitle] = useState("");

	const [Select_1, setSelect_1] = useState("");
    const handleSelect_Text_1 = (e) => {
        setSelect_1(e.target.value);
    }

	

	const [Select_2, setSelect_2] = useState("");
    const handleSelect_Text_2 = (e) => {
        setSelect_2(e.target.value);
    }

	const [Rewards, setRewards] = useState();
	const handleRewards = (e) => {
		setRewards(parseInt(e.target.value));
	}

	const [Max_Personnel, setMax_Personnel] = useState();
	const handleMax_Personnel = (e) => {
		setMax_Personnel(parseInt(e.target.value));
	}

	const [Image, setImage] = useState('');

	const [freeImage, setfreeImage] = useState('');
	const handlefreeImage = (fileBlob) => {
		const reader = new FileReader();
		if(fileBlob){
			reader.readAsDataURL(fileBlob);
			setImage(fileBlob);
		}

		return new Promise((resolve) => {
			reader.onload = () => {
				setfreeImage(reader.result);
				resolve();
			};
		});	
	};

	const removeImg = () => {
		setImage('')
		setfreeImage('')
	}

	
	const [Select_Image_1, setSelect_Image_1] = useState('');

	const [freeImage1, setfreeImage1] = useState('');
	const handlefreeImage1 = (fileBlob) => {       
		const reader = new FileReader();         
		reader.readAsDataURL(fileBlob);

		setSelect_Image_1(fileBlob);       
		return new Promise((resolve) => {        
			reader.onload = () => {         
				setfreeImage1(reader.result);          
				resolve();
			};
		});
	};

	
	const [Select_Image_2, setSelect_Image_2] = useState('');

	const [freeImage2, setfreeImage2] = useState('');
	const handlefreeImage2 = (fileBlob) => {       
		const reader = new FileReader();         
		reader.readAsDataURL(fileBlob);
		
		setSelect_Image_2(fileBlob);   
		return new Promise((resolve) => {
			reader.onload = () => {
				setfreeImage2(reader.result);          
				resolve();
			};
		});
	};

	const Type = 0;
    const Max_Choice = 1;
    const Random = 0;
    const Select_Image_3 = null;
    const Select_3 =null;
    const Select_Image_4 = null;
    const Select_4 =null;
    const Select_Image_5 = null;
    const Select_5 =null;
    const Select_Image_6 = null;
    const Select_6 =null;
    const Select_Image_7 = null;
    const Select_7 =null;
    const Select_Image_8 = null;
    const Select_8 =null;

    const State = 0;

    const Scale_start = 0;
    const Scale_End = 0;
    const Scale_Unit = 0;

    const Scale_Start_Text = null;
    const Scale_End_Text = null;
    const Scale_Mid_Text = null;
	const Is_Using_Others = 0;
	const Regist_M_Idx = null;
	
	//formData.append('files', )
	formData.append('files', Image)
	formData.append('files', Select_Image_1)
	formData.append('files', Select_Image_2)
	// for (let key of formData.keys()) {
	// 		console.log(key);
	// 	  }
	// 	// FormData의 value 확인
	//   for (let value of formData.values()) {
	// 	console.log(value);
	//   }
	const onSubmitHandler = async(e) => {
		e.preventDefault();

		 client.post('/uploads/fileups', formData).then((res) =>{

			console.log(res.data.returnValue.length);

			console.log(res)
			const Image = res.data.returnValue[0];
			const Select_Image_1 = res.data.returnValue[1];
			const Select_Image_2 = res.data.returnValue[2];
			
			client.post('/primary-poll/create', {
				Title,
				Image,
				State,
				Type,
				Rewards,
				Max_Personnel,
				Max_Choice,
				Random,
				Start_Date,
				End_Date,
				Is_Using_Others,
				Regist_M_Idx
			}).then(({data}) => {
				const primaryPoll = data.Q_Idx;

				client.post('/primary-poll-item/create', {
					primaryPoll,
					Select_Image_1,
					Select_1,
					Select_Image_2,
					Select_2,
					Select_Image_3,
					Select_3,
					Select_Image_4,
					Select_4,
					Select_Image_5,
					Select_5,
					Select_Image_6,
					Select_6,
					Select_Image_7,
					Select_7,
					Select_Image_8,
					Select_8,
					Scale_start,
					Scale_End,
					Scale_Unit,
					Scale_Start_Text,
					Scale_Mid_Text,
					Scale_End_Text
				})
				

			});

		

		}).catch(err =>{
			alert('파일 업로드 실패 - 관리자에게 문의하세요');
		})
		
		
		

		alert("등록 되었습니다.");
        // document.location.href="/polltotallist";
	};

    return (
		<>
			<div className="contents">
				<section id="balancegame_write">
					<div className="balancegame_left">
						<div className="item">
							<p className="title">질문을 입력해주세요.</p>
							<div className="desc">
								<div>
									<InputEmoji
										onChange={e => setTitle(e)}
										placeholder=""
										maxLength="30"
									/>
								</div>
								<p className="comment">30자 이내로 적어주세요.</p>
							</div>
						</div>
						<div className="item">
							<p className="title">질문 이미지를 추가해주세요.</p>
							<div className="desc">
								<div className="img-photo">
									<label id='btnAtt'><input type='file' multiple={true} onChange={(e) => {handlefreeImage(e.target.files[0]); e.target.value="";}}/></label>
									{freeImage && <div id="photo-view"><img className="preview-img" src={freeImage} alt="preview-img"/><input type="button" value="X" className="deleteImg" onClick={removeImg}/></div>}
								</div>
								<p className="comment">권장 크기 : 1000 x 500</p>
							</div>
						</div>
						<div className="item">
							<p className="title">보기를 입력해주세요.</p>
							<div className="desc">
								<div className="boxs">
									<input className="ex-box" type="text" onChange={handleSelect_Text_1} placeholder="보기를 입력해주세요."/>
									<label id="btnAtt2"><input type="file" onChange={(e) => {handlefreeImage1(e.target.files[0])}}/>이미지 추가</label>
									<label id="btnAtt3"><input type="button" value="이미지 삭제"/></label>
									<p className="comment one">권장 크기: 1,000 x 1,000</p>
								</div>
								<div className="boxs">
									<input className="ex-box" type="text" onChange={handleSelect_Text_2} placeholder="보기를 입력해주세요."/>
									<label id="btnAtt2"><input type="file" onChange={(e) => {handlefreeImage2(e.target.files[0])}}/>이미지 추가</label>
									<p className="comment">권장 크기: 1,000 x 1,000</p>
								</div>
							</div>
						</div>
						<div className="item">
							<p className="title">폴 시작일</p>
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
										placeholderText="폴 시작일"
										closeOnScroll={true}
									/>
									<input type="text" className="timepicker clock" name="timepicker" placeholder="시간"/>
								</div>
							</div>
						</div>
						<div className="item">
							<p className="title">폴 종료일</p>
							<div className="desc">
								<div className="input-group">
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
									<input type="text" className="timepicker clock" name="timepicker" placeholder="시간"/>
								</div>
							</div>
						</div>
						<div className="item">
							<p className="title">지급 포인트</p>
							<div className="desc">
								<div><input type="text" className="txtR" onChange={handleRewards}/><span className="txt">P</span></div>
							</div>
						</div>
						<div className="item">
							<p className="title">참여 인원수</p>
							<div className="desc">
								<div><input type="text" className="txtR" onChange={handleMax_Personnel}/><span className="txt">명</span></div>
							</div>
						</div>
					</div>

					<div className="right preview">
						<h4>미리보기</h4>
						<div className="phone">
							<div className="desc">
								<div>{Title}</div>
								<div>{freeImage && <img className="preview-img" src={freeImage} alt="preview-img"/>}</div>
								<div>{freeImage1 && <img className="preview-img1" src={freeImage1} alt="preview-img"/>}
									{freeImage2 && <img className="preview-img1" src={freeImage2} alt="preview-img"/>}</div>
								<div>{Select_1} {Select_2}</div>
								<div>{Rewards}<br/>{Max_Personnel}</div>
							</div>
						</div>
					</div>
				</section>
				<section id="balancegame_btn-wrap">
					<form className="balancegame_registration-btn" onClick={onSubmitHandler}><a>등록</a></form>
				</section>
			</div>
		</>
    )
}

export default BalanceGame;