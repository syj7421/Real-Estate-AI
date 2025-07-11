import React from 'react';


const CategoryFilter = ({ onChange, activeCategories }) => {
  const categories = [ 'education', 'shopping', 'transport', 'medical', 'green', 'culture'];

  const handleRadioChange = (category) => {
    onChange([category]); // 항상 하나만 선택
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white shadow-md rounded">
      {categories.map((category) => (
        <label key={category} className="flex items-center gap-2 capitalize cursor-pointer">
          <input
            type="radio"
            name="category" // radio 그룹 이름 같게 설정
            value={category}
            checked={activeCategories.includes(category)}
            onChange={() => handleRadioChange(category)}
          />
          {category}
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;

