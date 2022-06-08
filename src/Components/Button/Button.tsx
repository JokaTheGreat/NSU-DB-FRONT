import "./Button.scss";

interface ButtonProps {
  onClickCallback: () => void;
}

export function Button({ onClickCallback }: ButtonProps) {
  return (
    <button onClick={onClickCallback} className="button">
      Создать отчет
    </button>
  );
}
