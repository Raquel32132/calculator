import { useEffect, useState } from 'react';
import { NumberOne, NumberTwo, NumberThree, NumberFour, NumberFive, NumberSix, NumberSeven, NumberEight, NumberNine, NumberZero, X, Plus, Minus, Divide, Equals, Backspace } from 'phosphor-react';
import { CalculatorButton } from '../components/CalculatorButton';



import clickSound from '../assets/mixkit-modern-technology-select-3124.wav'
import styles from './styles.module.scss';


interface Data {
  name: string;
  course: string;
  registration: string;
}


export function Home() {
  const [calc, setCalc] = useState<string>('');
  const [identification, setIdentification] = useState<Data>();

  const audio = new Audio(clickSound);


  const fetchIdentification = async () => {
    const response = await fetch('/identification.json');
    const data = await response.text();
    setIdentification(JSON.parse(data));
  }

  const handleClick = async () => {
    await fetchIdentification();
    if (identification) {
      alert(`Name: ${identification.name}\nCourse: ${identification.course}\nRegistration: ${identification.registration}`);
    }
  }


  useEffect(() => {

    function handleKeyDown(event: KeyboardEvent) {
      if (/^\d$/.test(event.key)) { 
        setCalc(calc + event.key); 
      } else if (event.key === 'Backspace') {
        setCalc(calc.slice(0, -1)); 
      } else if (event.key === 'Enter') {
        handleEquals();
        event.preventDefault();
        event.stopPropagation();
      }
    }

    audio.play()
    document.body.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [calc]);


  function lastCharIsOperator(calcString: string): boolean {
    const operators = ['+', '-', '*', '/'];
    const lastChar = calcString.slice(-1);
    return operators.includes(lastChar);
  }

  function handleAddDot() {
    if (calc !== '' && !lastCharIsOperator(calc)) {
      const lastNumber = calc.split(/[\+\-\*\/]/).pop();
      if (lastNumber !== undefined && !lastNumber.includes('.')) {
        setCalc(calc + '.');
      }
    }
  }

  function handleAddMinusOrSubtract() {
    if (calc === '') {
      setCalc('-')
    } else {
      if (!lastCharIsOperator(calc)) {
        setCalc(calc + '-');
      }
    }
  }
 
  function handleAddition() {
    if (!lastCharIsOperator(calc) && calc !== '') {
      setCalc(calc + '+');
    }
  }

  function handleDivide() {
    if (!lastCharIsOperator(calc) && calc !== '') {
      setCalc(calc + '/');
    }
  }

  function handleMultiply() {
    if (!lastCharIsOperator(calc) && calc !== '') {
      setCalc(calc + '*');
    }
  }

  function handleEquals() {
    try {
      const result = eval(calc);
      setCalc(result.toString());
    } catch (error) {
      setCalc('');
    }
  }
  
  function handleAddZero() {
    if(calc.includes('.') || calc.length === (0)) {
      setCalc(calc + '0')
    }
  }


  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.identificationButton}>
        Clique em mim!
      </button>

      <div className={styles.calculator}>
      <input
          type="text"
          value={calc !== '' ? calc.slice(0, 16) : 'Calculator'}
          onChange={(e) => setCalc(e.target.value)}
        />

        <div>
          <CalculatorButton character='AC' onClick={() => setCalc('')}/>
          <CalculatorButton icon={Backspace} onClick={() => setCalc(calc.slice(0, -1))}/>
          <CalculatorButton icon={Plus} onClick={handleAddition}/>

          <CalculatorButton icon={NumberSeven} onClick={() => setCalc(calc + '7')}/>
          <CalculatorButton icon={NumberEight} onClick={() => setCalc(calc + '8')}/>                   
          <CalculatorButton icon={NumberNine} onClick={() => setCalc(calc + '9')}/>

          <CalculatorButton icon={Minus} onClick={handleAddMinusOrSubtract} />

          <CalculatorButton icon={NumberFour} onClick={() => setCalc(calc + '4')}/>
          <CalculatorButton icon={NumberFive} onClick={() => setCalc(calc + '5')}/>
          <CalculatorButton icon={NumberSix} onClick={() => setCalc(calc + '6')}/>

          <CalculatorButton icon={X} onClick={handleMultiply}/>

          <CalculatorButton icon={NumberOne} onClick={() => setCalc(calc + '1')}/>
          <CalculatorButton icon={NumberTwo} onClick={() => setCalc(calc + '2')}/>
          <CalculatorButton icon={NumberThree} onClick={() => setCalc(calc + '3')}/>

          <CalculatorButton icon={Divide} onClick={handleDivide}/>

          <CalculatorButton icon={NumberZero} onClick={handleAddZero} />

          <CalculatorButton character='.' onClick={handleAddDot}/>
          <CalculatorButton icon={Equals} onClick={handleEquals}/>
        </div>
      </div>
    </div>
  )
}
