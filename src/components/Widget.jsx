import React, { useMemo } from 'react';

const Widget = ({ todos }) => {
  const { doneCount, undoneCount } = useMemo(() => {
    const doneCount = todos.filter(todo => todo.isChecked).length;
    const undoneCount = todos.length - doneCount;

    return { doneCount, undoneCount };
  }, [todos]);

  return (
    <div className="widget">
      <h2>Todo Counts</h2>
      <p>Done: {doneCount}</p>
      <p>Undone: {undoneCount}</p>
    </div>
  );
};

export default Widget;
