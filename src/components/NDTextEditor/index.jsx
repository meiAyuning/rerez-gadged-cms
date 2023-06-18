import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.scss";

export default function NDTextEditor({ value, onChange }) {
  const handleChange = (content) => {
    onChange(content);
  };

  return <ReactQuill value={value} onChange={handleChange} />;
}
