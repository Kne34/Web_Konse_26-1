import { useState } from "react";
import "./flashcardtrainee.css"

interface TraineeData {
  tnumber: string;
  name: string;
  img: string;
  jurusan: string;
  angkatan: string;
}

interface TraineeCardProps {
  data: TraineeData;
  onSubmit :(correct: boolean) => void;
  onAnswerShown: ()=>void;
}

const TraineeCard = ({data, onSubmit, onAnswerShown}: TraineeCardProps) => {
  const [name, setName] = useState("");
  const [jurusan, setjurusan] = useState("Computer Science");
  const [angkatan, setangkatan] = useState("B29");
  const [traineenum, settraineenum] = useState("");
  const [popup, setPopup] = useState(false);
  
  const checkCorrect = () =>
    name.toLowerCase().trim() === data.name.toLowerCase().trim() &&
    jurusan.toLowerCase().trim() === data.jurusan.toLowerCase().trim() &&
    angkatan.toLowerCase().trim() === data.angkatan.toLowerCase().trim() &&
    traineenum.toLowerCase().trim() === data.tnumber.toLowerCase().trim();

  const handleSubmit = () => {
    const isCorrect = checkCorrect();
    onSubmit(isCorrect);

    if(isCorrect){
      setName("")
      setjurusan("Computer Science")
      setangkatan("B29")
      settraineenum("")
      setPopup(false)
    }else{
      setPopup(true)
      setTimeout(()=>setPopup(false),2000);
    }
  };

  const handleShowAnswer = () => {
      setName(data.name)
      setjurusan(data.jurusan)
      setangkatan(data.angkatan)
      settraineenum(data.tnumber)
      onAnswerShown();
  }

  
  return (
    
    <div className="main-container">
      {/* <div className= "shadow"/> */}
      <h2>Who's that trainee?</h2>
      <img src={data.img} alt={data.name} />

      <input value={name} placeholder="Input Name"  onChange={(e) => setName(e.target.value)} />  
      <select value={jurusan} className='jurusan' onChange={(e) => setjurusan(e.target.value)}>
        <option value="Computer Science">Computer Science</option>
        <option value="Artificial Intelligence">Artificial Intelligence</option>
        <option value="Cyber Security">Cyber Security</option>
        <option value="Data Science">Data Science</option>
        <option value="Computer Science and Mathematics">Computer Science and Mathematics</option>
        <option value="Computer Science (MT)">Computer Science (MT)</option>
      </select>

      <div className="mix">

        <select value={angkatan} className="angkatan" onChange={(e) => setangkatan(e.target.value)}>
            <option value="B29" >B29</option>
            <option value="B28">B28</option>
        </select>

        <input type="text" className="tnumber" value={traineenum} onChange={(e) => settraineenum(e.target.value)} placeholder="TXXX" />
      </div>
      
      <button className='submit-btn' onClick={handleSubmit}>Submit</button>
      <button className='' onClick={handleShowAnswer}>Show Answer</button>

      {popup && (
        <div className = "SALAH">
          <p>Wrong Answer</p>
        </div>
      )}
    </div>
  );
};

export default TraineeCard;