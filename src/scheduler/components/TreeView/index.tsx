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
const getHeightFromView = (id: number | string) => {
  var selectedRow = document.getElementById(`event-row-${id}`);

  if (selectedRow) {
    // Get the height of the element
    return selectedRow.clientHeight;
  }
  return styles.dayColHeight;
};
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
        {data.map((item: Group) => (
          <React.Fragment key={item.id}>
            {item.parent === node.id && (
              <>
                <div
                  id={`tree-${item.type}-${item.id}`}
                  onClick={() => handleExpand(item)}
                  style={{
                    paddingLeft: Level * 20,
                    minHeight: styles.dayColHeight,
                    height: getHeightFromView(item.id),
                  }}
                  className="w-full  min-w-[300px] text-left cursor-pointer  border-t border-b border-[#EDEAE9]"
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
const TreeView = forwardRef<TreeRef, TreeProps>(
  ({ groups, handleExpand, treeHeader }, ref) => {
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
    const generateIcons = (item: Group) => {};

    useEffect(() => {
      setContentWidth((contentRef?.current?.clientWidth || 199) + 1);
    }, [contentRef?.current?.clientWidth, groups]);
    useImperativeHandle(ref, () => ({
      onClick: () => {},
    }));
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
                        height: getHeightFromView(item.id),
                      }}
                      id={`tree-${item.type}-${item.id}`}
                      onClick={() => handleExpand(item)}
                      className="w-full text-left cursor-pointer  border-t border-b border-[#EDEAE9] pl-5 tree-item flex items-center gap-2"
                    >
                      {/* <div>{generateIcons(item)}</div> */}
                      <div>{item.name}</div>
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
