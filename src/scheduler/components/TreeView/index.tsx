import React, { useEffect, useRef, useState } from "react";

function ChildRenderer({
  data,
  level,
  node,
  renderFunction,
  handleExpand,
}: any) {
  let Level = level + 1;
  if (data.length !== null) {
    return (
      <>
        {data.map((item: any) => (
          <React.Fragment>
            {item.parent === node.id && (
              <>
                <div
                  onClick={() => handleExpand(item)}
                  style={{ paddingLeft: Level * 20 }}
                  className="w-full  min-w-[300px] text-left cursor-pointer h-10  border-t border-b border-[#EDEAE9]"
                >
                  {item.name}
                </div>
                <div>{renderFunction(item, Level)}</div>
              </>
            )}
          </React.Fragment>
        ))}
      </>
    );
  } else {
    return null;
  }
}
const TreeView: React.FC<any> = ({ groups, handleExpand }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState<number>(
    contentRef?.current?.clientWidth || 200
  );

  const renderFunction = (node: any, level: number) => {
    const data: any = groups.filter((item: any) => item.parent === node.id);
    if (data.length > 0 && node.expand) {
      return (
        <ChildRenderer
          node={node}
          level={level}
          data={data}
          renderFunction={renderFunction}
          handleExpand={handleExpand}
        />
      );
    }
    return null;
  };
  useEffect(() => {
    setContentWidth((contentRef?.current?.clientWidth || 199) + 1);
  }, [contentRef?.current?.clientWidth, groups]);

  return (
    <div>
      <div
        className="h-[56px] border-t border-b border-[#EDEAE9] bg-white"
        style={{ width: contentWidth }}
      />

      <div className=" w-max min-w-[300px] bg-white">
        <div ref={contentRef} className="">
          {groups.map((item: any) => (
            <>
              {item.parent === null && (
                <>
                  <div
                    onClick={() => handleExpand(item)}
                    className="w-full text-left cursor-pointer h-10  border-t border-b border-[#EDEAE9] pl-5"
                  >
                    <div>{item.name}</div>
                  </div>

                  {item.expand && renderFunction(item, 1)}
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
