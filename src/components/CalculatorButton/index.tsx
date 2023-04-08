import { Icon } from 'phosphor-react';
import styles from './styles.module.scss';

interface CalculatorButtonProps {
    icon?: Icon;
    character?: string;
    onClick: () => void;
} 



export function CalculatorButton({onClick ,character, icon: Icon}: CalculatorButtonProps) {
    return (
        <button className={styles.button} type='button' onClick={onClick} >
           {character || Icon && <Icon weight="bold" size={24} />}
        </button>
    )
}