import React, {useState} from "react";
import "../../Poll1TotalList.css"

function AddDiv(props){
	const [Select_1, setSelect_1] = useState("");
    const handleSelect_Text1 = (e) => {
        setSelect_1(e.target.value);
    }

	// const [Select_2, setSelect_2] = useState("");
    // const handleSelect_Text2 = (e) => {
    //     setSelect_2(e.target.value);
    // }

	const [Select_Image_1, setSelect_Image_1] = useState("");

	const [freeImage1, setfreeImage1] = useState('');
	const handlefreeImage1 = (fileBlob) => {       
		const reader = new FileReader();         
		reader.readAsDataURL(fileBlob);
		setSelect_Image_1(fileBlob.name);       
		return new Promise((resolve) => {        
			reader.onload = () => {         
				setfreeImage1(reader.result);          
				resolve();
			};
		});
	};
	
	// const [Select_Image_2, setSelect_Image_2] = useState("");

	// const [freeImage2, setfreeImage2] = useState('');
	// const handlefreeImage2 = (fileBlob) => {       
	// 	const reader = new FileReader();         
	// 	reader.readAsDataURL(fileBlob);
	// 	setSelect_Image_2(fileBlob.name);       
	// 	return new Promise((resolve) => {        
	// 		reader.onload = () => {         
	// 			setfreeImage2(reader.result);          
	// 			resolve();
	// 		};
	// 	});
	// };

    return (
        <>
            {props.countDiv.map((i) => (
                <div className="box-wrap" key={i}>
                    <div className="box draggable"
                        draggable
                        onDragEnd={() => console.log('드래그 놓았다')}
                        >
                        <div className="tit">
                            <input className="ex-box" type="text" name={i} onChange={handleSelect_Text1} placeholder="보기를 입력해주세요." maxLength="30"/>
                            <label id="btnAtt2"><input type="file" onChange={(e) => {handlefreeImage1(e.target.files[i])}}/>이미지 추가</label>
                            {props.countDiv.length - 1 === 0 ? false : <button onClick={ () =>
                                {props.onRemove({i})}}>삭제</button>}
                        </div>
                        <div className="cont">
                            <div id="photo">{freeImage1 && <img className="preview-img" src={freeImage1} alt="preview-img"/>}</div>
                        </div>
                        <p className="comment">권장 크기: 1,000 x 1,000</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AddDiv;