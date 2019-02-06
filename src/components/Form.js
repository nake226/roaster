import React from "react";

const Form = props => {
  return (
    <div>
      <input
        type="text"
        onChange={e => props.setQuery(e)}
        placeholder="検索したいワードを入力してください"
      />
      <button onClick={e => props.getWordSearchResult(props.inputText)}>
        検索
      </button>
    </div>
  );
};
export default Form;
