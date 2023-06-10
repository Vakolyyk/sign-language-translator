import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

import { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type MicroProps = {
  changeValue: React.Dispatch<React.SetStateAction<string>>
};

const Micro: React.FC<MicroProps> = ({ changeValue }) => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition: supports,
  } = useSpeechRecognition();

  const handleStartRecognition = () => SpeechRecognition.startListening();

  useEffect(() => {
    changeValue(transcript);
  }, [transcript])

  const tooltipTitle = supports
    ? "For this language you can use the microphone to enter your text."
    : "Your browser doesn't support speech recognition.";

  return (
    <Tooltip
      title={tooltipTitle}
      placement="bottom"
    >
      <Button
        onClick={handleStartRecognition}
        disabled={!supports}
      >
        {listening ? 'Stop' : 'Start'} listening
      </Button>
    </Tooltip>
  );
};

export default Micro;