import { useState } from "react";
import "./flashcard.css"

interface TrainerData {
  name: string;
  img: string;
  position: string;
  initial: string;
}

interface TrainerCardProps {
  data: TrainerData;
  onSubmit: (correct: boolean)=>void;
  onAnswerShown: ()=>void;
}

const TrainerCard = ({data, onSubmit, onAnswerShown}: TrainerCardProps) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("Junior Laboratory Assistant");
  const [initial, setInitial] = useState("");
  const [popup, setPopup] = useState(false);

  const checkCorrect = () =>
  name.toLowerCase().trim() === data.name.toLowerCase().trim() &&
  position.toLowerCase().trim() === data.position.toLowerCase().trim() &&
  initial.toLowerCase().trim() === data.initial.toLowerCase().trim();

  const handleSubmit = () => {
    const isCorrect = checkCorrect();

    if(isCorrect){
      setName("")
      setPosition("Junior Laboratory Assistant")
      setInitial("")
      setPopup(false)
    }else{
      setPopup(true)
      setTimeout(()=>setPopup(false),2000);
    }
    onSubmit(isCorrect);
  };
  const handleShowAnswer = () => {
    setName(data.name);
    setInitial(data.initial);
    setPosition(data.position);
    onAnswerShown();
  }
  
  return (
    <div className="main-container">
      <h2>Who's that trainer?</h2>
      <img src={data.img} alt={data.name} />

      <input value={name} placeholder="Input Name"  onChange={(e) => setName(e.target.value)} />
      
      <select name="" id="" value={position} className="position" onChange={(e) => setPosition(e.target.value)}>
        <option value="Junior Laboratory Assistant">Junior Laboratory Assistant</option>
        <option value="Laboratory Assistant">Laboratory Assistant</option>
        <option value="Network Administrator and Technical Support Staff">Network Administrator and Technical Support Staff</option>
        <option value="Operations Management Officer">Operations Management Officer</option>
        <option value="Subject Coordinator Staff">Subject Coordinator Staff</option>
        <option value="Research and Development Staff">Research and Development Staff</option>
        <option value="Lecturer Specialist">Lecturer Specialist</option>
        <option value="Database Administration Staff">Database Administrator Staff</option>
        <option value="Network Administrator and Technical Support Officer">Network Administrator and Technical Support Officer</option>
      </select>
      <input value={initial} placeholder="Input Initial and Generation"  onChange={(e) => setInitial(e.target.value)} />
      
      <button className='submit-btn' onClick={handleSubmit}>Submit</button>
      <button className='btn' onClick={handleShowAnswer}>ShowAnswer</button>
      
      {popup && (
        <div className = "SALAH">
          <p>Wrong Answer</p>
        </div>
      )}
      
    </div>
  );
};

export default TrainerCard;