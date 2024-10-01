import React, { useEffect, useRef, useState } from "react";

function ChildRenderer(props: any) {
  const { data, level, id, renderFunction } = props;
  let Level = level + 1;

  if (data.length !== null) {
    return (
      <div>
        {data.map((item: any) => (
          <React.Fragment>
            {item.parent === id && (
              <div>
                <div style={{ marginLeft: Level * 20 }} className="w-max">
                  {item.name}
                </div>
                <div>{renderFunction(item.id, Level)}</div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
const TreeView: React.FC<any> = ({ employeeDatas, handleExpand }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState<number>(
    contentRef?.current?.clientWidth || 200
  );
  const renderFunction = (id: number, level: number) => {
    const data: any = employeeDatas.filter((item: any) => item.parent === id);
    if (data.length > 0) {
      return (
        <ChildRenderer
          id={id}
          level={level}
          data={data}
          renderFunction={renderFunction}
        />
      );
    }
    return null;
  };
  useEffect(() => {
    console.log(contentRef?.current?.clientWidth);
    setContentWidth((contentRef?.current?.clientWidth || 199) + 1);
  }, [contentRef?.current?.clientWidth]);
  return (
    <div>
      <div
        className="h-[56px] border border-[#EDEAE9] bg-white"
        style={{ width: contentWidth }}
      />

      <div className="border-r border-b border-[#e5e7eb] w-max  bg-white">
        <div ref={contentRef} className="px-5">
        {employeeDatas.map((item: any) => (
          <>
            {item.parent === null && (
              <>
            
                  <div onClick={() => handleExpand(item)} className="bg-white">
                    <div>{item.name}</div>
                  </div>
            
                {renderFunction(item.id, 0)}
              </>
            )}
          </>
        ))}
      </div>
      </div>
    </div>
  );
};

export default TreeView;
