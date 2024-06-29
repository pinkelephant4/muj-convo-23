import bigVector from "../assets/big-wave.png";
import testV from "../assets/v-big-wave.png"
import FeedBackForm from "../components/FeedackForm";
import "../style/feedback.css";

function Feedback({ setFeedback }) {
  return (
    <>
      <div className='feedback-layer'>
        <div className='feedback-super'>
          <div className='feedback-mainy'>
            <FeedBackForm setFeedback={setFeedback} />
          </div>
        </div>
        <img src={testV} alt='' className='vector' />
      </div>
    </>
  );
}

export default Feedback;
