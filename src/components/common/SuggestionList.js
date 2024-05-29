import NameContainer from "./NameContainer";

function SuggestionList({ setSuggestionNumber, data }) {
  return (
    <div>
      {data &&
        data.suggestion_name_list.map((item, index) => (
          <div
            key={item.suggestion_id}
            onClick={() => setSuggestionNumber(index)}
          >
            <NameContainer contents={item.suggestion_name} />
          </div>
        ))}
    </div>
  );
}

export default SuggestionList;
