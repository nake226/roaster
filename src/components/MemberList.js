import React from "react";

const MemberList = props => {
  return (
    <ul className="roster">
      {props.group.item_list.map((row, index) => {
        return (
          <li key={index}>
            <img src={row.photo_url} alt="aaa" />
            {row.user_name}
          </li>
        );
      })}
    </ul>
  );
};

export default MemberList;
