import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TreeProps, TreeRef } from "../../types/common";
import { Group } from "../../types/datastructure";
import { styles } from "../../helpers/constants";
// import { generateColumnHeight } from "../../helpers/utilities";

function ChildRenderer({
  groups,
  level,
  node,
  renderFunction,
  handleExpand,
  renderColumns,
}: any) {
  let Level = level + 1;
  if (groups.length !== null) {
    return (
      <>
        {groups.map((item: Group) => (
          <React.Fragment key={item.id}>
            {item.parent === node.id && (
              <>
                <div
                  id={`tree-${item.type}-${item.id}`}
                  onClick={() => handleExpand(item)}
                  style={{
                    paddingLeft: Level * 20,
                    minHeight: styles.dayColHeight,
                    height: styles.dayColHeight,
                  }}
                  className={`w-full  min-w-[300px] text-left cursor-pointer  relative flex items-center ${
                    level === 1 ? "first-level" : "inner-level"
                  }`}
                >
                  <div>{item.name}</div>
                  {renderColumns()}
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
const TreeView = forwardRef<TreeRef, TreeProps>(
  ({ groups, handleExpand, treeHeader, data }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState<number>(
      contentRef?.current?.clientWidth || 200
    );

    const renderFunction = (node: any, level: number) => {
      const group: any = groups.filter((item: any) => item.parent === node.id);
      if (data.length > 0 && node.expand) {
        return (
          <ChildRenderer
            node={node}
            level={level}
            groups={group}
            data={data}
            renderFunction={renderFunction}
            handleExpand={handleExpand}
            renderColumns={renderColumns}
          />
        );
      }
      return null;
    };
    const generateIcons = (item: Group) => {};

    useEffect(() => {
      setContentWidth((contentRef?.current?.clientWidth || 199) + 1);
    }, [contentRef?.current?.clientWidth, groups]);
    useImperativeHandle(ref, () => ({
      onClick: () => {},
    }));
    const renderColumns = () => {
      return (
        <div className="absolute bottom-0 left-0">
          <svg width={contentWidth} height={1}>
            <path
              d={`M ${contentWidth} 0 L 0 0 0 1`}
              fill="none"
              stroke={"#EDEAE9"}
              strokeWidth="1"
            />
          </svg>
        </div>
      );
    };
    return (
      <div className="tree" id="tree">
        <div
          className="tree-header"
          id="tree-header"
          style={{ width: contentWidth }}
        >
          {treeHeader}
        </div>

        <div className="tree-items-container" id="tree-items-container">
          <div ref={contentRef} className="">
            {groups.map((item: Group) => (
              <React.Fragment key={item.id}>
                {item.parent === null && (
                  <React.Fragment>
                    <div
                      style={{
                        minHeight: styles.dayColHeight,
                        height: styles.dayColHeight,
                      }}
                      id={`tree-${item.type}-${item.id}`}
                      onClick={() => handleExpand(item)}
                      className="w-full text-left cursor-pointer  pl-5 tree-item flex items-center gap-2 relative tree-root"
                    >
                      {/* <div>{generateIcons(item)}</div> */}
                      <div>{item.name}</div>
                      {renderColumns()}
                    </div>

                    {item.expand && renderFunction(item, 1)}
                  </React.Fragment>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default TreeView;
