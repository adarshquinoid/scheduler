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
      <div>
        {data.map((item: any) => (
          <React.Fragment>
            {item.parent === node.id && (
              <div>
                <div
                  onClick={() => handleExpand(item)}
                  style={{ marginLeft: Level * 20 }}
                  className="w-max text-left cursor-pointer"
                >
                  {item.name}
                </div>
                <div>{renderFunction(item, Level)}</div>
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
  }, [contentRef?.current?.clientWidth,groups]);

  return (
    <div>
      <div
        className="h-[56px] border border-[#EDEAE9] bg-white"
        style={{ width: contentWidth }}
      />

      <div className=" w-max  bg-white">
        <div ref={contentRef} className="px-5">
          {groups.map((item: any) => (
            <>
              {item.parent === null && (
                <>
                  <div
                    onClick={() => handleExpand(item)}
                    className="w-max text-left cursor-pointer"
                  >
                    <div>{item.name}</div>
                  </div>

                  {item.expand && renderFunction(item, 0)}
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
