import "./Select.scss";

interface SelectProps {
  data: string[];
  values: string[];
  title: string;
  setValueCallback: (value: string) => void;
}

export function Select({ data, values, title, setValueCallback }: SelectProps) {
  return (
    <div className="select__wrapper">
      <h2 className="select__title">{title}:</h2>
      <select
        onChange={(e) => setValueCallback(e.target.value)}
        className="select"
      >
        <option className="select__option"></option>
        {data.map((item, i) => (
          <option className="select__option" value={item}>
            {values[i]}
          </option>
        ))}
      </select>
    </div>
  );
}
