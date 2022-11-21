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
import MultiCorrect from "./MultiCorrect";

function Correct() {
    const [Select_3, setSelect_3] = useState(null);
    const [Select_4, setSelect_4] = useState(null);
    const [Select_5, setSelect_5] = useState(null);
    const [Select_6, setSelect_6] = useState(null);
    const [Select_7, setSelect_7] = useState(null);
    const [Select_8, setSelect_8] = useState(null);

    const [Select_Image_3, setSelect_Image_3] = useState(null);
    const [Select_Image_4, setSelect_Image_4] = useState(null);
    const [Select_Image_5, setSelect_Image_5] = useState(null);
    const [Select_Image_6, setSelect_Image_6] = useState(null);
    const [Select_Image_7, setSelect_Image_7] = useState(null);
    const [Select_Image_8, setSelect_Image_8] = useState(null);

    const [freeImage3, setfreeImage3] = useState(null);
    const [freeImage4, setfreeImage4] = useState(null);
    const [freeImage5, setfreeImage5] = useState(null);
    const [freeImage6, setfreeImage6] = useState(null);
    const [freeImage7, setfreeImage7] = useState(null);
    const [freeImage8, setfreeImage8] = useState(null);

	const [Start_Date, setStart_Date] = useState(null);
	const [End_Date, setEnd_Date] = useState(null);

	const [Title, setTitle] = useState("");
	// const handleTitle = (e) => {
	// 	setTitle(e.target.value);
	// }

	const [Select_1, setSelect_1] = useState(null);
    const handleSelect_Text_1 = (e) => {
        setSelect_1(e.target.value);
    }

	const [Select_2, setSelect_2] = useState(null);
    const handleSelect_Text_2 = (e) => {
        setSelect_2(e.target.value);
    }

	const [Rewards, setRewards] = useState();
	const handleRewards = (e) => {
        if(!parseInt(e.target.value)){
			setRewards(0);
		}else{
			setRewards(parseInt(e.target.value));
		}
	}

	const [Max_Personnel, setMax_Personnel] = useState();
	const handleMax_Personnel = (e) => {
        if(!parseInt(e.target.value)){
			setMax_Personnel(0);
		}else{
			setMax_Personnel(parseInt(e.target.value));
		}
	}

    const [Max_Choice, setMax_Choice] = useState();
	const handleMax_Choice = (e) => {
		if(Type === 4){
			setMax_Choice(parseInt(1))
		}

		setMax_Choice(parseInt(e.target.value))
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

    const [State, setState] = useState(0);
	const Checkhandler = e => {
		if(e.target.checked){
			console.log("CHECK")
			setState(1);
		} else{
			console.log("NO CHECK")
			setState(0)
		}
	}

    const [Type, setType] = useState("");

    const removeImg = () => {
		setImage('')
		setfreeImage('')
	}

    const removeSelectImg1 = (e) => {
        console.log(e.target.id)
		setSelect_Image_1('')
		setfreeImage1('')
	}
	const removeSelectImg2 = () => {
		setSelect_Image_2('')
		setfreeImage2('')
	}

    // div 추가
	const [countDiv, setCountDiv] = useState([]);

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

    const location = useLocation();
    const listnum = location.state.data;
    const [polldata, setPolldata] = useState([]);
	useEffect(() => {
		client.get(`primary-poll/list/${listnum}`)
		.then(({data}) => {setPolldata(data);
            console.log(data)
            setTitle(data[0].Title)
            setImage(data[0].Image)
            setRewards(data[0].Rewards)
            setMax_Choice(data[0].Max_Choice)
            setMax_Personnel(data[0].Max_Personnel)
            setScale_Start(data[0].Scale_Start)
            setScale_Start_Text(data[0].Scale_Start_Text)
            setScale_Mid_Text(data[0].Scale_Mid_Text)
            setScale_End(data[0].Scale_End)
            setScale_End_Text(data[0].Scale_End_Text)
            setScale_Unit(data[0].Scale_Unit)
            setSelect_1(data[0].Select_1)
            setSelect_2(data[0].Select_2)
            setSelect_3(data[0].Select_3)
            setSelect_4(data[0].Select_4)
            setSelect_5(data[0].Select_5)
            setSelect_6(data[0].Select_6)
            setSelect_7(data[0].Select_7)
            setSelect_8(data[0].Select_8)
            setSelect_Image_1(data[0].Select_Image_1)
            setSelect_Image_2(data[0].Select_Image_2)
            setSelect_Image_3(data[0].Select_Image_3)
            setSelect_Image_4(data[0].Select_Image_4)
            setSelect_Image_5(data[0].Select_Image_5)
            setSelect_Image_6(data[0].Select_Image_6)
            setSelect_Image_7(data[0].Select_Image_7)
            setSelect_Image_8(data[0].Select_Image_8)


            const divarray=[
                data[0].Select_1, data[0].Select_2, data[0].Select_3, data[0].Select_4,
                data[0].Select_5, data[0].Select_6, data[0].Select_7, data[0].Select_8
            ]
            const divImgarray=[
                data[0].Select_Image_1, data[0].Select_Image_2, data[0].Select_Image_3, data[0].Select_Image_4,
                data[0].Select_Image_5, data[0].Select_Image_6, data[0].Select_Image_7, data[0].Select_Image_8
            ]
            
            
            for(let i=0; i<=8; i++){
                if(divarray[i] || divImgarray[i]){
                    countDiv.push(i)
                }
            }
            
        })
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
                                                value={Title}
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
                                                setImage(acceptedFiles[0]);
                                                handlefreeImage(acceptedFiles[0]);
                                                }}>
                                                {({getRootProps, getInputProps}) => (
                                                    <div id="btnAtt" {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                    </div>
                                                )}
                                            </Dropzone>
                                            {freeImage || qdata.Image ? <div id="photo-view">
                                                <img className="preview-img" src={freeImage || qdata.Image} alt="preview-img"/>
                                                <input type="button" value="X" className="deleteImg" onClick={removeImg}/>
                                            </div> : null}
                                        </div>
                                        <p className="comment">권장 크기 : 1000 x 500</p>
                                    </div>
                                </div>
                               
                               {/* 밸런스 */}
                                {qdata.Type === 0 ? 
                                <div className="item">
                                    <p className="title">보기를 입력해주세요.</p>
                                    <div className="desc">
                                        <div className="boxs boxsone">
                                            <input className="ex-box" type="text" onChange={handleSelect_Text_1} placeholder="보기를 입력해주세요."  value={Select_1 } />
                                            {/* <div id="photo">{qdata.Select_Image_1}</div>
                                            <label id="btnAtt2"><input type="file" onChange={(e) => {handlefreeImage1(e.target.files[0])}}/>이미지 추가</label> */}

                                            <Dropzone onDrop={acceptedFiles => {
                                                setSelect_Image_1(acceptedFiles[0]);
                                                handlefreeImage1(acceptedFiles[0]);
                                                }}>
                                                {({getRootProps, getInputProps}) => (
                                                    <div id="btnAtt2" {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                    </div>      
                                                )}
                                            </Dropzone>
                                            {freeImage1 || qdata.Select_Image_1 ? <div id="photo-view">
                                                <img className="preview-img" src={freeImage1 || qdata.Select_Image_1} alt="preview-img"/>
                                                <input type="button" value="X" id={qdata.Select_Image_1} className="deleteImg" onClick={async() => {
                                                    console.log('click')
                                                    qdata.Select_Image_1 =  "";
                                                    console.log(qdata.Select_Image_1)
                                                }}/>
                                            </div> : null}
                                            <p className="comment one">권장 크기: 1,000 x 1,000</p>
                                        </div>

                                        <div className="boxs">
                                            <input className="ex-box" type="text" onChange={handleSelect_Text_2} placeholder="보기를 입력해주세요." value={Select_2} />
                                            {/* <div id="photo">{qdata.Select_Image_2}</div>
                                            <label id="btnAtt2"><input type="file" onChange={(e) => {handlefreeImage2(e.target.files[0])}}/>이미지 추가</label> */}

                                                <Dropzone onDrop={acceptedFiles => {
                                                setSelect_Image_1(acceptedFiles[0]);
                                                handlefreeImage1(acceptedFiles[0]);
                                                }}>
                                                {({getRootProps, getInputProps}) => (
                                                    <div id="btnAtt2" {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                    </div>      
                                                )}
                                            </Dropzone>
                                            {freeImage2 || qdata.Select_Image_2 ? <div id="photo-view">
                                                <img className="preview-img" src={freeImage2 || qdata.Select_Image_2} alt="preview-img"/>
                                                <input type="button" value="X" className="deleteImg" onClick={removeSelectImg2}/>
                                            </div> : null}
                                            <p className="comment">권장 크기: 1,000 x 1,000</p>
                                        </div>
                                    </div>
                                </div> : null}

                                {/* 업다운 */}
                                {qdata.Type === 1 ? 
                                <div className="item">
                                    <p className="title">응답옵션을 선택해주세요.</p>
                                    <div className="desc">
                                        <input type="text" className="w180" onChange={handleScale_Start_Text} placeholder="좋아요 (기본값)" value={Scale_Start_Text}/>
                                        <input type="text" className="w180" onChange={handleScale_End_Text} placeholder="싫어요 (기본값)" value={Scale_End_Text}/>
                                    </div>
                                </div> : null}

                                {/* 척도 */}
                                {qdata.Type === 2 ?
                                <div className="item">
                                    <p className="title">척도 단계</p>
                                    <div className="desc">
                                        <select onChange={(e) => setScale_Unit(parseInt(e.target.value))} value={Scale_Unit}>
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
                                                <div className="top"><input type="text" id="" name="" placeholder="숫자 입력" onChange={handleScale_Start} value={Scale_Start || 0}/></div>
                                                <div className="bottom"><input type="text" id="" name="" placeholder="왼쪽 입력" onChange={handleScale_Start_Text} value={Scale_Start_Text}/></div>
                                            </li>
                                            <li></li>
                                            <li></li>
                                            <li>
                                                {/* {Scale_Unit || qdata.Scale_Unit % 2 === 1 ? <div className="top">{Math.floor(Scale_Unit || qdata.Scale_Unit / 2 + 1)}</div> : false} */}
                                                <div className="bottom"><input type="text" placeholder="가운데 입력" onChange={handleScale_Mid_Text} value={Scale_Mid_Text}/></div>
                                            </li>
                                            <li></li>
                                            <li></li>
                                            <li>
                                                <div className="top"><input type="text" id="" name="" placeholder="숫자 입력" onChange={handleScale_End} value={Scale_End || 0}/></div>
                                                <div className="bottom"><input type="text" id="" name="" placeholder="오른쪽 입력" onChange={handleScale_End_Text} value={Scale_End_Text}/></div>
                                            </li>
                                        </ol>
                                    </div>
                                </div> : null}

                                {/* 객관식 */}
                                {qdata.Type === 3 || qdata.Type === 4 || qdata.Type === 5 ?
                                <div className="item">
                                    <p className="title">응답옵션을 선택해주세요.</p>
                                    <div className="desc">                       {/* defaultChecked 문제 (`value` prop on `input` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.)*/}
                                        <span><input type="radio" id="answer-1" name="answer" defaultChecked={Type || qdata.Type === 4 && true} readOnly/><label htmlFor="answer-1" onClick={() => {setType(parseInt(4)); setMax_Choice(parseInt(1));}}>단일 선택</label></span>
                                        <span><input type="radio" id="answer-2" name="answer" defaultChecked={Type || qdata.Type === 3 && true} readOnly/><label htmlFor="answer-2" onClick={() => setType(parseInt(3))}>다중 선택</label></span>
                                        <span><input type="radio" id="answer-3" name="answer" defaultChecked={Type || qdata.Type === 5 && true} readOnly/><label htmlFor="answer-3" onClick={() => setType(parseInt(5))}>순위 선택</label></span>
                                    </div>
                                </div> : null}
                                {qdata.Type === 3 || qdata.Type === 4 || qdata.Type === 5 ?
                                <div className="item">
                                    <p className="title">선택 개수를 입력해주세요.</p>
                                    <div className="desc">
                                        <div><span className="txt">최대</span><input type="text" className="w100" value={Max_Choice} onChange={handleMax_Choice}/><span className="txt">개</span></div>
                                    </div>
                                </div> : null}
                                
                                {/* 객관식 보기추가 */}
                                {qdata.Type === 3 || qdata.Type === 4 || qdata.Type === 5 ?
                                <div className="m-item" id="test">
                                    <p className="title">보기를 입력해주세요.</p>
                                    <div className="desc">
                                        <MultiCorrect
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
                                            Select_1={Select_1}
                                            Select_2={Select_2}
                                            Select_3={Select_3}
                                            Select_4={Select_4}
                                            Select_5={Select_5}
                                            Select_6={Select_6}
                                            Select_7={Select_7}
                                            Select_8={Select_8}
                                            setSelect_Image_1={setSelect_Image_1}
                                            setSelect_Image_2={setSelect_Image_2}
                                            setSelect_Image_3={setSelect_Image_3}
                                            setSelect_Image_4={setSelect_Image_4}
                                            setSelect_Image_5={setSelect_Image_5}
                                            setSelect_Image_6={setSelect_Image_6}
                                            setSelect_Image_7={setSelect_Image_7}
                                            setSelect_Image_8={setSelect_Image_8}
                                            qSelect_Image_1={qdata.Select_Image_1}
                                            qSelect_Image_2={qdata.Select_Image_2}
                                            qSelect_Image_3={qdata.Select_Image_3}
                                            qSelect_Image_4={qdata.Select_Image_4}
                                            qSelect_Image_5={qdata.Select_Image_5}
                                            qSelect_Image_6={qdata.Select_Image_6}
                                            qSelect_Image_7={qdata.Select_Image_7}
                                            qSelect_Image_8={qdata.Select_Image_8}
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
                                        <div><input type="text" className="txtR" onChange={handleRewards} value={Rewards}/><span className="txt">P</span></div>
                                    </div>
                                </div>
                                    
                                {qdata.Type !== 2 ?
                                <div className="item">
                                    <p className="title">참여 인원수</p>
                                    <div className="desc">
                                        <div><input type="text" className="txtR" onChange={handleMax_Personnel} value={Max_Personnel}/><span className="txt">명</span></div>
                                    </div>
                                </div> : null}

                                {/* 척도 */}
                                {qdata.Type === 2 ?
                                <div className="item">
                                    <p className="title">참여 인원수</p>
                                    <div className="desc">
                                        <div><input type="text" className={!check ? "txtR" : "txtR no"} value={Max_Personnel} onChange={handleMax_Personnel} readOnly={!check ? false : true}/><span className="txt">명</span></div>
                                        <p className="chkBox"><input type="checkbox" id="agr-chk" name="" onClick={handlecheck}/><label htmlFor="agr-chk">참여 인원수 제한 없음</label></p>
                                    </div>
                                </div> : null}

                                <div className="item">
                                    <p className="title">승인</p>
                                    <div className="desc">
                                        <p className="chkBox2"><input type="checkbox" id="agr-chk2" name="" onClick={Checkhandler} checked={State || qdata.State === "CHECK" ? true : false} readOnly/><label htmlFor="agr-chk2"></label></p>
                                    </div>
                                </div>
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
                                            
                                            {qdata.Type !== 3 && qdata.Type !== 4 && qdata.Type !== 5 ? <p className="title">{Title || qdata.Title}</p> : null}
                                            
                                            <p className="date">날짜</p>

                                            {qdata.Image === "" ? null : 
                                                <div className={qdata.Type === 0 ? "b-titleImg" : qdata.Type === 1 ? "u-titleImg" : qdata.Type === 2 ? "c-titleImg" :
                                                    qdata.Type === 3 || qdata.Type === 4 || qdata.Type === 5 ? "m-titleImg" : qdata.Type === 6 && "s-titleImg"}
                                                >
                                                    {qdata.Image && <img className="preview-img" src={qdata.Image} alt="preview-img"/>}
                                                </div>}

                                            {qdata.Type === 3 || qdata.Type === 4 || qdata.Type === 5 ? <p className="title">{Title || qdata.Title}</p> : null}

                                            {qdata.Type === 0 ? (
                                                <div className="balances">
                                                    <ul className="balance">
                                                        <li>{qdata.Select_Image_1 && <img className="preview-img1" src={qdata.Select_Image_1} alt="preview-img"/>}</li>
                                                        <li><p>{Select_1 || qdata.Select_1}</p></li>
                                                    </ul>
                                                    {qdata.Select_Image_1 && qdata.Select_Image_2 ? <span className="vs">VS</span> : null}
                                                    <ul className="balance">
                                                        <li>{qdata.Select_Image_2 && <img className="preview-img1" src={qdata.Select_Image_2} alt="preview-img"/>}</li>
                                                        <li><p>{Select_2 || qdata.Select_2}</p></li>
                                                    </ul>
                                                </div>
                                            ) : qdata.Type === 1 ? (
                                                <div className="updowns">
                                                    <ul className="updown">
                                                        <li>{Scale_Start_Text || qdata.Scale_Start_Text}</li>
                                                        <li>{Scale_End_Text || qdata.Scale_End_Text}</li>
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
                                            ) : qdata.Type === 3 && qdata.Type === 4 && qdata.Type === 5 && 
                                                qdata.Select_Image_1 || qdata.Select_Image_2 || qdata.Select_Image_3 || qdata.Select_Image_4 ||
                                                qdata.Select_Image_5 || qdata.Select_Image_6 || qdata.Select_Image_7 || qdata.Select_Image_8 ? (
                                                <ul className="multipleImg">
                                                    {qdata.Select_Image_1 ? <li>{qdata.Select_Image_1 && <img className="preview-img1" src={qdata.Select_Image_1} alt="preview-img"/>} {Select_1 ? <p>{Select_1}</p> : null}</li> : null}
                                                    {qdata.Select_Image_2 ? <li>{qdata.Select_Image_2 && <img className="preview-img1" src={qdata.Select_Image_2} alt="preview-img"/>} {Select_2 ? <p>{Select_2}</p> : null}</li> : null}
                                                    {qdata.Select_Image_3 ? <li>{qdata.Select_Image_3 && <img className="preview-img1" src={qdata.Select_Image_3} alt="preview-img"/>} {Select_3 ? <p>{Select_3}</p> : null}</li> : null}
                                                    {qdata.Select_Image_4 ? <li>{qdata.Select_Image_4 && <img className="preview-img1" src={qdata.Select_Image_4} alt="preview-img"/>} {Select_4 ? <p>{Select_4}</p> : null}</li> : null}
                                                    {qdata.Select_Image_5 ? <li>{qdata.Select_Image_5 && <img className="preview-img1" src={qdata.Select_Image_5} alt="preview-img"/>} {Select_5 ? <p>{Select_5}</p> : null}</li> : null}
                                                    {qdata.Select_Image_6 ? <li>{qdata.Select_Image_6 && <img className="preview-img1" src={qdata.Select_Image_6} alt="preview-img"/>} {Select_6 ? <p>{Select_6}</p> : null}</li> : null}
                                                    {qdata.Select_Image_7 ? <li>{qdata.Select_Image_7 && <img className="preview-img1" src={qdata.Select_Image_7} alt="preview-img"/>} {Select_7 ? <p>{Select_7}</p> : null}</li> : null}
                                                    {qdata.Select_Image_8 ? <li>{qdata.Select_Image_8 && <img className="preview-img1" src={qdata.Select_Image_8} alt="preview-img"/>} {Select_8 ? <p>{Select_8}</p> : null}</li> : null}
                                                </ul>
                                            ) : <ul className="multipleTxt">
                                                {Select_1 ? <li><label>1</label>{Select_1}</li> : null}
                                                {Select_2 ? <li><label>2</label>{Select_2}</li> : null}
                                                {Select_3 ? <li><label>3</label>{Select_3}</li> : null}
                                                {Select_4 ? <li><label>4</label>{Select_4}</li> : null}
                                                {Select_5 ? <li><label>5</label>{Select_5}</li> : null}
                                                {Select_6 ? <li><label>6</label>{Select_6}</li> : null}
                                                {Select_7 ? <li><label>7</label>{Select_7}</li> : null}
                                                {Select_8 ? <li><label>8</label>{Select_8}</li> : null}
                                            </ul>}




                                    {/* {Select_Image_1 || Select_Image_2 || Select_Image_3 || Select_Image_4 ||
									Select_Image_5 || Select_Image_6 || Select_Image_7 || Select_Image_8 ? (
										<ul className="multipleImg">
											{Select_Image_1 ? <li>{freeImage1 && <img className="preview-img1" src={freeImage1} alt="preview-img"/>} {Select_1 ? <p>{Select_1}</p> : null}</li> : null}
											{Select_Image_2 ? <li>{freeImage2 && <img className="preview-img1" src={freeImage2} alt="preview-img"/>} {Select_2 ? <p>{Select_2}</p> : null}</li> : null}
											{Select_Image_3 ? <li>{freeImage3 && <img className="preview-img1" src={freeImage3} alt="preview-img"/>} {Select_3 ? <p>{Select_3}</p> : null}</li> : null}
											{Select_Image_4 ? <li>{freeImage4 && <img className="preview-img1" src={freeImage4} alt="preview-img"/>} {Select_4 ? <p>{Select_4}</p> : null}</li> : null}
											{Select_Image_5 ? <li>{freeImage5 && <img className="preview-img1" src={freeImage5} alt="preview-img"/>} {Select_5 ? <p>{Select_5}</p> : null}</li> : null}
											{Select_Image_6 ? <li>{freeImage6 && <img className="preview-img1" src={freeImage6} alt="preview-img"/>} {Select_6 ? <p>{Select_6}</p> : null}</li> : null}
											{Select_Image_7 ? <li>{freeImage7 && <img className="preview-img1" src={freeImage7} alt="preview-img"/>} {Select_7 ? <p>{Select_7}</p> : null}</li> : null}
											{Select_Image_8 ? <li>{freeImage8 && <img className="preview-img1" src={freeImage8} alt="preview-img"/>} {Select_8 ? <p>{Select_8}</p> : null}</li> : null}
										</ul>
									): 	<ul className="multipleTxt">
										{Select_1 ? <li><label>1</label>{Select_1}</li> : null}
										{Select_2 ? <li><label>2</label>{Select_2}</li> : null}
										{Select_3 ? <li><label>3</label>{Select_3}</li> : null}
										{Select_4 ? <li><label>4</label>{Select_4}</li> : null}
										{Select_5 ? <li><label>5</label>{Select_5}</li> : null}
										{Select_6 ? <li><label>6</label>{Select_6}</li> : null}
										{Select_7 ? <li><label>7</label>{Select_7}</li> : null}
										{Select_8 ? <li><label>8</label>{Select_8}</li> : null}
									</ul>} */}
                                            
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