import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from 'date-fns/esm/locale';
import client from "../../../../client";
import "./MultipleChoice.css";
import AddDiv from "./AddDiv";
import InputEmoji from "react-input-emoji";

function MulitpleChoice(){
	// 파일 업로드를 위한  폼데이터 
	const formData = new FormData();

	const [Select_1, setSelect_1] = useState("");
    const [Select_2, setSelect_2] = useState("");
    const [Select_3, setSelect_3] = useState("");
    const [Select_4, setSelect_4] = useState("");
    const [Select_5, setSelect_5] = useState("");
    const [Select_6, setSelect_6] = useState("");
    const [Select_7, setSelect_7] = useState("");
    const [Select_8, setSelect_8] = useState("");

    const [Select_Image_1, setSelect_Image_1] = useState("");
    const [Select_Image_2, setSelect_Image_2] = useState("");
    const [Select_Image_3, setSelect_Image_3] = useState("");
    const [Select_Image_4, setSelect_Image_4] = useState("");
    const [Select_Image_5, setSelect_Image_5] = useState("");
    const [Select_Image_6, setSelect_Image_6] = useState("");
    const [Select_Image_7, setSelect_Image_7] = useState("");
    const [Select_Image_8, setSelect_Image_8] = useState("");

    const [freeImage1, setfreeImage1] = useState('');
    const [freeImage2, setfreeImage2] = useState('');
    const [freeImage3, setfreeImage3] = useState('');
    const [freeImage4, setfreeImage4] = useState('');
    const [freeImage5, setfreeImage5] = useState('');
    const [freeImage6, setfreeImage6] = useState('');
    const [freeImage7, setfreeImage7] = useState('');
    const [freeImage8, setfreeImage8] = useState('');


    const [Start_Date, setStart_Date] = useState(null);
	const [End_Date, setEnd_Date] = useState(null);


	const [Title, setTitle] = useState("");


	const [Rewards, setRewards] = useState();
	const handleRewards = (e) => {
		setRewards(parseInt(e.target.value));
	}

	const [Max_Personnel, setMax_Personnel] = useState();
	const handleMax_Personnel = (e) => {
		setMax_Personnel(parseInt(e.target.value));
	}

	const [Image, setImage] = useState("");

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

	const [Max_Choice, setMax_Choice] = useState();
	const handleMax_Choice = (e) => {
		setMax_Choice(parseInt(e.target.value))
		if(Type === 4){
			setMax_Choice(parseInt(1))
		} else if(Type === 3){
			setMax_Choice(parseInt(10))
		} else if(Type === 5){
			setMax_Choice(parseInt(20))
		}
	}
	
	// div 추가
	const [countDiv, setCountDiv] = useState([0]);

	const onAddDetailDiv = () => {	
		let countArr = [...countDiv]
		let counter = countArr.slice(-1)[0]

		counter += 1;
		countArr.push(counter)
		setCountDiv(countArr)
	}

	const onRemove = (targetId) => {
		console.log(`${targetId.i}가 삭제됩니다`)

		let countArr = [...countDiv]

		const newDiaryList = countArr.filter(countDiv => countDiv !== targetId.i);

		setCountDiv(newDiaryList);
	};

	const [Type, setType] = useState("");

    const Random = 1;
    const State = 0;

    const Scale_start = 1;
    const Scale_End = 1;
    const Scale_Unit = 1;

    const Scale_Start_Text = "";
    const Scale_End_Text = "";
    const Scale_Mid_Text = "";
	const Is_Using_Others = 1;
	const Regist_M_Idx = null;


	formData.append('files', Image)
	formData.append('files', Select_Image_1)
	formData.append('files', Select_Image_2)
	formData.append('files', Select_Image_3)
	formData.append('files', Select_Image_4)
	formData.append('files', Select_Image_5)
	formData.append('files', Select_Image_6)
	formData.append('files', Select_Image_7)
	formData.append('files', Select_Image_8)
	

	const onSubmitHandler = async(e) => {
		e.preventDefault();

		if(Image){

			client.post('/uploads/fileups', formData).then((res) =>{
				const Image = res.data.returnValue[0];
				const Select_Image_1 = res.data.returnValue[1];
				const Select_Image_2 = res.data.returnValue[2];
				const Select_Image_3 = res.data.returnValue[3];
				const Select_Image_4 = res.data.returnValue[4];
				const Select_Image_5 = res.data.returnValue[5];
				const Select_Image_6 = res.data.returnValue[6];
				const Select_Image_7 = res.data.returnValue[7];
				const Select_Image_8 = res.data.returnValue[8];
	
				client.post('/primary-poll/create', {
					Title,Image,
					State,Type,
					Rewards,Max_Personnel,
					Max_Choice,	Random,
					Start_Date,	End_Date,
					Is_Using_Others,Regist_M_Idx
				}).then(({data}) => {
	
					const primaryPoll = data.Q_Idx;
	
					client.post('/primary-poll-item/create', {
						primaryPoll,
						Select_Image_1,	Select_1,
						Select_Image_2,	Select_2,
						Select_Image_3,	Select_3,
						Select_Image_4,	Select_4,
						Select_Image_5,	Select_5,
						Select_Image_6,	Select_6,
						Select_Image_7,	Select_7,
						Select_Image_8,	Select_8,
						Scale_start,	Scale_End,
						Scale_Unit,	Scale_Start_Text,
						Scale_Mid_Text,	Scale_End_Text
					})
				});
	
			}).catch(err =>{
				alert('파일 업로드 실패 - 관리자에게 문의하세요');
			})
	

		}else{

			client.post('/uploads/fileups', formData).then((res) =>{
				
				const Select_Image_1 = res.data.returnValue[0];
				const Select_Image_2 = res.data.returnValue[1];
				const Select_Image_3 = res.data.returnValue[2];
				const Select_Image_4 = res.data.returnValue[3];
				const Select_Image_5 = res.data.returnValue[4];
				const Select_Image_6 = res.data.returnValue[5];
				const Select_Image_7 = res.data.returnValue[6];
				const Select_Image_8 = res.data.returnValue[7];
	
				client.post('/primary-poll/create', {
					Title,Image,
					State,Type,
					Rewards,Max_Personnel,
					Max_Choice,	Random,
					Start_Date,	End_Date,
					Is_Using_Others,Regist_M_Idx
				}).then(({data}) => {
	
					const primaryPoll = data.Q_Idx;
	
					client.post('/primary-poll-item/create', {
						primaryPoll,
						Select_Image_1,	Select_1,
						Select_Image_2,	Select_2,
						Select_Image_3,	Select_3,
						Select_Image_4,	Select_4,
						Select_Image_5,	Select_5,
						Select_Image_6,	Select_6,
						Select_Image_7,	Select_7,
						Select_Image_8,	Select_8,
						Scale_start,	Scale_End,
						Scale_Unit,	Scale_Start_Text,
						Scale_Mid_Text,	Scale_End_Text
					})
				});
	
			}).catch(err =>{
				alert('파일 업로드 실패 - 관리자에게 문의하세요');
			})
	
		}

		





		alert("등록 되었습니다.");
        //document.location.href="/polltotallist";
	};

	

    return (
        <>
			<div className="contents">
				<section id="multiple_write">
					<div className="multiple_left">
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
									<label id='btnAtt'><input type='file' multiple={true} onChange={(e) => {handlefreeImage(e.target.files[0])}}/></label>
									<div id="photo-view">{freeImage && <img className="preview-img" src={freeImage} alt="preview-img"/>}</div>
								</div>
								<p className="comment">권장 크기 : 1000 x 500</p>
							</div>
						</div>
                        <div className="item">
						    <p className="title">응답옵션을 선택해주세요.</p>
						<div className="desc">
							<span><input type="radio" id="answer-1" name="answer"/><label htmlFor="answer-1" onClick={() => setType(parseInt(4))}>단일 선택</label></span>
							<span><input type="radio" id="answer-2" name="answer"/><label htmlFor="answer-2" onClick={() => setType(parseInt(3))}>다중 선택</label></span>
							<span><input type="radio" id="answer-3" name="answer"/><label htmlFor="answer-3" onClick={() => setType(parseInt(5))}>순위 선택</label></span>
						</div>
					</div>
					<div className="item">
						<p className="title">선택 개수를 입력해주세요.</p>
						<div className="desc">
							<div><span className="txt">최대</span><input type="text" className="w100" value={Max_Choice || ""} onChange={handleMax_Choice}/><span className="txt">개</span></div>
						</div>
					</div>
					<div className="item" id="test">
						<p className="title">보기를 입력해주세요.</p>
						<div className="desc">
							<AddDiv
								countDiv={countDiv}
								onRemove={onRemove}
								setSelect_1={setSelect_1}
								setSelect_2={setSelect_2}
								setSelect_3={setSelect_3}
								setSelect_4={setSelect_4}
								setSelect_5={setSelect_5}
								setSelect_6={setSelect_6}
								setSelect_7={setSelect_7}
								setSelect_8={setSelect_8}
								setSelect_Image_1={setSelect_Image_1}
								setSelect_Image_2={setSelect_Image_2}
								setSelect_Image_3={setSelect_Image_3}
								setSelect_Image_4={setSelect_Image_4}
								setSelect_Image_5={setSelect_Image_5}
								setSelect_Image_6={setSelect_Image_6}
								setSelect_Image_7={setSelect_Image_7}
								setSelect_Image_8={setSelect_Image_8}
								setfreeImage1={setfreeImage1}
								setfreeImage2={setfreeImage2}
								setfreeImage3={setfreeImage3}
								setfreeImage4={setfreeImage4}
								setfreeImage5={setfreeImage5}
								setfreeImage6={setfreeImage6}
								setfreeImage7={setfreeImage7}
								setfreeImage8={setfreeImage8}
							/>

							{countDiv.length - 1 < 7 ? <button className="btn-add" onClick={onAddDetailDiv}>보기 추가하기</button> : false}
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
									{freeImage2 && <img className="preview-img1" src={freeImage2} alt="preview-img"/>}
									{freeImage3 && <img className="preview-img1" src={freeImage3} alt="preview-img"/>}
									{freeImage4 && <img className="preview-img1" src={freeImage4} alt="preview-img"/>}
									{freeImage5 && <img className="preview-img1" src={freeImage5} alt="preview-img"/>}
									{freeImage6 && <img className="preview-img1" src={freeImage6} alt="preview-img"/>}
									{freeImage7 && <img className="preview-img1" src={freeImage7} alt="preview-img"/>}
									{freeImage8 && <img className="preview-img1" src={freeImage8} alt="preview-img"/>}</div>
								<div>{Select_1} {Select_2} {Select_3} {Select_4} {Select_5} {Select_6} {Select_7} {Select_8}</div>
								<div>{Rewards}<br/>{Max_Personnel}</div>
							</div>
						</div>
					</div>
				</section>
				<section id="multiple_btn-wrap">
					<form className="multiple_registration-btn" onClick={onSubmitHandler} ><a>등록</a></form>
				</section>
			</div>
		</>
    )
}

export default MulitpleChoice;