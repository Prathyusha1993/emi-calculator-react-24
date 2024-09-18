import { useEffect, useState } from 'react';
import './App.css';
import { tenureData } from './utils/constants';
import TextInput from './components/TextInput';
import SliderINput from './components/SliderINput';

const App = () => {
  const [cost, setCost] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    if (!cost > 0) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure, cost]);

  const updateEmi = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));
    //calculate emi and update it
    const emi = calculateEMI(dp);
    setEmi(emi);
  };

  const calculateDownPayment = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  const updateDownpayment = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    //calculate dp and update it
    const dp = calculateDownPayment(emi);
    setDownPayment(dp);
  };

  const calculateEMI = (downPayment) => {
    // EMI amount = [p * r * (1 + r)^n] / [(1 + r)^n - 1]
    if (!cost) return;

    const loanAmount = cost - downPayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const emi = (loanAmount * rateOfInterest * (1 + rateOfInterest) ** numOfYears) / ((1 + rateOfInterest) ** numOfYears - 1);
    return Number(emi / 12).toFixed(0);
  };

  const totalDownPayment = () => {
    return Number((downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
  };

  const totalEMI = () => {
    return (emi * tenure).toFixed(0);
  }

  return (
    <div className="App">
      <h1>EMI Calculator</h1>
      <div className='container'>
        <TextInput title='Total Cost of Asset' state={cost} setState={setCost} />

        <TextInput title='Interest Rate (in %)' state={interest} setState={setInterest} />

        <TextInput title='Processing Fee (in %)' state={fee} setState={setFee} />

        <SliderINput
          title='Down payment'
          underlineTitle={`Total Down Payment - ${totalDownPayment()}`}
          onChange={updateEmi}
          state={downPayment}
          min={0}
          max={cost}
          labelMax={'100%'}
          labelMin={'0%'}
        />

        <SliderINput
          title='Loan Per Month'
          underlineTitle={`Total EMI - ${totalEMI()}`}
          onChange={updateDownpayment}
          state={emi}
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
        />

        <label>Tenure</label>
        <div className='tenure-contaier'>
          {tenureData.map((t) => (
            <button className={`tenure ${t === tenure ? 'selected' : ''}`} onClick={() => setTenure(t)}>{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
