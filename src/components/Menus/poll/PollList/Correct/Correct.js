import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import Dateprofile from "../../../../Dateprofile";
import Sidebar from "../../../../sidebarmenu/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from 'date-fns/esm/locale';
import InputEmoji from "react-input-emoji";
import client from "../../../../client";
import "./Correct.css";
import moment from "moment";
import 'moment/locale/ko';
import Dropzone from 'react-dropzone';

function Correct() {
    const formData = new FormData();

	const [Start_Date, setStart_Date] = useState(null);
	const [End_Date, setEnd_Date] = useState(null);

	const [Title, setTitle] = useState("");
	// const handleTitle = (e) => {
	// 	setTitle(e.target.value);
	// }

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
		reader.readAsDataURL(fileBlob);		
		setImage(fileBlob);       
		return new Promise((resolve) => {        
			reader.onload = () => {         
				setfreeImage(reader.result);          
				resolve();
			};
		});
	};

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

    const [Scale_Start, setScale_Start] = useState();
    const handleScale_Start = (e) => {
        setScale_Start(parseInt(e.target.value));
    }

    const [Scale_End, setScale_End] = useState();
	const handleScale_End = (e) => {
		setScale_End(parseInt(e.target.value));
	}

    const [Scale_Unit, setScale_Unit] = useState();

    const [Scale_Start_Text, setScale_Start_Text] = useState();
    const handleScale_Start_Text = (e) => {
        setScale_Start_Text(e.target.value);
    }

    const [Scale_Mid_Text, setScale_Mid_Text] = useState();
	const handleScale_Mid_Text = (e) => {
		setScale_Mid_Text(e.target.value);
	}

    const [Scale_End_Text, setScale_End_Text] = useState();
	const handleScale_End_Text = (e) => {
		setScale_End_Text(e.target.value);
	}

    const [check, setCheck] = useState(false);
    const handlecheck = () => {
        setCheck(!check)
        if(!check){
            setMax_Personnel(parseInt(999999))
        }else{
            setMax_Personnel(parseInt(0))
        }
    }

    const removeImg = () => {
		setImage('')
		setfreeImage('')
	}

    const removeSelectImg1 = () => {
		setSelect_Image_1('')
		setfreeImage1('')
	}
	const removeSelectImg2 = () => {
		setSelect_Image_2('')
		setfreeImage2('')
	}

    const location = useLocation();
    const listnum = location.state.data;
    const [polldata, setPolldata] = useState([]);
	useEffect(() => {
		client.get(`primary-poll/list/${listnum}`)
		.then(({data}) => {setPolldata(data)})
	}, [])

    return (
        <>
            <div id="nav">
                <h1 className="logo"><Link to="/dashboard">위시폴</Link></h1>
                <Sidebar/>
            </div>
            <div id="container2">
                <Dateprofile />

                {polldata.map((qdata, Q_Idx) => (
                    <div className="contents" key={Q_Idx}>
                        <section id="correct_write">
                            <div className="correct_left">
                                <div className="item">
                                    <p className="title">질문을 입력해주세요.</p>
                                    <div className="desc">
                                        <div>
                                            <InputEmoji
                                                onChange={setTitle}
                                                placeholder=""
                                                maxLength="30"
                                                value={Title || qdata.Title}
                                            />
                                        </div>
                                        <p className="comment">30자 이내로 적어주세요.</p>
                                    </div>
                                </div>
                                <div className="item">
                                    <p className="title">질문 이미지를 추가해주세요.</p>
                                    <div className="desc">
                                        <div className="img-photo">
                                            {/* <label id='btnAtt'><input type='file' multiple={true} onChange={(e) => {handlefreeImage(e.target.files[0])}}/></label>
                                            <div id="photo-view">{qdata.Image}</div> */}

                                            <Dropzone onDrop={acceptedFiles => {
                                                console.log(acceptedFiles)
                                                setImage(acceptedFiles[0]);
                                                handlefreeImage(acceptedFiles[0]);
                                                }}>
                                                {({getRootProps, getInputProps}) => (
                                                    <div id="btnAtt" {...getRootProps()}>
                                                        <input {...getInputProps()} />{qdata.Image}
                                                    </div>      
                                                )}
                                            </Dropzone>
                                            {freeImage ? <div id="photo-view">
                                                <img className="preview-img" src={Image} alt="preview-img"/>
                                                <input type="button" value="X" className="deleteImg" onClick={removeImg}/>
                                            </div> : null}
                                        </div>
                                        <p className="comment">권장 크기 : 1000 x 500</p>
                                    </div>
                                </div>
                               
                                {qdata.Type === 0 ? 
                                <div className="item">
                                    <p className="title">보기를 입력해주세요.</p>
                                    <div className="desc">
                                        <div className="boxs boxsone">
                                            <input className="ex-box" type="text" onChange={handleSelect_Text_1} placeholder="보기를 입력해주세요." value={Select_1 || qdata.Select_1} />
                                            {/* <div id="photo">{qdata.Select_Image_1}</div>
                                            <label id="btnAtt2"><input type="file" onChange={(e) => {handlefreeImage1(e.target.files[0])}}/>이미지 추가</label> */}

                                            <Dropzone onDrop={acceptedFiles => {
                                                console.log(acceptedFiles)
                                                setSelect_Image_1(acceptedFiles[0]);
                                                handlefreeImage1(acceptedFiles[0]);
                                                }}>
                                                {({getRootProps, getInputProps}) => (
                                                    <div id="btnAtt2" {...getRootProps()}>
                                                        <input {...getInputProps()} />{qdata.Select_Image_1}
                                                    </div>      
                                                )}
                                            </Dropzone>
                                            {qdata.freeImage1 ? <div id="photo-view">
                                                <img className="preview-img" src={qdata.freeImage1} alt="preview-img"/>
                                                <input type="button" value="X" className="deleteImg" onClick={removeSelectImg1}/>
                                            </div> : null}
                                            <p className="comment one">권장 크기: 1,000 x 1,000</p>
                                        </div>

                                        <div className="boxs">
                                            <input className="ex-box" type="text" onChange={handleSelect_Text_2} placeholder="보기를 입력해주세요." value={Select_2 || qdata.Select_2} />
                                            {/* <div id="photo">{qdata.Select_Image_2}</div>
                                            <label id="btnAtt2"><input type="file" onChange={(e) => {handlefreeImage2(e.target.files[0])}}/>이미지 추가</label> */}

                                                <Dropzone onDrop={acceptedFiles => {
                                                console.log(acceptedFiles)
                                                setSelect_Image_1(acceptedFiles[0]);
                                                handlefreeImage1(acceptedFiles[0]);
                                                }}>
                                                {({getRootProps, getInputProps}) => (
                                                    <div id="btnAtt2" {...getRootProps()}>
                                                        <input {...getInputProps()} />{qdata.Select_Image_2}
                                                    </div>      
                                                )}
                                            </Dropzone>
                                            {qdata.freeImage1 ? <div id="photo-view">
                                                <img className="preview-img" src={qdata.freeImage1} alt="preview-img"/>
                                                <input type="button" value="X" className="deleteImg" onClick={removeSelectImg2}/>
                                            </div> : null}
                                            <p className="comment">권장 크기: 1,000 x 1,000</p>
                                        </div>
                                    </div>
                                </div> : null}

                                {qdata.Type === 1 ? 
                                <div className="item">
                                    <p className="title">응답옵션을 선택해주세요.</p>
                                    <div className="desc">
                                        <input type="text" className="w180" onChange={handleSelect_Text_1} placeholder="좋아요 (기본값)" value={Select_1 || qdata.Select_1}/>
                                        <input type="text" className="w180" onChange={handleSelect_Text_2} placeholder="싫어요 (기본값)" value={Select_2 || qdata.Select_2}/>
                                    </div>
                                </div> : null}

                                {qdata.Type === 2 ?
                                <div className="item">
                                    <p className="title">척도 단계</p>
                                    <div className="desc">
                                        <select onChange={(e) => setScale_Unit(parseInt(e.target.value))} value={Scale_Unit || qdata.Scale_Unit}>
                                            <option value="선택">선택</option>
                                            <option value="3">3점</option>
                                            <option value="4">4점</option>
                                            <option value="5">5점</option>
                                            <option value="6">6점</option>
                                            <option value="7">7점</option>
                                            <option value="8">8점</option>
                                            <option value="9">9점</option>
                                            <option value="10">10점</option>
                                            <option value="11">11점</option>
                                        </select>
                                    </div>
                                </div> : null}
                                
                                {qdata.Type === 2 ?
                                <div className="item">
                                    <p className="title">점수를 적어주세요.</p>
                                    <div className="desc">
                                        <ol className="progress-bar">
                                            <li>
                                                <div className="top"><input type="text" id="" name="" placeholder="숫자 입력" onChange={handleScale_Start} value={Scale_Start || qdata.Scale_Start}/></div>
                                                <div className="bottom"><input type="text" id="" name="" placeholder="왼쪽 입력" onChange={handleScale_Start_Text} value={Scale_Start_Text || qdata.Scale_Start_Text}/></div>
                                            </li>
                                            <li></li>
                                            <li></li>
                                            <li>
                                                {/* {Scale_Unit || qdata.Scale_Unit % 2 === 1 ? <div className="top">{Math.floor(Scale_Unit || qdata.Scale_Unit / 2 + 1)}</div> : false} */}
                                                <div className="bottom"><input type="text" placeholder="가운데 입력" onChange={handleScale_Mid_Text} value={Scale_Mid_Text || qdata.Scale_Mid_Text}/></div>
                                            </li>
                                            <li></li>
                                            <li></li>
                                            <li>
                                                <div className="top"><input type="text" id="" name="" placeholder="숫자 입력" onChange={handleScale_End} value={Scale_End || qdata.Scale_End}/></div>
                                                <div className="bottom"><input type="text" id="" name="" placeholder="오른쪽 입력" onChange={handleScale_End_Text} value={Scale_End_Text || qdata.Scale_End_Text}/></div>
                                            </li>
                                        </ol>
                                    </div>
                                </div> : null}

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
                                                value={Start_Date || moment(qdata.Start_Date).format("YYYY년 MM월 DD일 (ddd)")}
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
                                                value={End_Date || moment(qdata.End_Date).format("YYYY년 MM월 DD일 (ddd)")}
                                            />
                                            <input type="text" className="timepicker clock" name="timepicker" placeholder="시간"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <p className="title">지급 포인트</p>
                                    <div className="desc">
                                        <div><input type="text" className="txtR" onChange={handleRewards} value={Rewards || qdata.Rewards}/><span className="txt">P</span></div>
                                    </div>
                                </div>
                                {qdata.Type === 6 ?
                                <div className="item">
                                    <p className="title">참여 인원수</p>
                                    <div className="desc">
                                        <div><input type="text" className="txtR" onChange={handleMax_Personnel} value={Max_Personnel || qdata.Max_Personnel}/><span className="txt">명</span></div>
                                    </div>
                                </div> : null}
                                {qdata.Type === 2 ?
                                <div className="item">
                                    <p className="title">참여 인원수</p>
                                    <div className="desc">
                                        <div><input type="text" className={!check ? "txtR" : "txtR no"} value={qdata.Max_Personnel || ''} onChange={handleMax_Personnel} readOnly={!check ? false : true}/><span className="txt">명</span></div>
                                        <p className="chkBox"><input type="checkbox" id="agr-chk" name="" onClick={handlecheck}/><label htmlFor="agr-chk">참여 인원수 제한 없음</label></p>
                                    </div>
                                </div> : null}
                            </div>
        
                            <div className="right preview">
                                <h4>미리보기</h4>
                                <div className="phone">
                                    <div className="desc">
                                        <div className="modal">
                                            <ul className="info">
                                                <li>리워드: {Rewards || qdata.Rewards}</li>
                                                <li>참여 인원수: {Max_Personnel || qdata.Max_Personnel}명</li>
                                                <li>{qdata.Type === 0 ? "밸런스 게임" : qdata.Type === 1 ? "Up&Down" : qdata.Type === 2 ? "척도 선택" :
                                                    qdata.Type === 3 ? "객관식 복수" : qdata.Type === 4 ? "객관식 단일" : qdata.Type === 5 ? "객관식 순위" :
                                                    qdata.Type === 6 && "별점 선택"}</li>
                                            </ul>
                                            <p className="title">{Title || qdata.Title}</p>
                                            <p className="date">날짜</p>
                                            {Image === "" ? null : 
                                                <div className="titleImg">
                                                    {freeImage && <img className="preview-img" src={freeImage} alt="preview-img"/>}
                                                </div>}
                                            {qdata.Type === 0 ? (
                                                <div className="balances">
                                                    <ul className="balance">
                                                        <li>{freeImage1 && <img className="preview-img1" src={freeImage1} alt="preview-img"/>}</li>
                                                        <li><p>{Select_1 || qdata.Select_1}</p></li>
                                                    </ul>
                                                    {Select_Image_1 && Select_Image_2 ? <span className="vs">VS</span> : null}
                                                    <ul className="balance">
                                                        <li>{freeImage2 && <img className="preview-img1" src={freeImage2} alt="preview-img"/>}</li>
                                                        <li><p>{Select_2 || qdata.Select_2}</p></li>
                                                    </ul>
                                                </div>
                                            ) : qdata.Type === 1 ? (
                                                <div className="updowns">
                                                    <ul className="updown">
                                                        <li>{Select_1 || qdata.Select_1}</li>
                                                        <li>{Select_2 || qdata.Select_2}</li>
                                                    </ul>
                                                </div>
                                            ) : qdata.Type === 2 ? (
                                                <div className="choose">
                                                    <section className="top">
                                                        <div className="starttop">{Scale_Start || qdata.Scale_Start}</div>
                                                        <div className="endtop">{Scale_End || qdata.Scale_End}</div>
                                                    </section>
                                                    <section className="progress-bar"></section>
                                                    <section className="bottom">
                                                        <div className="startbottom">{Scale_Start_Text || qdata.Scale_Start_Text}</div>
                                                        <div className="endbottom">{Scale_End_Text || qdata.Scale_End_Text}</div>
                                                    </section>
                                                </div>
                                            ): null}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="correct_btn-wrap">
                            <form className="correct_registration-btn"><a>수정</a></form>
                        </section>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Correct;