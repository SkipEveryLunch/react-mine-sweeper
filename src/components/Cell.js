import React, { memo } from 'react';
//TODO:memoでキャッシュ化したい
const Cell = memo(({ data, flipCell, flagCell }) => {
  const getValue = () => {
    if (data.isFlaged) {
      return '🚩';
    } else if (!data.isFliped) {
      return null;
    } else if (data.isMine) {
      return '💣';
    } else if (data.neighbor > 0) {
      return data.neighbor;
    } else {
      return null;
    }
  };
  return (
    <div
      className={`h-16 w-16 border-2 border-gray-300 grid place-items-center ${
        data.isFliped ? '' : 'bg-gray-300'
      }`}
      onClick={() => {
        flipCell(data.x, data.y);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        flagCell(data.x, data.y);
      }}
    >
      <div className="text-2xl">{getValue()}</div>
    </div>
  );
});
export default Cell;
