import React, {useState} from "react";
import Tabmenu from "../../Tabmenu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from 'date-fns/esm/locale';
import client from "../../../../client";
import "./UpDown.css";

function UpDownData(){
    const [Start_Date, setStart_Date] = useState(null);
	const [End_Date, setEnd_Date] = useState(null);

    const [Title, setTitle] = useState("");
	const handleTitle = (e) => {
		setTitle(e.target.value);
	}

    const [Select_1, setSelect_1] = useState("");
    const handleSelect_Text1 = (e) => {
        setSelect_1(e.target.value);
    }

    const [Select_2, setSelect_2] = useState("");
    const handleSelect_Text2 = (e) => {
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

    
    
    const [Image, setImage] = useState("");

    const [freeImage, setfreeImage] = useState('');
	const handlefreeImage = (fileBlob) => {       
		const reader = new FileReader();         
		reader.readAsDataURL(fileBlob);
        setImage(fileBlob.name)
		return new Promise((resolve) => {        
			reader.onload = () => {         
				setfreeImage(reader.result);
				resolve();         
			};      
		});
	};

    const Type = 1;
    const Max_Choice = 1;
    const Random = 1;
	const Select_Image_1 = "";
	const Select_Image_2 = "";
    const Select_Image_3 = "";
    const Select_3 ="";
    const Select_Image_4 = "";
    const Select_4 ="";
    const Select_Image_5 = "";
    const Select_5 ="";
    const Select_Image_6 = "";
    const Select_6 ="";
    const Select_Image_7 = "";
    const Select_7 ="";
    const Select_Image_8 = "";
    const Select_8 ="";

    const State = 0;

    const Scale_start = 1;
    const Scale_End = 1;
    const Scale_Unit = 1;

    const Scale_Start_Text = "";
    const Scale_End_Text = "";
    const Scale_Mid_Text = "";
	const Is_Using_Others = 1;
	const Regist_M_Idx = null;

	const onSubmitHandler = async(e) => {
		e.preventDefault();
		await client.post('/primary-poll/create', {
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

			const Q_Idx = data.Q_Idx;


			client.post('/primary-poll-item/create', {
				Q_Idx,
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

        alert("등록 되었습니다.");
        // document.location.href="/polltotallist";
	};

    return (
        <>
            <Tabmenu/>
            <div className="contents">
                <section id="updown_write">
                    <div className="updown_left">
                        <div className="item">
                            <p className="title">질문을 입력해주세요.</p>
                            <div className="desc">
                                <div><input type="text" onChange={handleTitle} maxLength='30'/></div>
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
                                <input type="text" className="w180" onChange={handleSelect_Text1} placeholder="좋아요 (기본값)" />
                                <input type="text" className="w180" onChange={handleSelect_Text2} placeholder="싫어요 (기본값)" />
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
                                    <input type="text" className="timepicker clock" name="timepicker" />
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
                                    <input type="text" className="timepicker clock" name="timepicker" />
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
								<p>{Select_1}</p><p>{Select_2}</p>
								<div>{Rewards}<br/>{Max_Personnel}</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="updown_btn-wrap">
					<form className="updown_registration-btn" onClick={onSubmitHandler}><a>등록</a></form>
				</section>
            </div>
        </>
    )

}

export default UpDownData;