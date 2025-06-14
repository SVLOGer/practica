import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './DropDown.module.css';
import { CurrencyType } from '../../utils/types/types.ts';

interface DropDownProps {
  secondAmount: number;
  defaultValue: string;
  items: CurrencyType[];
  firstValue: string;
  secondValue: string;
  setFirst: (value: string) => void;
  setSecond: (value: string) => void;
}

const DropDown: React.FC<DropDownProps> = React.memo(({
                                                        secondAmount,
                                                        defaultValue,
                                                        items,
                                                        firstValue,
                                                        secondValue,
                                                        setFirst,
                                                        setSecond,
                                                      }) => {
  const [firstVal, setFirstVal] = useState(1);
  const [secondVal, setSecondVal] = useState(secondAmount);
  const prevSecondAmountRef = useRef(secondAmount);

  useEffect(() => {
    if (secondAmount !== prevSecondAmountRef.current) {
      setSecondVal(Number((firstVal * secondAmount).toFixed(2)));
      prevSecondAmountRef.current = secondAmount;
    }
  }, [secondAmount, firstVal]);

  const convert = useCallback((value: number, isFirstVal: boolean) => {
    if (isFirstVal) {
      setFirstVal(value);
      setSecondVal(Number((value * secondAmount).toFixed(2)));
    } else {
      setSecondVal(value);
      setFirstVal(Number((value / secondAmount).toFixed(2)));
    }
  }, [secondAmount]);

  const handleFirstChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    convert(parseFloat(e.target.value) || 0, true);
  }, [convert]);

  const handleSecondChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    convert(parseFloat(e.target.value) || 0, false);
  }, [convert]);

  const handleFirstSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFirst(e.target.value);
  }, [setFirst]);

  const handleSecondSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSecond(e.target.value);
  }, [setSecond]);

  return (
    <div className={styles.currencyConverter}>
      <div className={styles.currencyPicker}>
        <input
          className={styles.input}
          type="number"
          value={firstVal.toFixed(2)}
          min="0"
          step="0.01"
          onChange={handleFirstChange}
        />
        <div className={styles.divider} />
        <select
          className={styles.selector}
          value={firstValue}
          onChange={handleFirstSelect}
        >
          <option disabled value="">{defaultValue}</option>
          {items.map((i) => (
            <option key={i.code} value={i.code}>
              {i.code}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.currencyPicker}>
        <input
          className={styles.input}
          type="number"
          value={secondVal.toFixed(2)}
          min="0"
          step="0.01"
          onChange={handleSecondChange}
        />
        <div className={styles.divider} />
        <select
          className={styles.selector}
          value={secondValue}
          onChange={handleSecondSelect}
        >
          <option disabled value="">{defaultValue}</option>
          {items.map((i) => (
            <option key={i.code} value={i.code}>
              {i.code}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

export { DropDown };